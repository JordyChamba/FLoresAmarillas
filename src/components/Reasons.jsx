import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Sun } from 'lucide-react';
import { reasons } from '../config';

const ease = [0.22, 1, 0.36, 1];

/** Modal "Razones por las que brillas": lista editable desde config.js */
export default function Reasons({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="reasons"
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={reasons.title}
        >
          <div className="absolute inset-0 bg-espresso-950/75 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.article
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className="relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-sunflower-300/40 bg-cream p-7 text-left shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar razones"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-espresso-900/50 transition-all hover:rotate-90 hover:bg-espresso-950/5 hover:text-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-ember">
              <Sun className="h-3.5 w-3.5" strokeWidth={2} />
              {reasons.subtitle}
            </p>
            <h3 className="font-serif-d mt-2 text-3xl font-semibold italic text-espresso-950">
              {reasons.title}
            </h3>

            <ul className="mt-5 space-y-3">
              {reasons.items.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease }}
                  className="flex gap-3 rounded-2xl border border-espresso-900/10 bg-white/60 p-4"
                >
                  <span className="font-serif-d grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sunflower-300 to-ember text-sm font-semibold italic text-espresso-950">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-espresso-950">{r.title}</span>
                    <span className="font-serif-d block text-[15px] italic leading-snug text-espresso-900/80">{r.text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-5 text-center text-sm font-light text-espresso-900/70">{reasons.sign}</p>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
