import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { density } from '../config';

/** Luciérnagas que vagan con luz pulsante (solo de noche). */
export default function Fireflies({ isMobile }) {
  const reduced = useReducedMotion();
  const flies = useMemo(() => {
    if (reduced) return [];
    const n = isMobile ? density.firefliesMobile : density.firefliesDesktop;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      x: 4 + ((i * 41.7) % 92),
      y: 52 + ((i * 29.3) % 40),
      size: 3 + ((i * 5) % 3),
      dur: 8 + ((i * 7) % 7),
      delay: -((i * 2.3) % 10),
      dx: [0, 24 - (i % 48), -18 + (i % 36), 8, 0],
      dy: [0, -20 + (i % 30), -34, -12, 0],
    }));
  }, [isMobile, reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {flies.map((f) => (
        <motion.span
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: `${f.x}%`, top: `${f.y}%`,
            width: f.size, height: f.size,
            background: 'radial-gradient(circle, #FFF3B0 0%, rgba(255,210,80,.85) 35%, rgba(255,180,60,0) 72%)',
            boxShadow: '0 0 12px 3px rgba(255,205,90,.55)',
          }}
          initial={{ opacity: 0 }}
          animate={{ x: f.dx, y: f.dy, opacity: [0, 0.9, 0.45, 1, 0.6, 0] }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
