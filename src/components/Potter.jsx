import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { potter } from '../config';
import { FloatingHearts } from './Petals';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Glifo de varita mágica con destellos (reusable en botones). */
export function WandGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      <rect x={6} y={26} width={24} height={4.5} rx={2.25} fill="#6B4226" transform="rotate(-32 6 26)" />
      <rect x={6} y={26} width={24} height={1.6} fill="#8A5A30" transform="rotate(-32 6 26)" opacity={0.7} />
      <g fill="#FFD93B">
        <path d="M36 6 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8 -4.6 -4.6 -1.8 4.6 -1.8 z" />
        <circle cx={42} cy={26} r={2.2} />
        <circle cx={30} cy={24} r={1.5} opacity={0.8} />
      </g>
      <circle cx={36} cy={12} r={7} fill="#FFD93B" opacity={0.25} />
    </svg>
  );
}

/** Velas flotantes estilo Gran Comedor, subiendo con llama titilante. */
function Candles() {
  const reduced = useReducedMotion();
  const candles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 4 + ((i * 37.3 + 9) % 92),
        h: 34 + ((i * 13) % 30),
        w: 12 + ((i * 5) % 6),
        rise: 34 + ((i * 29) % 30),
        delay: (i % 5) * 0.35,
        dur: 2.6 + ((i * 7) % 12) / 10,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {candles.map((c) => (
        <motion.div
          key={c.id}
          className="absolute bottom-[-12vh] flex flex-col items-center"
          style={{ left: `${c.left}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: `-${c.rise}vh`, opacity: 1 }}
          transition={{ duration: c.dur, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="absolute -top-8 h-16 w-16 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,200,100,.5), transparent 70%)', filter: 'blur(3px)' }}
          />
          <motion.span
            className="relative block w-3 rounded-t-full bg-gradient-to-t from-ember via-sunflower-400 to-cream"
            style={{ height: 18, transformOrigin: '50% 100%' }}
            animate={reduced ? {} : { scaleY: [1, 1.25, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="block rounded-[3px] rounded-t-md bg-gradient-to-b from-[#FFF6D6] to-[#EDE0C4]"
            style={{ width: c.w, height: c.h, boxShadow: '0 0 18px rgba(255,200,100,.35)' }} />
        </motion.div>
      ))}
    </div>
  );
}

/** Snitch dorada cruzando el cielo con alas batiendo. */
function Snitch() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="anim-butterfly-b absolute left-0 top-[16%]" style={{ animationDuration: '22s' }}>
        <div className="anim-bob flex items-center">
          <svg width={26} height={16} viewBox="0 0 26 16" className="anim-wing" aria-hidden>
            <ellipse cx={7} cy={8} rx={7} ry={5} fill="#E4C566" opacity={0.9} />
          </svg>
          <span
            className="block h-4 w-4 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #FFF3B0, #FFD93B 55%, #B97A08)',
              boxShadow: '0 0 12px 3px rgba(255,205,90,.8)',
            }}
          />
          <svg width={26} height={16} viewBox="0 0 26 16" className="anim-wing" style={{ animationDelay: '0.1s' }} aria-hidden>
            <ellipse cx={19} cy={8} rx={7} ry={5} fill="#E4C566" opacity={0.9} />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Easter egg Potter: la varita traza el hechizo, flash dorado,
 * velas flotantes, snitch dorada y carta mágica (Hufflepuff vibes).
 */
export default function Potter({ onClose }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState('wand'); // wand → spell → candles → gift

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setPhase('gift'), 700);
      return () => clearTimeout(t);
    }
    const seq = [['spell', 1600], ['candles', 1300], ['gift', 3600]];
    let acc = 0;
    const ids = seq.map(([p, d]) => {
      acc += d;
      return setTimeout(() => setPhase(p), acc);
    });
    return () => ids.forEach(clearTimeout);
  }, [reduced]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Sorpresa Potter"
    >
      {/* aura violeta nocturna */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(46,27,61,.55), rgba(13,10,25,.72) 75%)' }}
        aria-hidden
      />
      {!reduced && (
        <span className="anim-twinkle absolute left-[12%] top-[14%] h-1.5 w-1.5 rounded-full bg-white"
          style={{ boxShadow: '0 0 8px 2px rgba(255,255,255,.7)', animationDuration: '2s' }} aria-hidden />
      )}

      <button
        onClick={onClose}
        aria-label="Cerrar sorpresa Potter"
        className="pointer-events-auto absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-cream backdrop-blur-md transition-all hover:rotate-90 hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-300"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* varita trazando el hechizo */}
      {(phase === 'wand' || phase === 'spell') && (
        <motion.div
          className="absolute left-1/2 top-[30vh]"
          initial={{ x: '-50%', rotate: -24, opacity: 0 }}
          animate={reduced ? { x: '-50%', rotate: 0, opacity: 1 } : { x: '-50%', rotate: [0, 18, -10, 8, 0], opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          aria-hidden
        >
          <div className="relative">
            <WandGlyph className="h-24 w-24 drop-shadow-[0_0_18px_rgba(255,205,90,0.9)]" />
            <motion.span
              className="absolute left-[62%] top-[8%] h-10 w-10 rounded-full"
              style={{ background: 'radial-gradient(circle, #FFF6D6, rgba(255,205,90,.6) 45%, transparent 70%)', filter: 'blur(2px)' }}
              animate={reduced ? {} : { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}

      {/* estela del hechizo */}
      {phase !== 'wand' && !reduced && (
        <motion.svg
          className="absolute left-1/2 top-[24vh] h-40 w-[70vw] -translate-x-1/2"
          viewBox="0 0 300 120"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-hidden
        >
          <motion.path
            d="M20 90 Q 90 20, 150 70 T 285 40"
            stroke="#FFD93B" strokeWidth={3} fill="none" strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,205,90,.9))' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          {[70, 150, 230].map((x, i) => (
            <motion.circle
              key={i} cx={x} cy={58 - (i % 2) * 18} r={3.5} fill="#FFF6D6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.2, duration: 0.4 }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,220,130,1))' }}
            />
          ))}
        </motion.svg>
      )}

      {/* hechizo */}
      <AnimatePresence>
        {(phase === 'spell' || (!reduced && phase === 'candles')) && (
          <motion.div
            key="spell"
            className="absolute left-1/2 top-[52vh]"
            initial={{ opacity: 0, scale: 0, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 320, damping: 17 }}
            aria-hidden
          >
            <div className="whitespace-nowrap rounded-2xl border-2 border-sunflower-300 bg-[#1E1440]/90 px-6 py-2.5 shadow-[0_0_45px_-5px_rgba(255,200,60,0.8)]">
              <span className="text-xl font-black tracking-[0.12em] text-sunflower-200">{potter.spell}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* flash dorado */}
      {phase === 'spell' && !reduced && (
        <>
          <motion.div
            key="flash"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{ background: 'radial-gradient(circle at 50% 45%, #FFF6D6, rgba(255,205,90,.4) 55%, transparent 80%)' }}
            aria-hidden
          />
          <motion.div
            key="ring"
            className="absolute left-1/2 top-[45vh] h-24 w-24 -translate-x-1/2 rounded-full border-4 border-sunflower-200"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 7, opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </>
      )}

      {/* velas + snitch */}
      {(phase === 'candles' || phase === 'gift') && (
        <>
          <Candles />
          <Snitch />
        </>
      )}

      {/* carta mágica */}
      {phase === 'gift' && (
        <>
          {!reduced && <FloatingHearts count={8} falling />}
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <motion.article
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.15 }}
              className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[2rem] border border-sunflower-300/50 bg-gradient-to-b from-[#241A4D] to-[#120D26] p-7 text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),0_0_60px_-15px_rgba(255,200,60,0.5)] sm:p-8"
            >
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 12 }}
                className="mx-auto w-fit rounded-full border border-sunflower-300/60 bg-sunflower-300/10 p-3"
              >
                <Zap className="h-7 w-7 fill-sunflower-300 text-sunflower-300" />
              </motion.div>
              <h3 className="font-serif-d mt-4 text-2xl font-semibold italic leading-snug text-cream sm:text-[1.7rem]">
                {potter.title}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[15px] font-light leading-relaxed text-cream/85">
                {potter.text}
              </p>
              <p className="mt-4 text-sm font-light tracking-wide text-sunflower-200">{potter.sign}</p>
              <button
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunflower-300 to-ember px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-espresso-950 shadow-[0_0_30px_-6px_rgba(255,200,60,0.8)] transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-200"
              >
                {potter.close} ⚡
              </button>
            </motion.article>
          </div>
        </>
      )}
    </motion.div>
  );
}
