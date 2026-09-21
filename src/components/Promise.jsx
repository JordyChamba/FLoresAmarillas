import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { promise } from '../config';
import { WandGlyph } from './Potter';

/** Modal "Hechizo en verso": poema Potter que rima, editable desde config.js */
export default function PromiseSeal({ open, onClose }) {
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
          key="promise"
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={promise.title}
        >
          <div className="absolute inset-0 bg-espresso-950/75 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.article
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className="relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-sunflower-300/40 bg-gradient-to-b from-cream to-cream-dim p-7 text-center sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label={`Cerrar ${promise.title}`}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-espresso-900/50 transition-all hover:rotate-90 hover:bg-espresso-950/5 hover:text-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 14 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#3A2560] to-[#1E1440] shadow-[0_0_30px_-6px_rgba(60,35,110,0.8)]"
            >
              <WandGlyph className="h-8 w-8" />
            </motion.div>

            <h3 className="font-serif-d mt-4 text-3xl font-semibold italic text-espresso-950">
              {promise.title}
            </h3>
            {promise.verses ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-serif-d mx-auto mt-4 max-w-sm text-[17px] italic leading-relaxed text-espresso-900/85"
              >
                {promise.verses.map((line, i) =>
                  line === '' ? (
                    <span key={i} className="block h-3" aria-hidden />
                  ) : (
                    <span key={i} className="block">{line}</span>
                  )
                )}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-serif-d mx-auto mt-4 max-w-sm text-lg italic leading-relaxed text-espresso-900/85"
              >
                “{promise.text}”
              </motion.p>
            )}
            <p className="mt-5 text-sm font-light tracking-wide text-espresso-900/70">
              {promise.sign}
            </p>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
