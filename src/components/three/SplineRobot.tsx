import { useEffect, useRef, useState } from "react";
import { Application, type SPEObject } from "@splinetool/runtime";
import { SECTION_ORDER, scrollState } from "@/lib/scroll";
import {
  DESKTOP_POSES,
  MOBILE_POSES,
  POSE_DRIVERS,
  POSE_KEYS,
  lerpPose,
  wrapPi,
  type RobotPose,
} from "@/lib/robot-poses";

export const SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/** Scene units that should span the box height. 280 reproduces the original
 *  hero framing (head to thighs); the mobile value shows the whole robot. */
const VISIBLE_UNITS_DESKTOP = 350;
const VISIBLE_UNITS_MOBILE = 560;
/** Robot-local height (before scale) that should sit at the frame centre:
 *  mid-torso for the head-to-thigh crop, mid-body for the full robot. */
const FRAME_CENTRE_DESKTOP = 150;
const FRAME_CENTRE_MOBILE = 20;

const damp = (a: number, b: number, lambda: number, dt: number) =>
  a + (b - a) * (1 - Math.exp(-lambda * dt));
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * The original Spline robot, kept in its original framing: the scene renders
 * inside a fixed box the size of the old hero column. Scrolling moves that box
 * across the page and turns the robot's body and head inside the scene so it
 * faces the content of the section in view.
 */
export function SplineRobot() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const app = new Application(canvas);
    let disposed = false;
    let raf = 0;

    app
      .load(SCENE_URL)
      .then(() => {
        if (disposed) return;
        const all = app.getAllObjects();
        if (import.meta.env.DEV) {
          (window as unknown as { __splineApp?: Application }).__splineApp = app;
        }
        // Only the whole robot is driven from here. The scene keeps its own
        // head "look-at" behaviour; writing to the head as well makes the
        // two fight and twists the neck.
        const root = findByName(all, ["bot", "robot", "character"]);
        const v3 = (o: { x: number; y: number; z: number }) => ({
          x: o.x || 0,
          y: o.y || 0,
          z: o.z || 0,
        });
        const baseRot = root ? v3(root.rotation) : { x: 0, y: 0, z: 0 };
        const basePos = root ? v3(root.position) : { x: 0, y: 0, z: 0 };

        // The scene is exported with a "responsive" frame whose camera zooms
        // in as the canvas shrinks. Rather than fight that, read the camera
        // each frame and counter-scale the robot to a constant on-screen size.
        const internals = app as unknown as {
          _camera?: { position: { y: number; z: number }; fov: number; zoom: number };
        };
        const baseScale = root ? v3(root.scale) : { x: 1, y: 1, z: 1 };
        /** Scale factor that normalises the robot to a fixed on-screen size
         *  whatever camera framing the runtime picks for the current box. */
        const framingScale = (mobile: boolean) => {
          const cam = internals._camera;
          if (!cam || !cam.position) return 1;
          const visible =
            (2 * (cam.position.z - basePos.z) * Math.tan((cam.fov * Math.PI) / 360)) /
            (cam.zoom || 1);
          if (!Number.isFinite(visible) || visible <= 0) return 1;
          return visible / (mobile ? VISIBLE_UNITS_MOBILE : VISIBLE_UNITS_DESKTOP);
        };

        const pose: RobotPose = { ...DESKTOP_POSES.hero };
        let last = performance.now();
        setReady(true);

        const tick = (now: number) => {
          // Clamp both ways: a hidden tab can hand us a stale/negative delta,
          // which would make the exponential damping blow up.
          const dt = clamp((now - last) / 1000, 0, 0.05);
          last = now;
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const isMobile = vw < 1024;
          const poses = isMobile ? MOBILE_POSES : DESKTOP_POSES;

          // Evaluate a section's pose at a given progress (keyframe plus its
          // choreography, if any).
          const evalSection = (i: number, p: number): RobotPose => {
            const id = SECTION_ORDER[clamp(i, 0, SECTION_ORDER.length - 1)];
            const t = { ...poses[id] };
            POSE_DRIVERS[id]?.(p, t, isMobile);
            return t;
          };
          const idx = scrollState.index;
          const i0 = clamp(Math.floor(idx), 0, SECTION_ORDER.length - 1);
          const frac = idx - i0;
          let target: RobotPose;
          if (frac < 0.001) {
            target = evalSection(i0, scrollState.sectionProgress);
          } else {
            // Between sections: blend the previous section's end state into
            // the next section's start state so choreography stays continuous.
            const a = evalSection(i0, 1);
            const b = evalSection(i0 + 1, 0);
            // Yaw is periodic: blend the short way (e.g. 2π → 0 is no turn).
            b.bodyYaw = a.bodyYaw + wrapPi(b.bodyYaw - a.bodyYaw);
            target = lerpPose(a, b, frac);
          }
          // Body yaw is periodic: always approach the target the short way
          // (scrubbed spins still happen because the target itself rotates).
          target.bodyYaw = pose.bodyYaw + wrapPi(target.bodyYaw - pose.bodyYaw);

          for (const k of POSE_KEYS) {
            const next = damp(pose[k], target[k], 3.4, dt);
            pose[k] = Number.isFinite(next) ? next : target[k];
          }
          pose.scale = clamp(pose.scale, 0.2, 1.5);

          // Move the framed box: pose.x/y are fractions of the free space.
          // Free space is measured against the *scaled* box so a smaller
          // robot can travel all the way to the viewport edges.
          const bw = box.offsetWidth * pose.scale;
          const bh = box.offsetHeight * pose.scale;
          const tx = pose.x * Math.max(0, (vw - bw) / 2);
          const ty = -pose.y * Math.max(0, (vh - bh) / 2);
          box.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${pose.scale.toFixed(3)})`;

          const t = now / 1000;

          if (import.meta.env.DEV && (window as unknown as { __robotFreeze?: boolean }).__robotFreeze) {
            raf = requestAnimationFrame(tick);
            return;
          }

          if (root) {
            const fs = framingScale(isMobile);
            root.scale.x = baseScale.x * fs;
            root.scale.y = baseScale.y * fs;
            root.scale.z = baseScale.z * fs;
            // Keep the framing centre (in robot-local units) on the camera's
            // line of sight so scaling doesn't push the robot out of frame.
            const camY = internals._camera?.position?.y;
            if (typeof camY === "number" && Number.isFinite(camY)) {
              const centre = isMobile ? FRAME_CENTRE_MOBILE : FRAME_CENTRE_DESKTOP;
              root.position.y = camY - centre * baseScale.y * fs;
            }
            root.rotation.y = baseRot.y + pose.bodyYaw + Math.sin(t * 0.5) * 0.03;
            root.rotation.x = baseRot.x;
            root.rotation.z = baseRot.z;
          }
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("[spline] failed to load scene", err);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      app.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[1] pointer-events-none flex items-center justify-center transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <div
        ref={boxRef}
        className="will-change-transform w-[min(88vw,420px)] h-[min(52svh,420px)] lg:w-[min(46vw,760px)] lg:h-[min(72vh,640px)]"
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  );
}

function findByName(all: SPEObject[], candidates: string[]): SPEObject | null {
  for (const c of candidates) {
    const hit = all.find((o) => o.name.toLowerCase() === c);
    if (hit) return hit;
  }
  for (const c of candidates) {
    const hit = all.find((o) => o.name.toLowerCase().includes(c));
    if (hit) return hit;
  }
  return null;
}
