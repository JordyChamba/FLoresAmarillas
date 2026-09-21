import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Siluetas de pájaros cruzando el cielo (momentos diurnos). */
export default function Birds() {
  const reduced = useReducedMotion();
  const birds = useMemo(() => {
    if (reduced) return [];
    return [
      { top: 12, dur: 42, delay: -6, size: 26, dark: 0.55 },
      { top: 17, dur: 55, delay: -30, size: 20, dark: 0.45 },
      { top: 9, dur: 64, delay: -48, size: 32, dark: 0.4 },
      { top: 22, dur: 48, delay: -18, size: 16, dark: 0.5 },
    ];
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {birds.map((b, i) => (
        <div
          key={i}
          className="anim-butterfly-a absolute left-0"
          style={{ top: `${b.top}%`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          <svg width={b.size} height={b.size * 0.4} viewBox="0 0 24 10" fill="none" className="anim-bob">
            <path
              d="M1 7 Q6 1 12 6 Q18 1 23 7"
              stroke="#2E1A08" strokeWidth={1.6} strokeLinecap="round" opacity={b.dark}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
