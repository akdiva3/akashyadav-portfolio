import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.sessionStorage.getItem("portfolio-intro-seen") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      onComplete();
      return;
    }
    const start = performance.now();
    let frame = 0;
    let finishTimer: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const next = Math.min(100, Math.floor(((now - start) / 2600) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else finishTimer = setTimeout(() => {
        window.sessionStorage.setItem("portfolio-intro-seen", "1");
        setVisible(false);
        onComplete();
      }, 400);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); clearTimeout(finishTimer); };
  }, [onComplete]);

  return <AnimatePresence>{visible && <motion.div
    initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65 }}
    className="portfolio-loader fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-7 text-primary md:p-12"
    aria-label="Loading portfolio" role="status"
  >
    <span className="text-[11px] font-semibold uppercase tracking-[.3em]">Portfolio</span>
    <div className="relative flex flex-1 items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={Math.min(2, Math.floor(progress / 34))}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: .35 }}
          className="font-display text-6xl italic md:text-8xl"
        >{["Create", "Build", "Explore"][Math.min(2, Math.floor(progress / 34))]}</motion.span>
      </AnimatePresence>
    </div>
    <span className="self-end font-mono text-2xl tabular-nums">{String(progress).padStart(3, "0")}</span>
    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-stroke"><div className="h-full bg-gradient-accent" style={{ width: `${progress}%` }} /></div>
  </motion.div>}</AnimatePresence>;
}
