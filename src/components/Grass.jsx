import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { density } from '../config';

/** Matas de hierba en primer plano, balanceándose con la brisa. */
export default function Grass({ isMobile, glow = false }) {
  const reduced = useReducedMotion();
  const tufts = useMemo(() => {
    if (reduced) return [];
    const n = isMobile ? density.grassMobile : density.grassDesktop;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: (i * 53.13 + 4) % 100,
      w: 34 + ((i * 17) % 40),
      h: 40 + ((i * 23) % 55),
      dur: 3.6 + ((i * 7) % 30) / 10,
      delay: -((i * 1.7) % 5),
      sway: 2 + (i % 3),
      tone: i % 3,
    }));
  }, [isMobile, reduced]);

  if (reduced) return null;

  const greens = ['#2A3A1E', '#3E5527', '#1C2615'];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[26] h-[14vh]" aria-hidden>
      {tufts.map((t) => (
        <div
          key={t.id}
          className="anim-sway absolute bottom-0"
          style={{
            left: `${t.left}%`, width: t.w, height: t.h,
            '--sway-from': `${-t.sway}deg`, '--sway-to': `${t.sway}deg`,
            animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s`,
          }}
        >
          <svg viewBox="0 0 40 60" className="h-full w-full overflow-visible" preserveAspectRatio="none">
            {[-14, -7, 0, 7, 14].map((dx, b) => {
              const bend = dx * 0.9 + (t.id % 5) - 2;
              const h = 60 - Math.abs(dx) * 1.1 - (b % 2) * 7;
              return (
                <path
                  key={b}
                  d={`M20 60 Q ${20 + bend * 0.3} ${h * 0.55} ${20 + bend} ${60 - h}`}
                  stroke={greens[(t.tone + b) % 3]}
                  strokeWidth={3.4 - Math.abs(dx) * 0.08}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.95}
                  style={glow ? { filter: 'drop-shadow(0 0 4px rgba(255,205,90,.5))' } : undefined}
                />
              );
            })}
          </svg>
        </div>
      ))}
    </div>
  );
}
