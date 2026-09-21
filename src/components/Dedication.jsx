import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Flower2 } from 'lucide-react';
import { dedication, initial } from '../config';
import InitialBloom from './InitialBloom';

/** Modal-dedicatoria para la inicial: una flor que florece con su letra. */
export default function Dedication({ open, onClose }) {
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
          key="dedication"
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Dedicatoria para ${initial}`}
        >
          <div
            className="absolute inset-0 bg-espresso-950/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.article
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className="relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-sunflower-300/40 bg-cream p-7 text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7),0_0_60px_-20px_rgba(255,200,60,0.6)] sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar dedicatoria"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-espresso-900/50 transition-all hover:rotate-90 hover:bg-espresso-950/5 hover:text-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <p className="flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-ember">
              <Flower2 className="h-3.5 w-3.5" strokeWidth={2} />
              {dedication.overline}
            </p>

            <div className="my-2">
              <InitialBloom />
            </div>

            <h3 className="font-serif-d text-3xl font-semibold italic text-espresso-950 sm:text-4xl">
              Para {initial}
            </h3>
            <p className="font-serif-d mx-auto mt-4 max-w-sm text-lg italic leading-relaxed text-espresso-900/85">
              “{dedication.text}”
            </p>
            <p className="mt-5 text-sm font-light tracking-wide text-espresso-900/70">
              {dedication.sign}
            </p>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
