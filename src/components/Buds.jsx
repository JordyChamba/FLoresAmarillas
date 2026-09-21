import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { density, timing } from '../config';

/** Capullos cerrados: promesas de flores entre las abiertas. */
export default function Buds({ isMobile, glow = false }) {
  const reduced = useReducedMotion();
  const buds = useMemo(() => {
    const n = isMobile ? density.budsMobile : density.budsDesktop;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      x: 3 + ((i * 67.7 + 11) % 94),
      size: 56 + ((i * 29) % 54),
      bottom: 6 + ((i * 31) % 58),
      delay: 0.4 + i * 0.22 + ((i * 13) % 10) / 20,
      sway: 4.5 + ((i * 7) % 30) / 10,
      lean: ((i * 17) % 16) - 8,
      tone: i % 3,
    }));
  }, [isMobile]);

  return (
    <>
      {buds.map((b) => (
        <div
          key={b.id}
          className="pointer-events-none absolute bottom-0"
          style={{
            left: `${b.x}%`, width: b.size, height: b.size * 1.9,
            marginBottom: b.bottom, transform: 'translateX(-50%)',
            zIndex: 18,
          }}
          aria-hidden
        >
          <div
            className={reduced ? 'h-full w-full' : 'anim-sway h-full w-full'}
            style={reduced ? undefined : {
              '--sway-from': `${-2.4}deg`, '--sway-to': `${2.4}deg`,
              animationDuration: `${b.sway}s`, animationDelay: `${-b.delay}s`,
            }}
          >
            <svg viewBox="0 0 60 120" className="h-full w-full overflow-visible">
              {/* tallo fino */}
              <motion.path
                d={`M30 118 C 30 92, ${30 + b.lean} 70, ${30 + b.lean} 44`}
                stroke="#2A3A1E" strokeWidth={2.6} fill="none" strokeLinecap="round"
                initial={reduced ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
                animate={reduced ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                transition={{ delay: timing.firstStem + b.delay, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* capullo */}
              <motion.g
                initial={reduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: timing.firstStem + b.delay + 0.7, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${30 + b.lean}px 34px` }}
              >
                <g transform={`translate(${30 + b.lean} 30) rotate(${b.lean})`}>
                  {/* sépalos */}
                  <path d="M0 14 L-7 2 L0 -2 L7 2 Z" fill="#3E5527" />
                  <path d="M0 14 L-4 4 L4 4 Z" fill="#1C2615" />
                  {/* cuerpo del capullo */}
                  <ellipse
                    cx={0} cy={-4} rx={8.5} ry={13}
                    fill={b.tone === 0 ? '#F5B81E' : b.tone === 1 ? '#FFD93B' : '#E8930C'}
                    stroke="#B97A08" strokeWidth={0.8}
                    style={glow ? { filter: 'brightness(1.2) drop-shadow(0 0 8px rgba(255,200,60,.8))' } : undefined}
                  />
                  <path d="M0 -17 C -4 -10, -4 -2, 0 6" stroke="#FFF0B8" strokeWidth={1.4} fill="none" opacity={0.8} />
                </g>
              </motion.g>
            </svg>
          </div>
        </div>
      ))}
    </>
  );
}
