import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { wish } from '../config';
import { FloatingHearts } from './Petals';
import { useReducedMotion } from '../hooks/useReducedMotion';

function Candle({ lit, onBlow }) {
  return (
    <button
      type="button"
      onClick={onBlow}
      aria-label={lit ? 'Soplar la vela' : 'Vela apagada'}
      aria-pressed={!lit}
      className="group relative mx-auto flex cursor-pointer flex-col items-center px-8 py-4 focus:outline-none"
    >
      {/* llama */}
      <span className="pointer-events-none relative mb-1 block h-14 w-14" aria-hidden>
        <AnimatePresence>
          {lit && (
            <motion.span
              key="flame"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.12, 0.95, 1.08, 1] }}
              exit={{ opacity: 0, scale: 0.3, y: -8, transition: { duration: 0.35, ease: 'easeOut' } }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-0 block h-9 w-6 -translate-x-1/2 rounded-full bg-gradient-to-t from-ember via-sunflower-400 to-cream"
              style={{ filter: 'blur(0.5px)', boxShadow: '0 0 28px 8px rgba(255,200,80,.65)' }}
            />
          )}
        </AnimatePresence>
        {!lit && (
          <motion.span
            key="smoke"
            initial={{ opacity: 0.9, y: 0 }}
            animate={{ opacity: 0, y: -26 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute left-1/2 top-2 block h-6 w-2 -translate-x-1/2 rounded-full bg-white/40 blur-[3px]"
          />
        )}
        {/* halo: solo brilla con la vela encendida */}
        <span
          className="absolute left-1/2 top-2 h-16 w-16 -translate-x-1/2 rounded-full transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(255,200,100,.4), transparent 70%)',
            filter: 'blur(4px)',
            opacity: lit ? 1 : 0,
          }}
        />
      </span>
      {/* vela */}
      <span
        className="pointer-events-none block w-10 rounded-t-lg bg-gradient-to-b from-[#FFF6D6] to-[#EDE0C4] transition-shadow duration-500"
        style={{ height: 92, boxShadow: lit ? '0 0 22px rgba(255,200,100,.35)' : 'none' }}
      />
      <span className="pointer-events-none mt-2 h-1.5 w-16 rounded-full bg-espresso-900/15" />
      <span className="pointer-events-none mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-espresso-900/60 transition-colors group-hover:text-espresso-950">
        {lit ? wish.hint : '✨'}
      </span>
    </button>
  );
}

/** Modal "Pide un deseo": sopla la vela para sellarlo */
export default function Wish({ open, onClose }) {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(true);
  const wasOpen = useRef(false);

  // Solo se reenciende al ABRIR el modal (transición cerrado → abierto),
  // nunca por re-renders del padre (parallax, etc.).
  useEffect(() => {
    if (open && !wasOpen.current) setLit(true);
    wasOpen.current = open;
  }, [open]);

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
          key="wish"
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={wish.title}
        >
          <div className="absolute inset-0 bg-espresso-950/80 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.article
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className="relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-sunflower-300/40 bg-cream p-7 text-center sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar deseo"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-espresso-900/50 transition-all hover:rotate-90 hover:bg-espresso-950/5 hover:text-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <h3 className="font-serif-d text-3xl font-semibold italic text-espresso-950">{wish.title}</h3>
            <p className="font-serif-d mx-auto mt-3 max-w-sm text-[17px] italic leading-relaxed text-espresso-900/80">
              {lit ? wish.text : wish.madeText}
            </p>

            <div className="my-6">
              <Candle lit={lit} onBlow={() => setLit(false)} />
            </div>

            {!lit && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {!reduced && <FloatingHearts count={8} />}
                <p className="font-serif-d text-2xl italic text-espresso-950">{wish.madeTitle}</p>
              </motion.div>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
