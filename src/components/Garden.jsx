import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Flower from './Flower';
import Buds from './Buds';
import Grass from './Grass';
import { AmbientParticles } from './Petals';
import { FloatingHearts } from './Petals';
import Butterflies from './Butterflies';
import Stars from './Stars';
import Fireflies from './Fireflies';
import Birds from './Birds';
import Message from './Message';
import MomentsBar from './MomentsBar';
import Dedication from './Dedication';
import Spidey from './Spidey';
import Potter from './Potter';
import Reasons from './Reasons';
import Coupons from './Coupons';
import PromiseSeal from './Promise';
import Wish from './Wish';
import Postcard from './Postcard';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useIsMobile } from '../hooks/useIsMobile';
import { density, timing } from '../config';

// Generador determinista (misma composición en cada visita)
function mulberry(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildLayer(n, seed, { xMin, xMax, sizeMin, sizeMax, bottomMin, bottomMax, depth }) {
  const rnd = mulberry(seed);
  return Array.from({ length: n }, (_, i) => ({
    id: `${depth}-${i}`,
    variant: Math.floor(rnd() * 5),
    x: xMin + rnd() * (xMax - xMin),
    size: sizeMin + rnd() * (sizeMax - sizeMin),
    bottom: bottomMin + rnd() * (bottomMax - bottomMin),
    delay: i * timing.stemStagger + rnd() * 0.35,
    sway: 5 + rnd() * 4,
    depth,
  }));
}

const MOODS = {
  amanecer: {
    label: 'Amanecer',
    sky: 'linear-gradient(to bottom, #2E1B3D 0%, #7A3E55 30%, #E8936B 55%, #F5C98A 72%, #F8E9C4 86%, #FAF3E3 100%)',
    orb: { kind: 'sun', top: '34%', size: 40 },
    orbBg: 'radial-gradient(circle, rgba(255,246,230,.95) 0%, rgba(255,208,160,.7) 30%, rgba(232,147,107,.32) 55%, transparent 72%)',
    rays: 'repeating-conic-gradient(from 0deg, rgba(255,214,170,.13) 0deg 5deg, transparent 5deg 13deg)',
    raysOpacity: 0.8,
  },
  atardecer: {
    label: 'Atardecer',
    sky: 'linear-gradient(to bottom, #241407 0%, #5A2E0E 26%, #B25E14 48%, #E8930C 62%, #F5C04A 74%, #F8DE9A 86%, #FAF3E3 100%)',
    orb: { kind: 'sun', top: '52%', size: 46 },
    orbBg: 'radial-gradient(circle, rgba(255,250,230,.95) 0%, rgba(255,220,120,.75) 28%, rgba(245,168,40,.35) 55%, transparent 72%)',
    rays: 'repeating-conic-gradient(from 0deg, rgba(255,222,130,.12) 0deg 5deg, transparent 5deg 13deg)',
    raysOpacity: 0.7,
  },
  anochecer: {
    label: 'Anochecer',
    sky: 'linear-gradient(to bottom, #060412 0%, #141031 34%, #33205A 55%, #7A3E5E 74%, #C96B4A 86%, #8A4A3E 93%, #241A33 100%)',
    orb: { kind: 'moon', top: '13%', right: '14%', size: 15 },
    orbBg: 'radial-gradient(circle, #FFF9E2 0%, #F5E3A8 42%, rgba(228,197,102,.35) 62%, transparent 74%)',
    rays: null,
    raysOpacity: 0,
  },
};

function Celestial({ mood }) {
  const m = MOODS[mood];
  const { orb } = m;
  const style =
    orb.kind === 'sun'
      ? { left: '50%', top: orb.top, width: `${orb.size}vmin`, height: `${orb.size}vmin`, x: '-50%' }
      : { right: orb.right, top: orb.top, width: `${orb.size}vmin`, height: `${orb.size}vmin` };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood}
        className="absolute rounded-full"
        initial={{ opacity: 0, scale: 0.7, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(2px)' }}
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ ...style, background: m.orbBg }}
        aria-hidden
      >
        {orb.kind === 'moon' && (
          <>
            <span className="absolute left-[22%] top-[30%] h-[16%] w-[16%] rounded-full bg-[#D9C48A]/70 blur-[1px]" />
            <span className="absolute left-[55%] top-[58%] h-[11%] w-[11%] rounded-full bg-[#D9C48A]/60 blur-[1px]" />
            <span className="absolute left-[38%] top-[66%] h-[7%] w-[7%] rounded-full bg-[#D9C48A]/50 blur-[1px]" />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Garden({ surprise, onSurprise, onReplay }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const parallax = useMouseParallax({ disabled: reduced });

  const [mood, setMood] = useState('atardecer');
  const [burst, setBurst] = useState(false);
  const [dedicationOpen, setDedicationOpen] = useState(false);
  const [spideyOpen, setSpideyOpen] = useState(false);
  const [potterOpen, setPotterOpen] = useState(false);
  const [reasonsOpen, setReasonsOpen] = useState(false);
  const [couponsOpen, setCouponsOpen] = useState(false);
  const [promiseOpen, setPromiseOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [postcardOpen, setPostcardOpen] = useState(false);
  const [moodTouched, setMoodTouched] = useState(false);
  const burstTimer = useRef(0);

  useEffect(() => () => clearTimeout(burstTimer.current), []);
  const triggerBurst = () => {
    setBurst(true);
    clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setBurst(false), 7000);
  };

  const handleMood = (m) => {
    setMood(m);
    setMoodTouched(true);
  };
  const night = mood === 'anochecer';
  const counts = isMobile ? density.flowersMobile : density.flowersDesktop;

  const layers = useMemo(
    () => ({
      back: buildLayer(counts.back, 11, { xMin: 2, xMax: 98, sizeMin: 46, sizeMax: 72, bottomMin: 66, bottomMax: 120, depth: 0.25 }),
      mid: buildLayer(counts.mid, 47, { xMin: 1, xMax: 99, sizeMin: 80, sizeMax: 128, bottomMin: 26, bottomMax: 70, depth: 0.55 }),
      front: buildLayer(counts.front, 83, { xMin: 0, xMax: 100, sizeMin: 130, sizeMax: isMobile ? 170 : 210, bottomMin: -14, bottomMax: 26, depth: 1 }),
    }),
    [counts.back, counts.mid, counts.front, isMobile]
  );

  const px = (f) => (reduced ? 0 : parallax.x * f);
  const py = (f) => (reduced ? 0 : parallax.y * f * 0.6);
  const shower = surprise || burst;

  return (
    <motion.section
      className="relative flex min-h-dvh flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      aria-label="El jardín"
    >
      {/* ── cielo según el momento del día (fundido cruzado) ── */}
      <motion.div
        className="absolute inset-[-4%]"
        initial={false}
        animate={reduced ? {} : { scale: [1, 1.07, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <AnimatePresence>
          <motion.div
            key={mood}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: night ? 2 : timing.skyTransition, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: MOODS[mood].sky }}
          />
        </AnimatePresence>

        {night && <Stars isMobile={isMobile} />}

        {/* rayos del sol, rotación lentísima */}
        {!reduced && MOODS[mood].rays && (
          <div className="absolute left-1/2 top-[46%] h-[95vmin] w-[95vmin] -translate-x-1/2 -translate-y-1/2">
            <div
              className="anim-spin-slower h-full w-full rounded-full"
              style={{
                background: MOODS[mood].rays,
                opacity: MOODS[mood].raysOpacity,
                WebkitMaskImage: 'radial-gradient(circle, black 26%, transparent 66%)',
                maskImage: 'radial-gradient(circle, black 26%, transparent 66%)',
              }}
            />
          </div>
        )}

        {/* nubes a la deriva (día) */}
        {!night && (
          <div className="pointer-events-none absolute inset-x-0 top-[26%] hidden justify-center gap-10 sm:flex">
            {[
              { c: 'h-10 w-64 bg-cream/60 opacity-40', d: '30s', dl: '0s' },
              { c: 'mt-6 h-8 w-48 bg-cream/50 opacity-40', d: '38s', dl: '-12s' },
              { c: 'mt-10 h-6 w-40 bg-cream/50 opacity-30', d: '46s', dl: '-24s' },
            ].map((n, i) => (
              <div
                key={i}
                className={reduced ? `${n.c} rounded-full blur-2xl` : `anim-cloud ${n.c} rounded-full blur-2xl`}
                style={reduced ? undefined : { animationDuration: n.d, animationDelay: n.dl }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <Celestial mood={mood} />
      {!night && <Birds />}
      {night && <Fireflies isMobile={isMobile} />}

      {/* velo nocturno sobre la escena */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30"
        initial={false}
        animate={{ opacity: night ? 1 : 0 }}
        transition={{ duration: 2 }}
        style={{ background: 'linear-gradient(to bottom, rgba(8,6,24,.35), transparent 42%, rgba(8,6,24,.4))' }}
        aria-hidden
      />

      {/* glow sorpresa */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30"
        initial={false}
        animate={{ opacity: surprise ? 1 : 0 }}
        transition={{ duration: timing.surpriseGlow }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 78%, rgba(255,215,90,.38) 0%, rgba(255,190,70,.16) 38%, transparent 70%), linear-gradient(to top, rgba(255,200,80,.14), transparent 55%)',
        }}
        aria-hidden
      />
      {surprise && (
        <div className="anim-glow-pulse pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[46vh]" aria-hidden
          style={{ background: 'linear-gradient(to top, rgba(255,214,100,.22), transparent)' }} />
      )}

      {/* ── capas del jardín con parallax ── */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0" style={{ transform: `translate3d(${px(-14)}px, ${py(-8)}px, 0)` }}>
          {layers.back.map((f) => (
            <Flower key={`b${f.id}`} {...f} glow={surprise} reduced={reduced} />
          ))}
        </div>
        <div className="absolute inset-0" style={{ transform: `translate3d(${px(-26)}px, ${py(-14)}px, 0)` }}>
          {layers.mid.map((f) => (
            <Flower key={`m${f.id}`} {...f} glow={surprise} reduced={reduced} />
          ))}
          <Buds isMobile={isMobile} glow={surprise} />
        </div>

        {/* suelo */}
        <motion.div
          className="absolute inset-x-[-5%] bottom-[-4%] h-[34vh] sm:h-[30vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
          style={{
            background: night
              ? 'linear-gradient(to bottom, #2A3348 0%, #1C2436 30%, #10141F 65%, #070912 100%)'
              : 'linear-gradient(to bottom, #7A8A3A 0%, #4A5E26 22%, #2A3A1E 55%, #131A0E 100%)',
            borderTopLeftRadius: '50% 26px',
            borderTopRightRadius: '50% 26px',
            boxShadow: night ? '0 -18px 60px rgba(80,100,200,.2)' : '0 -18px 60px rgba(232,147,12,.25)',
          }}
        />
        {/* luz sobre el suelo */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh]"
          style={{
            background: night
              ? 'radial-gradient(ellipse at 82% 20%, rgba(220,225,255,.28), transparent 55%)'
              : 'radial-gradient(ellipse at 50% 110%, rgba(255,205,90,.35), transparent 65%)',
          }}
        />

        <div className="absolute inset-0" style={{ transform: `translate3d(${px(-44)}px, ${py(-20)}px, 0)` }}>
          {layers.front.map((f) => (
            <Flower key={`f${f.id}`} {...f} glow={surprise} reduced={reduced} />
          ))}
        </div>

        <Grass isMobile={isMobile} glow={surprise} />

        {/* hierba frontal */}
        <svg className="pointer-events-none absolute inset-x-0 bottom-0 z-[27] h-[12vh] w-full" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60 Q 30 18 55 42 T 110 38 T 165 30 T 225 40 T 290 28 T 350 40 T 400 34 L 400 60 Z" fill={night ? '#070912' : '#131A0E'} opacity="0.92" />
          <path d="M0 60 Q 50 34 90 48 T 190 46 T 300 44 T 400 48 L 400 60 Z" fill={night ? '#10141F' : '#1C2615'} />
        </svg>
      </div>

      <AmbientParticles isMobile={isMobile} shower={shower} />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <FloatingHearts count={isMobile ? 5 : 10} />
        {shower && <FloatingHearts count={isMobile ? 8 : 14} falling />}
      </div>
      <Butterflies />

      {/* viñeta cinematográfica */}
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden
        style={{ background: 'radial-gradient(ellipse at 50% 42%, transparent 55%, rgba(30,15,2,.42) 100%)' }} />

      {/* ── contenido ── */}
      <div className="relative z-40 flex min-h-dvh flex-col items-center justify-start px-5 pb-28 pt-[8vh] text-center sm:justify-center sm:pb-24 sm:pt-10">
        <Message
          surprise={surprise}
          onSurprise={onSurprise}
          onReplay={onReplay}
          onDedication={() => setDedicationOpen(true)}
          onSpidey={() => setSpideyOpen(true)}
          onPotter={() => setPotterOpen(true)}
          onReasons={() => setReasonsOpen(true)}
          onCoupons={() => setCouponsOpen(true)}
          onPromise={() => setPromiseOpen(true)}
          onWish={() => setWishOpen(true)}
          onPostcard={() => setPostcardOpen(true)}
          night={night}
        />
      </div>

      <MomentsBar mood={mood} onMood={handleMood} onBurst={triggerBurst} bursting={burst} showHint={!moodTouched} />

      <Dedication open={dedicationOpen} onClose={() => setDedicationOpen(false)} />
      <AnimatePresence>{spideyOpen && <Spidey key="spidey" onClose={() => setSpideyOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{potterOpen && <Potter key="potter" onClose={() => setPotterOpen(false)} />}</AnimatePresence>
      <Reasons open={reasonsOpen} onClose={() => setReasonsOpen(false)} />
      <Coupons open={couponsOpen} onClose={() => setCouponsOpen(false)} />
      <PromiseSeal open={promiseOpen} onClose={() => setPromiseOpen(false)} />
      <Wish open={wishOpen} onClose={() => setWishOpen(false)} />
      <Postcard open={postcardOpen} onClose={() => setPostcardOpen(false)} />
    </motion.section>
  );
}
