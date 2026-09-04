/** Fixed atmospheric backdrop: aurora blobs, fine grid and film grain. */
export function Background() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,120,255,0.16),transparent_60%)]" />
      {/* Soft-edged radial gradients (no filter: blur) so the slow drift is
          a cheap transform-only animation. */}
      <div className="absolute -top-[25%] -left-[15%] h-[90vh] w-[90vw] bg-[radial-gradient(closest-side,rgba(56,189,248,0.13),transparent)] animate-aurora will-change-transform" />
      <div
        className="absolute top-[25%] -right-[20%] h-[80vh] w-[75vw] bg-[radial-gradient(closest-side,rgba(99,102,241,0.13),transparent)] animate-aurora will-change-transform"
        style={{ animationDelay: "-6s", animationDuration: "22s" }}
      />
      <div
        className="absolute -bottom-[30%] left-[15%] h-[80vh] w-[80vw] bg-[radial-gradient(closest-side,rgba(37,99,235,0.11),transparent)] animate-aurora will-change-transform"
        style={{ animationDelay: "-12s", animationDuration: "26s" }}
      />
      <div className="absolute inset-0 noise opacity-[0.045] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,5,10,0.7)_100%)]" />
    </div>
  );
}
