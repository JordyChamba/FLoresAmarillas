import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { density } from '../config';

/** Mariposas elegantes: silueta ámbar translúcida, vuelo curvo lento. */
export default function Butterflies() {
  const reduced = useReducedMotion();
  const flies = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: density.butterflies }, (_, i) => ({
      id: i,
      top: 18 + i * 14 + ((i * 7) % 8),
      size: 20 + ((i * 5) % 10),
      dur: 34 + i * 12,
      delay: -(i * 13),
      path: i % 2 === 0 ? 'anim-butterfly-a' : 'anim-butterfly-b',
      op: 0.5 + (i % 2) * 0.15,
    }));
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {flies.map((f) => (
        <div
          key={f.id}
          className={`absolute left-0 ${f.path}`}
          style={{ top: `${f.top}%`, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`, opacity: f.op }}
        >
          <svg width={f.size} height={f.size * 0.75} viewBox="0 0 40 30" fill="none">
            <g className="anim-wing">
              <ellipse cx="10" cy="14" rx="9" ry="11" fill="#E4C566" opacity="0.85" transform="rotate(-18 10 14)" />
              <ellipse cx="10" cy="14" rx="5" ry="7" fill="#FAF3E3" opacity="0.5" transform="rotate(-18 10 14)" />
            </g>
            <g className="anim-wing" style={{ animationDelay: '0.08s' }}>
              <ellipse cx="30" cy="14" rx="9" ry="11" fill="#D9960B" opacity="0.85" transform="rotate(18 30 14)" />
              <ellipse cx="30" cy="14" rx="5" ry="7" fill="#FAF3E3" opacity="0.5" transform="rotate(18 30 14)" />
            </g>
            <rect x="19" y="8" width="2" height="15" rx="1" fill="#3A2A10" opacity="0.8" />
          </svg>
        </div>
      ))}
    </div>
  );
}
