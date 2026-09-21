import { useId } from 'react';
import { motion } from 'framer-motion';
import { initial } from '../config';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Una flor amarilla que florece pétalo a pétalo con la inicial
 * en el corazón, en lugar de semillas. Para la dedicatoria.
 */
export default function InitialBloom() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const reduced = useReducedMotion();
  const petals = 12;

  return (
    <div className="relative mx-auto h-56 w-56" aria-hidden>
      {/* halo */}
      <motion.div
        className="absolute inset-4 rounded-full"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'radial-gradient(circle, rgba(255,215,90,.5) 0%, rgba(255,190,70,.15) 55%, transparent 72%)',
          filter: 'blur(4px)',
        }}
      />
      <svg viewBox="0 0 200 200" className="relative h-full w-full overflow-visible">
        <defs>
          <linearGradient id={`ib-petal-${uid}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#E8930C" />
            <stop offset="45%" stopColor="#F5B81E" />
            <stop offset="100%" stopColor="#FFE27A" />
          </linearGradient>
          <radialGradient id={`ib-core-${uid}`} cx="0.38" cy="0.34" r="0.9">
            <stop offset="0%" stopColor="#8A5A12" />
            <stop offset="55%" stopColor="#5C3A08" />
            <stop offset="100%" stopColor="#2E1D04" />
          </radialGradient>
        </defs>

        <g transform="translate(100 104)">
          {/* halo trasero: rotación estática fuera, animación dentro */}
          {Array.from({ length: petals }).map((_, i) => (
            <g key={`b-${i}`} transform={`rotate(${(360 / petals) * i + 15})`}>
              <motion.ellipse
                cx={0} cy={-27} rx={11} ry={27}
                fill="#D9960B"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={reduced ? { duration: 0.3 } : { delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              />
            </g>
          ))}
          {/* pétalos: rotación estática fuera, animación dentro */}
          {Array.from({ length: petals }).map((_, i) => (
            <g key={`f-${i}`} transform={`rotate(${(360 / petals) * i})`}>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={reduced ? { duration: 0.3 } : { delay: 0.4 + i * 0.07, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              >
                <ellipse
                  cx={0} cy={-30} rx={12.5} ry={30}
                  fill={`url(#ib-petal-${uid})`}
                  stroke="#B97A08" strokeWidth={1} strokeOpacity={0.5}
                />
                <line x1={0} y1={-8} x2={0} y2={-52} stroke="#C98A12" strokeWidth={1.2} opacity={0.55} />
              </motion.g>
            </g>
          ))}
          {/* corazón con la inicial */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduced ? { duration: 0.3 } : { delay: 0.4 + petals * 0.07, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <circle r={27} fill={`url(#ib-core-${uid})`} stroke="#FFD93B" strokeWidth={2} />
            <circle r={32} fill="none" stroke="#FFD93B" strokeWidth={1.2} opacity={0.7} style={{ filter: 'blur(1px)' }} />
            <text
              y={13}
              textAnchor="middle"
              fontSize={34}
              fontStyle="italic"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontWeight={600}
              fill="#FFE9A8"
            >
              {initial}
            </text>
          </motion.g>
        </g>
      </svg>

      {/* destellos orbitando */}
      {!reduced && [0, 60, 120, 180, 240, 300].map((deg) => (
        <span
          key={deg}
          className="anim-twinkle absolute h-1.5 w-1.5 rounded-full bg-sunflower-300"
          style={{
            left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
            top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
            boxShadow: '0 0 8px 2px rgba(255,205,90,.7)',
            animationDuration: `${1.8 + (deg % 3)}s`,
            animationDelay: `${-deg / 120}s`,
          }}
        />
      ))}
    </div>
  );
}
