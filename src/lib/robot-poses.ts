import type { SectionId } from "@/lib/scroll";

/** Robot pose keyframe. x / y are fractions of the free space around the
 *  robot box (-1 = left/bottom edge, 1 = right/top edge). Angles are radians. */
export interface RobotPose {
  x: number;
  y: number;
  z: number;
  scale: number;
  bodyYaw: number;
  headYaw: number;
  headPitch: number;
  wave: number;
}

const TAU = Math.PI * 2;

export const DESKTOP_POSES: Record<SectionId, RobotPose> = {
  hero: { x: 0.92, y: -0.1, z: 0, scale: 1, bodyYaw: -0.25, headYaw: -0.2, headPitch: 0.02, wave: 0 },
  about: { x: -1, y: 0.05, z: 0, scale: 0.92, bodyYaw: 0.55, headYaw: 0.3, headPitch: 0.1, wave: 0 },
  // Centre stage for the pinned product story (choreographed below).
  flagship: { x: 0, y: -0.15, z: 0, scale: 1, bodyYaw: -0.5, headYaw: -0.08, headPitch: 0.04, wave: 0 },
  // Beside the card stack (choreographed below).
  projects: { x: 0.95, y: 0.1, z: 0, scale: 0.9, bodyYaw: -0.4, headYaw: 0, headPitch: 0.06, wave: 0 },
  websites: { x: 0.38, y: 0.68, z: 0, scale: 0.5, bodyYaw: 0, headYaw: 0, headPitch: 0.3, wave: 0 },
  experience: { x: 0.92, y: 0, z: 0, scale: 0.9, bodyYaw: -0.5, headYaw: -0.32, headPitch: 0.12, wave: 0 },
  stack: { x: 0, y: 0.15, z: 0, scale: 0.7, bodyYaw: 0, headYaw: 0, headPitch: 0.05, wave: 0 },
  contact: { x: -0.9, y: -0.05, z: 0, scale: 1, bodyYaw: 0.25, headYaw: 0.12, headPitch: -0.05, wave: 1 },
};

/** On phones the content is full-width, so the robot only appears where a
 *  free band exists: the hero (above the title) and the Flagship story
 *  (between the header and the step cards). A scale of 0 fades it out. */
export const MOBILE_POSES: Record<SectionId, RobotPose> = {
  hero: { x: 0, y: -0.02, z: 0, scale: 0.5, bodyYaw: 0, headYaw: 0, headPitch: 0.1, wave: 0 },
  about: { x: 0, y: -0.02, z: 0, scale: 0, bodyYaw: 0.3, headYaw: 0, headPitch: 0.1, wave: 0 },
  flagship: { x: 0, y: -0.14, z: 0, scale: 0.5, bodyYaw: -0.3, headYaw: 0, headPitch: 0.06, wave: 0 },
  projects: { x: 0, y: -0.14, z: 0, scale: 0, bodyYaw: -0.25, headYaw: 0, headPitch: 0.06, wave: 0 },
  websites: { x: 0, y: 0, z: 0, scale: 0, bodyYaw: 0, headYaw: 0, headPitch: 0.35, wave: 0 },
  experience: { x: 0, y: 0, z: 0, scale: 0, bodyYaw: 0.4, headYaw: 0, headPitch: 0.3, wave: 0 },
  stack: { x: 0, y: 0, z: 0, scale: 0, bodyYaw: -0.4, headYaw: 0, headPitch: 0.3, wave: 0 },
  contact: { x: 0, y: 0, z: 0, scale: 0, bodyYaw: 0, headYaw: 0, headPitch: 0.05, wave: 1 },
};

const KEYS: (keyof RobotPose)[] = [
  "x",
  "y",
  "z",
  "scale",
  "bodyYaw",
  "headYaw",
  "headPitch",
  "wave",
];

export function lerpPose(a: RobotPose, b: RobotPose, t: number): RobotPose {
  const out = { ...a };
  for (const k of KEYS) out[k] = a[k] + (b[k] - a[k]) * t;
  return out;
}

export { KEYS as POSE_KEYS };

/* ------------------------------------------------------------------ */
/* Per-section choreography driven by the section's scroll progress.   */
/* ------------------------------------------------------------------ */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
/** 0→1 as p goes from a to b, eased. */
const seg = (p: number, a: number, b: number) => smooth((p - a) / (b - a));

