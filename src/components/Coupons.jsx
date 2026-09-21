import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Ticket } from 'lucide-react';
import { coupons } from '../config';

/** Modal "Cupones canjeables": vales editables desde config.js */
export default function Coupons({ open, onClose }) {
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
          key="coupons"
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={coupons.title}
        >
          <div className="absolute inset-0 bg-espresso-950/75 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.article
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className="relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-sunflower-300/40 bg-cream p-7 text-left sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar cupones"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-espresso-900/50 transition-all hover:rotate-90 hover:bg-espresso-950/5 hover:text-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-ember">
              <Ticket className="h-3.5 w-3.5" strokeWidth={2} />
              {coupons.subtitle}
            </p>
            <h3 className="font-serif-d mt-2 text-3xl font-semibold italic text-espresso-950">
              {coupons.title}
            </h3>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {coupons.items.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-2xl border-2 border-dashed border-ember/40 bg-white/70 p-4"
                >
                  <span className="text-2xl" aria-hidden>{c.icon}</span>
                  <span className="mt-1 block text-sm font-semibold text-espresso-950">{c.title}</span>
                  <span className="mt-0.5 block text-[13px] font-light leading-snug text-espresso-900/75">{c.text}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-5 text-center text-sm font-light text-espresso-900/70">{coupons.sign}</p>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
