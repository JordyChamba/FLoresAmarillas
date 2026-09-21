import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { density } from '../config';

/** Cielo estrellado con titileo + 2 estrellas fugaces periódicas. */
export default function Stars({ isMobile }) {
  const reduced = useReducedMotion();
  const stars = useMemo(() => {
    if (reduced) return [];
    const n = isMobile ? density.starsMobile : density.starsDesktop;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: (i * 37.31 + 5) % 100,
      top: (i * 23.7 + 2) % 52,
      size: 1 + ((i * 7) % 20) / 10,
      dur: 1.6 + ((i * 13) % 28) / 10,
      delay: -((i * 1.9) % 5),
      warm: i % 4 === 0,
    }));
  }, [isMobile, reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="anim-twinkle absolute rounded-full"
          style={{
            left: `${s.left}%`, top: `${s.top}%`,
            width: s.size, height: s.size,
            background: s.warm ? '#FFE9A8' : '#FFFFFF',
            boxShadow: s.warm ? '0 0 6px 1px rgba(255,220,130,.8)' : '0 0 5px 1px rgba(255,255,255,.6)',
            animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {/* fugaces */}
      {[
        { top: '9%', right: '6%', dur: 11, delay: -2 },
        { top: '20%', right: '22%', dur: 16, delay: -9 },
      ].map((m, i) => (
        <span
          key={`shoot-${i}`}
          className="anim-shoot absolute block h-[2px] w-28 rounded-full"
          style={{
            top: m.top, right: m.right,
            background: 'linear-gradient(to left, #FFF 10%, rgba(255,240,200,.7) 40%, transparent 100%)',
            filter: 'blur(0.4px)',
            animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
