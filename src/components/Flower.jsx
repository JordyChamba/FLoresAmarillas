import { useId, useMemo } from 'react';
import { motion } from 'framer-motion';
import { timing } from '../config';

/**
 * Flor amarilla procedural (SVG).
 * Cada `variant` cambia: nº de pétalos, forma, inclinación y tono,
 * para que ninguna parezca un clon.
 */
export default function Flower({
  variant = 0,
  size = 120,
  x = 50, // % left
  bottom = 0, // px offset sobre el suelo
  depth = 1, // 0 fondo → 1 frente (controla blur/contraste)
  delay = 0,
  swayDuration = 6,
  glow = false,
  reduced = false,
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const cfg = useMemo(() => {
    const v = ((variant % 5) + 5) % 5;
    return [
      { petals: 9,  len: 30, wid: 13,   twist: 8,  lean: -7, tone: 0,    cup: 0.92 },
      { petals: 12, len: 26, wid: 11,   twist: -6, lean: 6,  tone: 8,    cup: 1.0 },
      { petals: 8,  len: 33, wid: 15,   twist: 14, lean: -3, tone: -8,   cup: 0.86 },
      { petals: 11, len: 28, wid: 12,   twist: -12,lean: 9,  tone: 14,   cup: 0.96 },
      { petals: 10, len: 31, wid: 12.5, twist: 4,  lean: -10,tone: -14,  cup: 0.9 },
    ][v];
  }, [variant]);

  const petalFill = `url(#petal-${uid})`;
  const swayFrom = `${-2 - (variant % 3) * 0.9}deg`;
  const swayTo = `${2 + ((variant + 1) % 3) * 0.9}deg`;

  const blur = depth < 0.35 ? 'blur-[2.5px]' : depth < 0.65 ? 'blur-[1px]' : '';
  const dim = depth < 0.35 ? 'opacity-80 saturate-[.85] brightness-[.92]' : depth < 0.65 ? 'opacity-95' : '';

  const stemAnim = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { scaleY: 0, opacity: 0 },
        animate: { scaleY: 1, opacity: 1 },
        transition: { delay: timing.firstStem + delay, duration: timing.stemGrow, ease: [0.22, 1, 0.36, 1] },
      };

  const bloomAnim = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { scale: 0, rotate: -24 + cfg.twist },
        animate: { scale: 1, rotate: 0 },
        transition: {
          delay: timing.firstStem + delay + timing.stemGrow * 0.55,
          duration: timing.bloomPop,
          ease: [0.34, 1.56, 0.64, 1],
        },
      };

  return (
    <div
      className={`pointer-events-none absolute bottom-0 ${blur} ${dim}`}
      style={{
        left: `${x}%`,
        width: size,
        height: size * 2.1,
        marginBottom: bottom,
        zIndex: Math.round(10 + depth * 20),
        transform: 'translateX(-50%)',
      }}
      aria-hidden
    >
      <div
        className={reduced ? undefined : 'anim-sway h-full w-full'}
        style={reduced ? undefined : {
          '--sway-from': swayFrom,
          '--sway-to': swayTo,
          animationDuration: `${swayDuration}s`,
          animationDelay: `${-(delay * 2.3).toFixed(2)}s`,
        }}
      >
        <svg viewBox="0 0 100 220" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`petal-${uid}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#E8930C" />
              <stop offset="45%" stopColor="#F5B81E" />
              <stop offset="100%" stopColor="#FFE27A" />
            </linearGradient>
            <radialGradient id={`core-${uid}`} cx="0.38" cy="0.34" r="0.9">
              <stop offset="0%" stopColor="#8A5A12" />
              <stop offset="55%" stopColor="#5C3A08" />
              <stop offset="100%" stopColor="#2E1D04" />
            </radialGradient>
            <linearGradient id={`stem-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#243318" />
              <stop offset="50%" stopColor="#3E5527" />
              <stop offset="100%" stopColor="#1C2615" />
            </linearGradient>
          </defs>

          {/* tallo */}
          <motion.g
            initial={stemAnim.initial}
            animate={stemAnim.animate}
            transition={stemAnim.transition}
            style={{ transformOrigin: '50px 212px' }}
          >
            <path
              d={`M50 212 C 50 ${168 - cfg.lean}, ${50 + cfg.lean} 130, ${50 + cfg.lean} 78`}
              stroke={`url(#stem-${uid})`}
              strokeWidth={depth > 0.65 ? 4.2 : 3}
              fill="none"
              strokeLinecap="round"
            />
            {/* hojas */}
            <ellipse
              cx={46 + cfg.lean * 0.4} cy={152} rx={13} ry={5}
              fill="#3E5527" opacity={0.95}
              transform={`rotate(${-24 + cfg.twist} ${46 + cfg.lean * 0.4} 152)`}
            />
            <ellipse
              cx={54 + cfg.lean * 0.6} cy={128} rx={11} ry={4.4}
              fill="#2A3A1E" opacity={0.95}
              transform={`rotate(${22 - cfg.twist} ${54 + cfg.lean * 0.6} 128)`}
            />
            <ellipse
              cx={47 + cfg.lean * 0.35} cy={152} rx={6} ry={1.8}
              fill="#9AA65C" opacity={0.5}
              transform={`rotate(${-24 + cfg.twist} ${47 + cfg.lean * 0.35} 152)`}
            />
          </motion.g>

          {/* corola */}
          <motion.g
            initial={bloomAnim.initial}
            animate={bloomAnim.animate}
            transition={bloomAnim.transition}
            style={{ transformOrigin: `${50 + cfg.lean}px 66px` }}
          >
            <g transform={`translate(${50 + cfg.lean} 62)`}>
              {/* halo trasero */}
              {Array.from({ length: cfg.petals }).map((_, i) => {
                const a = (360 / cfg.petals) * i + cfg.twist + 180 / cfg.petals;
                return (
                  <ellipse
                    key={`b-${i}`}
                    cx={0} cy={-cfg.len * 0.52 * cfg.cup}
                    rx={cfg.wid * 0.52} ry={cfg.len * 0.52}
                    fill="#D9960B"
                    opacity={0.9}
                    transform={`rotate(${a})`}
                  />
                );
              })}
              {/* pétalos frontales */}
              {Array.from({ length: cfg.petals }).map((_, i) => {
                const a = (360 / cfg.petals) * i + cfg.twist;
                return (
                  <g key={`f-${i}`} transform={`rotate(${a})`}>
                    <ellipse
                      cx={0} cy={-cfg.len * 0.52}
                      rx={cfg.wid * 0.52} ry={cfg.len * 0.52}
                      fill={petalFill}
                      stroke="#B97A08"
                      strokeWidth={0.5}
                      strokeOpacity={0.5}
                      style={glow ? { filter: 'brightness(1.18) saturate(1.25)' } : undefined}
                    />
                    <line
                      x1={0} y1={-6} x2={0} y2={-cfg.len * 0.86}
                      stroke="#C98A12" strokeWidth={0.8} opacity={0.55}
                    />
                  </g>
                );
              })}
              {/* centro */}
              <circle
                r={11 - cfg.tone * 0.02}
                fill={`url(#core-${uid})`}
                stroke="#1D1204"
                strokeWidth={1}
                style={glow ? { filter: 'drop-shadow(0 0 10px rgba(255,200,60,.9))' } : undefined}
              />
              {Array.from({ length: 14 }).map((_, i) => {
                const a = (i / 14) * Math.PI * 2 + cfg.twist;
                return (
                  <circle
                    key={`s-${i}`}
                    cx={Math.cos(a) * (4 + (i % 3))}
                    cy={Math.sin(a) * (4 + (i % 3))}
                    r={1.05}
                    fill={i % 3 === 0 ? '#FFD93B' : '#C98A12'}
                    opacity={0.9}
                  />
                );
              })}
              {glow && (
                <circle r={17} fill="none" stroke="#FFD93B" strokeWidth={1.4} opacity={0.75}
                  style={{ filter: 'blur(1px)' }} />
              )}
            </g>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
