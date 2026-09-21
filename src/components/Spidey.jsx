import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { spidey } from '../config';
import { FloatingHearts } from './Petals';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Glifo de arañita simpática con mini girasol (reusable en botones). */
export function SpiderGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 80 92" className={className} aria-hidden fill="none">
      <g stroke="#23203A" strokeWidth={4} strokeLinecap="round">
        <path d="M26 52 C 16 48, 10 38, 4 40" />
        <path d="M24 60 C 14 60, 8 66, 2 64" />
        <path d="M24 68 C 16 72, 12 80, 6 80" />
        <path d="M28 74 C 24 82, 22 86, 18 88" />
        <path d="M54 52 C 64 48, 70 38, 76 40" />
        <path d="M56 60 C 66 60, 72 66, 78 64" />
        <path d="M56 68 C 64 72, 68 80, 74 80" />
        <path d="M52 74 C 56 82, 58 86, 62 88" />
      </g>
      <ellipse cx={40} cy={62} rx={16} ry={19} fill="#B3232A" />
      <g stroke="#E4C566" strokeWidth={1.4} opacity={0.9}>
        <path d="M40 45 L40 79 M25 62 L55 62" />
        <path d="M29 50 L51 74 M51 50 L29 74" />
      </g>
      <circle cx={40} cy={34} r={13} fill="#1E4FD8" />
      <ellipse cx={33} cy={32} rx={5.5} ry={7} fill="#fff" transform="rotate(-18 33 32)" />
      <ellipse cx={47} cy={32} rx={5.5} ry={7} fill="#fff" transform="rotate(18 47 32)" />
      <circle cx={34} cy={34} r={2} fill="#23203A" />
      <circle cx={46} cy={34} r={2} fill="#23203A" />
      <g transform="translate(40 15)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx={0} cy={-5} rx={2.6} ry={5} fill="#FFD93B" transform={`rotate(${a})`} />
        ))}
        <circle r={3.4} fill="#5C3A08" />
      </g>
    </svg>
  );
}

function CarriedFlower({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden
      style={{ filter: 'drop-shadow(0 0 10px rgba(255,200,60,.9))' }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx={30} cy={14} rx={6} ry={13} fill="#FFD93B" stroke="#B97A08" strokeWidth={1}
          transform={`rotate(${i * 45} 30 30)`} />
      ))}
      <circle cx={30} cy={30} r={9} fill="#5C3A08" />
      <circle cx={30} cy={30} r={12.5} fill="none" stroke="#FFD93B" strokeWidth={1.5} opacity={0.85} />
    </svg>
  );
}

function CornerWeb({ flip = false }) {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      className={`absolute top-0 ${flip ? 'right-0' : 'left-0'} h-44 w-44 sm:h-60 sm:w-60`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: flip ? 'top right' : 'top left', scaleX: flip ? -1 : 1 }}
      aria-hidden
    >
      <g stroke="#E4C566" strokeWidth={1.6} opacity={0.8} fill="none">
        <line x1={0} y1={0} x2={155} y2={28} />
        <line x1={0} y1={0} x2={120} y2={80} />
        <line x1={0} y1={0} x2={80} y2={120} />
        <line x1={0} y1={0} x2={28} y2={155} />
        <path d="M42 0 Q 42 42 0 42" />
        <path d="M84 0 Q 84 84 0 84" />
        <path d="M126 0 Q 126 126 0 126" />
      </g>
    </motion.svg>
  );
}

