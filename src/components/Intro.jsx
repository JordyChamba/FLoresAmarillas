import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import { copy } from '../config';
import { useReducedMotion } from '../hooks/useReducedMotion';

function GoldDust({ count, reduced }) {
  const parts = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : count }, (_, i) => ({
        id: i,
        left: (i * 37.7 + 11) % 100,
        size: 1.5 + ((i * 13) % 4),
        dur: 9 + ((i * 7) % 12),
        delay: -((i * 3.3) % 14),
        dx: ((i * 29) % 60) - 30,
        op: 0.25 + ((i * 17) % 50) / 100,
      })),
    [count, reduced]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {parts.map((p) => (
        <span
          key={p.id}
          className="anim-drift absolute bottom-[-4vh] rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size, height: p.size,
            background: 'radial-gradient(circle, #FFE27A 0%, rgba(255,217,59,.15) 70%, transparent 100%)',
            boxShadow: '0 0 8px 1px rgba(255,210,80,.5)',
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--dx': `${p.dx}px`,
            '--po': p.op,
          }}
        />
      ))}
    </div>
  );
}

export default function Intro({ onBloom }) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="grain relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-espresso-950 px-6 text-center"
      exit={{ opacity: 0, scale: 1.04, filter: 'brightness(1.4) blur(6px)', transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }}
      aria-label="Introducción"
    >
      {/* luz cálida sutil */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,147,12,.14) 0%, rgba(232,147,12,.05) 40%, transparent 70%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[36vh]"
          style={{ background: 'linear-gradient(to top, rgba(120,70,10,.12), transparent)' }}
        />
        {/* viñeta cinematográfica */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,.62) 100%)' }} />
      </div>

      <GoldDust count={26} reduced={reduced} />

      <motion.div
        initial="hidden" animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.9, delayChildren: 0.4 } } }}
        className="relative z-10 flex max-w-2xl flex-col items-center"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } }}
          className="mb-6 flex items-center gap-3 text-[11px] font-light uppercase tracking-widest2 text-gold-soft/80 sm:text-xs"
        >
          <span className="h-px w-8 bg-gold-soft/40" />
          {copy.introKicker}
          <span className="h-px w-8 bg-gold-soft/40" />
        </motion.p>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 26, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } } }}
          className="font-serif-d text-4xl font-medium italic leading-[1.15] text-cream sm:text-5xl md:text-6xl"
        >
          {copy.introTitle}
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } } }}
          className="font-serif-d mt-5 text-xl italic text-cream/70 sm:text-2xl"
        >
          {copy.introSubtitle}
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } }}
          className="mt-12"
        >
          <span className="anim-ring-pulse inline-block rounded-full">
            <button
              onClick={onBloom}
              className="group relative inline-flex scale-105 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-sunflower-200 via-sunflower-400 to-ember px-9 py-4 text-sm font-medium tracking-[0.18em] text-espresso-950 uppercase shadow-[0_0_50px_-8px_rgba(255,200,60,0.75),0_18px_50px_-12px_rgba(232,147,12,0.6)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_70px_-5px_rgba(255,205,90,0.9),0_18px_60px_-10px_rgba(232,147,12,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-200 focus-visible:ring-offset-2 focus-visible:ring-offset-espresso-950 sm:px-11 sm:text-[15px]"
            >
              <Flower2 className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[30deg] group-hover:scale-125" strokeWidth={2} />
              <span>{copy.introButton}</span>
              <span className="text-base leading-none" aria-hidden>🌼</span>
              {/* brillo que cruza */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
          </span>
          <p className="mt-5 flex items-center justify-center gap-2 text-[11px] font-light tracking-[0.25em] uppercase text-cream/40">
            <span className="anim-glow-pulse inline-block h-1.5 w-1.5 rounded-full bg-sunflower-300" aria-hidden />
            toca para comenzar · con música 🎵
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
