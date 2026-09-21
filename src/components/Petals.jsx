import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { density } from '../config';

/** Partículas doradas ambientales + lluvia de pétalos (modo sorpresa). */
export function AmbientParticles({ isMobile, shower = false }) {
  const reduced = useReducedMotion();
  const count = isMobile ? density.petalsAmbientMobile : density.petalsAmbientDesktop;

  const motes = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: isMobile ? density.particlesMobile : density.particlesDesktop }, (_, i) => ({
      id: `m-${i}`,
      left: (i * 41.3 + 7) % 100,
      size: 1.5 + ((i * 11) % 3.5),
      dur: 10 + ((i * 5) % 14),
      delay: -((i * 2.7) % 16),
      dx: ((i * 31) % 80) - 40,
      op: 0.2 + ((i * 13) % 45) / 100,
    }));
  }, [isMobile, reduced]);

  const petals = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: `p-${i}`,
      left: (i * 53.7 + 13) % 100,
      size: 7 + ((i * 7) % 9),
      dur: 11 + ((i * 3) % 9),
      delay: -((i * 4.1) % 14),
      dx: ((i * 37) % 90) - 45,
      op: 0.35 + ((i * 19) % 40) / 100,
      hue: i % 3 === 0 ? '#FFE27A' : i % 3 === 1 ? '#FFD93B' : '#F5A968',
    }));
  }, [count, reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <span
          key={m.id}
          className="anim-drift absolute bottom-[-4vh] rounded-full"
          style={{
            left: `${m.left}%`, width: m.size, height: m.size,
            background: 'radial-gradient(circle, #FFE9A8 0%, rgba(255,217,59,.12) 70%, transparent 100%)',
            animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s`,
            '--dx': `${m.dx}px`, '--po': m.op,
          }}
        />
      ))}
      {petals.map((p) => (
        <span
          key={p.id}
          className="anim-petal-float absolute bottom-[8vh]"
          style={{
            left: `${p.left}%`, width: p.size, height: p.size * 0.72,
            background: `linear-gradient(135deg, ${p.hue}, rgba(255,255,255,.55) 60%, ${p.hue})`,
            borderRadius: '62% 4% 62% 4%',
            opacity: 0,
            animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
            '--dx': `${p.dx}px`, '--po': p.op,
            filter: 'blur(0.3px)',
          }}
        />
      ))}
      {shower && <PetalShower />}
    </div>
  );
}

/** Lluvia suave de pétalos amarillos (sorpresa). */
export function PetalShower() {  const reduced = useReducedMotion();
  const drops = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: density.petalsShower }, (_, i) => ({
      id: `s-${i}`,
      left: (i * 29.7 + 5) % 100,
      size: 8 + ((i * 11) % 12),
      dur: 6 + ((i * 7) % 7),
      delay: -((i * 1.7) % 8),
      drift: ((i * 43) % 120) - 60,
      op: 0.5 + ((i * 23) % 45) / 100,
    }));
  }, [reduced]);

  if (reduced) return null;
  return (
    <>
      {drops.map((d) => (
        <span
          key={d.id}
          className="anim-petal-fall absolute top-[-6vh]"
          style={{
            left: `${d.left}%`, width: d.size, height: d.size * 0.7,
            background: 'linear-gradient(135deg, #FFE27A 0%, #FFD93B 55%, #E8930C 130%)',
            borderRadius: '64% 6% 64% 6%',
            boxShadow: '0 2px 10px rgba(232,147,12,.25)',
            opacity: 0,
            animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`,
            '--drift': `${d.drift}px`, '--po': d.op,
          }}
        />
      ))}
    </>
  );
}

function Heart({ size, color, glow }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      style={glow ? { filter: 'drop-shadow(0 0 6px rgba(255,180,80,.8))' } : undefined}
      aria-hidden
    >
      <path
        d="M12 21C7 16.5 3 13.2 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 3.9-4 7.2-9 11.7z"
        fill={color}
      />
    </svg>
  );
}

/** Corazones flotantes: suben lento como motas de cariño (sutiles, pocos). */
export function FloatingHearts({ count = 8, falling = false }) {
  const reduced = useReducedMotion();
  const hearts = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: `h-${i}`,
      left: (i * 61.3 + 9) % 100,
      size: 9 + ((i * 5) % 9),
      dur: falling ? 7 + ((i * 3) % 6) : 12 + ((i * 5) % 10),
      delay: -((i * 3.7) % 14),
      drift: ((i * 53) % 100) - 50,
      op: 0.35 + ((i * 17) % 35) / 100,
      color: i % 3 === 0 ? '#F5A968' : i % 3 === 1 ? '#FFD93B' : '#FAF3E3',
    }));
  }, [count, falling, reduced]);

  if (reduced) return null;
  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          className={`absolute ${falling ? 'anim-petal-fall top-[-6vh]' : 'anim-petal-float bottom-[6vh]'}`}
          style={{
            left: `${h.left}%`, opacity: 0,
            animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`, '--dx': `${h.drift}px`, '--po': h.op,
          }}
        >
          <Heart size={h.size} color={h.color} glow={falling} />
        </span>
      ))}
    </>
  );
}
