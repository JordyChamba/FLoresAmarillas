import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { copy, timing } from '../config';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Carrusel de frases románticas bajo el mensaje principal. */
export default function LoveNotes({ night = false }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || copy.loveNotes.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % copy.loveNotes.length), 4200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: timing.messageDelay + 1.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 flex h-7 items-center justify-center"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`font-serif-d text-base italic sm:text-lg ${night ? 'text-cream/80' : 'text-espresso-950/75'}`}
        >
          “{copy.loveNotes[i]}”
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