function Confetti() {
  const [gone, setGone] = useState(false);
  const pieces = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: (i * 37.7 + 7) % 100,
        size: 6 + ((i * 7) % 7),
        color: ['#C22A2A', '#1E4FD8', '#FFD93B', '#FAF3E3'][i % 4],
        dur: 2.4 + ((i * 5) % 20) / 10,
        delay: (i % 8) * 0.12,
        round: i % 3 === 0,
      })),
    []
  );
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 5400);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-[-3vh]"
          style={{
            left: `${p.left}%`, width: p.size, height: p.round ? p.size : p.size * 0.6,
            background: p.color, borderRadius: p.round ? '50%' : '2px',
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '112vh', rotate: 540, opacity: 0.9 }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

/**
 * Easter egg arácnido: la arañita desciende, lanza su telaraña,
 * cruza el jardín con un girasol y lo deja caer con confeti.
 */
export default function Spidey({ onClose }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState('descend'); // descend → thwip → swing → drop → gift

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setPhase('gift'), 700);
      return () => clearTimeout(t);
    }
    const seq = [['thwip', 1500], ['swing', 1150], ['drop', 2300], ['gift', 1000]];
    let acc = 0;
    const ids = seq.map(([p, d]) => {
      acc += d;
      return setTimeout(() => setPhase(p), acc);
    });
    return () => ids.forEach(clearTimeout);
  }, [reduced]);

  const swinging = phase === 'swing' || phase === 'drop' || phase === 'gift';
  const dropped = phase === 'drop' || phase === 'gift';

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Sorpresa arácnida"
    >
      {/* tinte rojo/azul sutil */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          background:
            'radial-gradient(circle at 8% 6%, rgba(194,42,42,.22), transparent 42%), radial-gradient(circle at 92% 10%, rgba(30,79,216,.22), transparent 42%)',
        }}
        aria-hidden
      />
      {!reduced && (
        <>
          <CornerWeb />
          <CornerWeb flip />
        </>
      )}

      {/* cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar sorpresa arácnida"
        className="pointer-events-auto absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-cream backdrop-blur-md transition-all hover:rotate-90 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-300"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* araña colgando */}
      <motion.div
        className="absolute left-1/2 top-0 flex w-24 flex-col items-center"
        initial={reduced ? { x: '-50%', y: '16vh' } : { x: '-50%', y: '-34vh' }}
        animate={
          reduced
            ? { x: '-50%', y: '16vh' }
            : phase === 'descend'
              ? { x: '-50%', y: ['-34vh', '2vh'] }
              : swinging
                ? { x: ['-50%', 'calc(-50% - 20vw)'], y: '2vh' }
                : { x: '-50%', y: '2vh' }
        }
        transition={
          phase === 'descend'
            ? { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
            : swinging
              ? { duration: 2.2, ease: 'easeInOut' }
              : { duration: 0.4 }
        }
        aria-hidden
      >
        <div className="h-[24vh] w-[2px] bg-gradient-to-b from-transparent via-white/60 to-white/90" />
        <motion.div
          animate={reduced || phase === 'descend' ? {} : { rotate: [0, -12, 12, -7, 0] }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <SpiderGlyph className="h-20 w-20 drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]" />
          {!dropped && (
            <motion.div
              className="-mt-1"
              animate={reduced ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CarriedFlower />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* ¡THWIP! */}
      <AnimatePresence>
        {phase === 'thwip' && (
          <motion.div
            key="thwip"
            className="absolute left-1/2 top-[34vh]"
            initial={{ opacity: 0, scale: 0, rotate: -20, x: '-30%' }}
            animate={{ opacity: 1, scale: 1, rotate: -6, x: '-30%' }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 16 }}
            aria-hidden
          >
            <div className="relative rounded-2xl border-4 border-[#B3232A] bg-white px-5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <span className="text-lg font-black tracking-wide text-espresso-950">{spidey.bubble}</span>
              <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-b-4 border-l-4 border-[#B3232A] bg-white" />
            </div>
            {/* hilo de telaraña dorada */}
            <motion.svg
              className="absolute left-full top-1/2 h-40 w-48"
              viewBox="0 0 190 160"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-hidden
            >
              <motion.line
                x1={6} y1={6} x2={180} y2={140}
                stroke="#E4C566" strokeWidth={3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <motion.circle
                cx={180} cy={140} r={10}
                stroke="#E4C566" strokeWidth={2} fill="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                style={{ transformOrigin: '180px 140px' }}
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* flor cayendo */}
      <AnimatePresence>
        {phase === 'drop' && (
          <motion.div
            key="drop"
            className="absolute left-[30%] top-[38vh]"
            initial={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
            animate={{ y: '34vh', rotate: 200, opacity: 1, scale: 0.9 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}
            aria-hidden
          >
            <CarriedFlower size={52} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* celebración + carta */}
      {phase === 'gift' && (
        <>
          {!reduced && <Confetti />}
          {!reduced && <FloatingHearts count={10} falling />}
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <motion.article
              initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.15 }}
              className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[2rem] bg-cream p-7 text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-2.5 bg-gradient-to-r from-[#B3232A] via-[#FFD93B] to-[#1E4FD8]" aria-hidden />
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 14 }}
                className="mx-auto -mt-1 w-fit"
              >
                <SpiderGlyph className="h-16 w-16" />
              </motion.div>
              <h3 className="font-serif-d mt-3 text-2xl font-semibold italic leading-snug text-espresso-950 sm:text-[1.7rem]">
                {spidey.title}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[15px] font-light leading-relaxed text-espresso-900/85">
                {spidey.text}
              </p>
              <p className="mt-4 text-sm font-light text-espresso-900/70">{spidey.sign}</p>
              <button
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso-950 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-cream shadow-lg transition-all duration-300 hover:scale-105 hover:bg-espresso-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                {spidey.close} 💛
              </button>
            </motion.article>
          </div>
        </>
      )}
    </motion.div>
  );
}
