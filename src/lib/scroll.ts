import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/** Section order along the page (top to bottom). */
export const SECTION_ORDER = [
  "hero",
  "about",
  "flagship",
  "projects",
  "websites",
  "experience",
  "stack",
  "contact",
] as const;
export type SectionId = (typeof SECTION_ORDER)[number];

export interface ScrollState {
  scroll: number;
  limit: number;
  progress: number;
  velocity: number;
  /** Continuous section index (e.g. 2.4 = between flagship and projects). */
  index: number;
  /** Nearest section index. */
  section: number;
  /** 0..1 progress inside the nearest section (viewport top vs section). */
  sectionProgress: number;
  mouse: { x: number; y: number };
  reducedMotion: boolean;
  vh: number;
}

export const scrollState: ScrollState = {
  scroll: 0,
  limit: 1,
  progress: 0,
  velocity: 0,
  index: 0,
  section: 0,
  sectionProgress: 0,
  mouse: { x: 0, y: 0 },
  reducedMotion: false,
  vh: typeof window !== "undefined" ? window.innerHeight : 800,
};

interface SectionRect {
  id: SectionId;
  top: number;
  height: number;
  center: number;
}

const rects: SectionRect[] = [];
let lenis: Lenis | null = null;
const listeners = new Set<(s: ScrollState) => void>();

export function onScroll(fn: (s: ScrollState) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getLenis() {
  return lenis;
}

export function measureSections() {
  rects.length = 0;
  const y = window.scrollY;
  const els = document.querySelectorAll<HTMLElement>("[data-section]");
  els.forEach((el) => {
    const id = el.dataset.section as SectionId;
    if (!SECTION_ORDER.includes(id)) return;
    const r = el.getBoundingClientRect();
    rects.push({
      id,
      top: r.top + y,
      height: r.height,
      center: r.top + y + r.height / 2,
    });
  });
  rects.sort((a, b) => a.top - b.top);
  scrollState.vh = window.innerHeight;
  computeIndex();
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

function computeIndex() {
  if (!rects.length) return;
  const vh = scrollState.vh;
  const viewCenter = scrollState.scroll + vh / 2;

  // Each section owns a "solid" range where the index holds its integer
  // value: for tall (pinned) sections that is the whole span in which the
  // section fills the viewport; for short sections it collapses to the
  // centre. Between solid ranges the index eases to the next section.
  const solidStart = (r: SectionRect) => Math.min(r.center, r.top + vh / 2);
  const solidEnd = (r: SectionRect) =>
    Math.max(r.center, r.top + r.height - vh / 2);

  let index = 0;
  const last = rects.length - 1;
  if (viewCenter <= solidStart(rects[0])) index = 0;
  else if (viewCenter >= solidEnd(rects[last])) index = last;
  else {
    for (let i = 0; i <= last; i++) {
      const s = solidStart(rects[i]);
      const e = solidEnd(rects[i]);
      if (viewCenter >= s && viewCenter <= e) {
        index = i;
        break;
      }
      if (i < last) {
        const nextStart = solidStart(rects[i + 1]);
        if (viewCenter > e && viewCenter < nextStart) {
          const t = (viewCenter - e) / Math.max(1, nextStart - e);
          index = i + smoothstep(Math.min(1, Math.max(0, t)));
          break;
        }
      }
    }
  }
  scrollState.index = index;
  const nearest = Math.round(index);
  scrollState.section = nearest;
  const r = rects[nearest];
  const span = Math.max(1, r.height - vh);
  scrollState.sectionProgress = Math.min(
    1,
    Math.max(0, (scrollState.scroll - r.top) / span),
  );
}

export function sectionIdAt(index: number): SectionId {
  const r = rects[Math.round(index)];
  return r ? r.id : (SECTION_ORDER[Math.round(index)] ?? "hero");
}

/** Initialise Lenis + GSAP ScrollTrigger integration. Returns a cleanup. */
export function initSmoothScroll() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollState.reducedMotion = reduced;

  lenis = new Lenis({
    infinite: false,
    lerp: reduced ? 1 : 0.1,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.3,
    smoothWheel: !reduced,
    // Smooth touch scrolling too: pinned/scrubbed sections otherwise only
    // receive the browser's coarse native scroll events on phones, which
    // makes the horizontal carousel step instead of glide.
    syncTouch: !reduced,
    syncTouchLerp: 0.085,
    anchors: false,
  });

  const handleScroll = () => {
    if (!lenis) return;
    scrollState.scroll = lenis.animatedScroll;
    scrollState.limit = Math.max(1, lenis.limit);
    scrollState.progress = scrollState.scroll / scrollState.limit;
    scrollState.velocity = lenis.velocity;
    computeIndex();
    listeners.forEach((fn) => fn(scrollState));
  };

  lenis.on("scroll", () => {
    handleScroll();
    ScrollTrigger.update();
  });
  if (import.meta.env.DEV) {
    const w = window as unknown as { __lenis?: Lenis; __scrollState?: ScrollState };
    w.__lenis = lenis;
    w.__scrollState = scrollState;
  }

  const tick = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const onPointer = (e: PointerEvent) => {
    scrollState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    scrollState.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // Anchor links → smooth scroll.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
  };
  document.addEventListener("click", onClick);

  ScrollTrigger.addEventListener("refresh", measureSections);
  measureSections();
  handleScroll();

  return () => {
    document.removeEventListener("click", onClick);
    window.removeEventListener("pointermove", onPointer);
    ScrollTrigger.removeEventListener("refresh", measureSections);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(
  target: HTMLElement | number,
  opts: { offset?: number; duration?: number } = {},
) {
  if (!lenis) {
    if (typeof target === "number") window.scrollTo({ top: target });
    else target.scrollIntoView({ behavior: "smooth" });
    return;
  }
  lenis.scrollTo(target, {
    offset: opts.offset ?? 0,
    duration: opts.duration ?? 1.6,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
  });
}

export function scrollToSection(id: SectionId | string) {
  const el = document.getElementById(id);
  if (el) scrollToTarget(el);
}

/** True on touch-first devices (phones/tablets). */
export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

/**
 * ScrollTrigger pin settings per input type. On touch devices the scroll
 * position is written by Lenis from JavaScript, so pinning by transform
 * (instead of position: fixed) keeps the pinned box and the scroll write in
 * the same frame; this removes the flicker when a pinned section releases.
 * A short scrub and fastScrollEnd stop the scrubbed motion from trailing
 * behind a flick and still running after the pin has ended.
 */
export function pinTuning(desktopScrub: number) {
  if (scrollState.reducedMotion) return { scrub: true as const, anticipatePin: 0 };
  return isTouchDevice()
    ? { scrub: 0.3, anticipatePin: 0, pinType: "transform" as const, fastScrollEnd: true }
    : { scrub: desktopScrub, anticipatePin: 1 };
}

export { gsap, ScrollTrigger };
