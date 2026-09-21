import { AnimatePresence, motion } from 'framer-motion';
import { Sunrise, Sunset, MoonStar, Flower2, MousePointerClick } from 'lucide-react';
import { timing, hints } from '../config';

const MOOD_BUTTONS = [
  { id: 'amanecer', icon: Sunrise, label: 'Amanecer' },
  { id: 'atardecer', icon: Sunset, label: 'Atardecer' },
  { id: 'anochecer', icon: MoonStar, label: 'Anochecer' },
];

/** Barra inferior: cambia el momento del día, pide lluvia de pétalos o comparte. */
export default function MomentsBar({ mood, onMood, onBurst, bursting, showHint = false }) {
  const btn = (active) =>
    `relative grid h-11 w-11 place-items-center rounded-full transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-300 ${
      active
        ? 'scale-110 bg-gradient-to-br from-sunflower-200 via-sunflower-400 to-ember text-espresso-950 shadow-[0_0_22px_-4px_rgba(255,200,60,0.9)]'
        : 'text-cream/70 hover:scale-105 hover:bg-white/10 hover:text-sunflower-200'
    }`;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: timing.messageDelay + 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-5 z-50 flex flex-col items-center gap-2.5 px-4 sm:bottom-7"
      aria-label="Momentos del jardín"
    >
      {/* indicación: probar los climas */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            key="moods-hint"
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.7 },
              y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.7 },
            }}
            className="pointer-events-none flex items-center gap-2 rounded-full border border-sunflower-300/40 bg-espresso-950/80 px-4 py-2 shadow-[0_0_25px_-6px_rgba(255,200,60,0.6)] backdrop-blur-xl"
          >
            <MousePointerClick className="h-3.5 w-3.5 shrink-0 text-sunflower-300" strokeWidth={2} />
            <span className="max-w-[78vw] text-center text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] text-sunflower-100 sm:max-w-none sm:whitespace-nowrap sm:text-[11px]">
              {hints.moods}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-espresso-950/70 px-2 py-1.5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {MOOD_BUTTONS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onMood(id)}
            title={label}
            aria-label={`Ver el jardín al ${label.toLowerCase()}`}
            aria-pressed={mood === id}
            className={btn(mood === id)}
          >
            <Icon className="h-5 w-5" strokeWidth={mood === id ? 2 : 1.75} />
          </button>
        ))}

        <span className="mx-1 h-6 w-px bg-white/15" aria-hidden />

        <button
          onClick={onBurst}
          title="Lluvia de pétalos"
          aria-label="Pedir una lluvia de pétalos"
          aria-pressed={bursting}
          className={btn(bursting)}
        >
          <Flower2
            className={`h-5 w-5 ${bursting ? '' : 'transition-transform duration-500 hover:rotate-[25deg]'}`}
            strokeWidth={bursting ? 2 : 1.75}
          />
          {bursting && (
            <span className="anim-glow-pulse absolute inset-0 rounded-full border border-sunflower-300/60" aria-hidden />
          )}
        </button>
      </div>
    </motion.nav>
  );
}