type Track = { at: number; pose: Partial<RobotPose> }[];

/** Sample a track of partial keyframes at progress p (eased between keys). */
function sampleTrack(track: Track, p: number, into: RobotPose) {
  for (const k of KEYS) {
    let prev: { at: number; v: number } | null = null;
    let next: { at: number; v: number } | null = null;
    for (const key of track) {
      const v = key.pose[k];
      if (v === undefined) continue;
      if (key.at <= p) prev = { at: key.at, v };
      else if (!next) next = { at: key.at, v };
    }
    if (prev && next) into[k] = lerp(prev.v, next.v, seg(p, prev.at, next.at));
    else if (prev) into[k] = prev.v;
    else if (next) into[k] = next.v;
  }
}

/** Flagship: three-act product story. Act 1 faces the left card, act 2
 *  turns to the right card, act 3 turns back to the viewer and steps aside
 *  for the results. Turns stay within ±35° because the scene's own head
 *  look-at cannot follow a larger body rotation. */
const FLAGSHIP_TRACK: Track = [
  { at: 0.0, pose: { x: 0, y: -0.15, scale: 1, bodyYaw: -0.55 } },
  { at: 0.3, pose: { x: 0, y: -0.15, scale: 1, bodyYaw: -0.55 } },
  { at: 0.44, pose: { x: 0.05, y: -0.12, scale: 1, bodyYaw: 0.6 } },
  { at: 0.66, pose: { x: 0.05, y: -0.12, scale: 1, bodyYaw: 0.6 } },
  { at: 0.9, pose: { x: -0.3, y: -0.35, scale: 0.85, bodyYaw: -0.1 } },
  { at: 1.0, pose: { x: -0.3, y: -0.35, scale: 0.85, bodyYaw: -0.1 } },
];

const FLAGSHIP_MOBILE_TRACK: Track = [
  { at: 0.0, pose: { bodyYaw: -0.35 } },
  { at: 0.3, pose: { bodyYaw: -0.35 } },
  { at: 0.44, pose: { bodyYaw: 0.4 } },
  { at: 0.66, pose: { bodyYaw: 0.4 } },
  { at: 0.9, pose: { bodyYaw: -0.1 } },
  { at: 1.0, pose: { bodyYaw: -0.1 } },
];

export type PoseDriver = (progress: number, target: RobotPose, mobile: boolean) => void;

export const PROJECT_COUNT = 6;

export const POSE_DRIVERS: Partial<Record<SectionId, PoseDriver>> = {
  flagship: (p, t, mobile) => {
    sampleTrack(mobile ? FLAGSHIP_MOBILE_TRACK : FLAGSHIP_TRACK, p, t);
  },

  // Projects: stands beside the deck, turning a little further toward it as
  // the cards stack up, with a small lean and nod each time a card lands.
  projects: (p, t, mobile) => {
    const f = p * PROJECT_COUNT;
    const frac = f - Math.floor(f);
    const settle = smooth(frac);
    const lean = Math.sin(frac * Math.PI) * 0.12;
    t.bodyYaw = (mobile ? -0.25 : -0.4) - 0.25 * smooth(p) - lean;
    t.headPitch = lerp(0.1, 0.02, settle);
    t.headYaw = -Math.sin(frac * Math.PI) * 0.05;
    if (!mobile) t.scale = 0.86 + 0.1 * p;
  },

  // Websites: the robot sweeps its gaze across the carousel as it scrolls
  // (mostly with the body; the head only assists).
  websites: (p, t) => {
    t.headYaw += lerp(0.12, -0.12, p);
    t.bodyYaw += lerp(0.45, -0.45, p);
  },

  // Experience: reads down the timeline.
  experience: (p, t) => {
    t.headPitch += lerp(0, 0.08, p);
    t.bodyYaw += lerp(0.05, -0.12, p);
  },
};

/** The Spline head pivots away from the neck, so keep its offsets tiny. */
export const HEAD_YAW_LIMIT = 0.16;
export const HEAD_PITCH_LIMIT = 0.1;

/** Wrap an angle delta into (-π, π]. */
export function wrapPi(delta: number) {
  let d = delta % TAU;
  if (d > Math.PI) d -= TAU;
  if (d <= -Math.PI) d += TAU;
  return d;
}
