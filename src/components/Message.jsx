import { AnimatePresence, motion } from 'framer-motion';
import { CalendarHeart, RotateCcw, Sparkles, Heart, MousePointerClick, Flower2, Sun, Ticket, Flame, ImageDown } from 'lucide-react';
import { copy, timing, initial, spidey, potter, hints, reasons, coupons, promise, wish, postcard } from '../config';
import { SpiderGlyph } from './Spidey';
import { WandGlyph } from './Potter';
import LoveNotes from './LoveNotes';

const ease = [0.22, 1, 0.36, 1];

function Ornament({ delay, night }) {
  const line = night ? 'to-sunflower-300/70' : 'to-ember/60';
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.4 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay, duration: 1.2, ease }}
      className="mt-6 flex items-center gap-3"
      aria-hidden
    >
      <span className={`h-px w-14 bg-gradient-to-r from-transparent ${line} sm:w-24`} />
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Heart className={`h-4 w-4 ${night ? 'fill-sunflower-300 text-sunflower-300' : 'fill-ember/80 text-ember'}`} />
      </motion.span>
      <span className={`h-px w-14 bg-gradient-to-l from-transparent ${line} sm:w-24`} />
    </motion.div>
  );
}

export default function Message({ surprise, onSurprise, onReplay, onDedication, onSpidey, onPotter, onReasons, onCoupons, onPromise, onWish, onPostcard, night = false }) {
  const words = copy.gardenTitle.split(' ');
  const titleInk = night
    ? 'text-cream drop-shadow-[0_2px_24px_rgba(255,200,90,0.35)]'
    : 'text-espresso-950 drop-shadow-[0_2px_18px_rgba(250,243,227,0.55)]';
  const softInk = night ? 'text-cream/85' : 'text-espresso-900/90';
  const faintInk = night ? 'text-cream/55' : 'text-espresso-900/60';
  const footerInk = night ? 'text-cream/40' : 'text-espresso-950/45';

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      {/* insignia fecha */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: timing.messageDelay, duration: 1, ease }}
        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] shadow-sm backdrop-blur-md sm:text-[11px] ${
          night
            ? 'border-white/20 bg-black/40 text-sunflower-200'
            : 'border-espresso-900/15 bg-cream/70 text-espresso-900/80'
        }`}
      >
        <CalendarHeart className="h-3.5 w-3.5" strokeWidth={1.75} />
        {copy.gardenBadge}
      </motion.div>

      {/* mensaje principal, palabra por palabra */}
      <motion.h2
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: timing.messageDelay + 0.35 } } }}
        className={`font-serif-d text-balance text-3xl font-medium italic leading-[1.2] sm:text-4xl md:text-[2.9rem] ${titleInk}`}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
            }}
          >
            {w} 
          </motion.span>
        ))}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: timing.messageDelay + 1.5, duration: 1.3, ease }}
        className={`mt-5 flex flex-wrap items-center justify-center gap-2 text-base font-light tracking-wide sm:text-xl ${softInk}`}
      >
        <span className="text-shimmer font-medium">{copy.gardenSubtitle}</span>
        <span aria-hidden>🌻💛</span>
      </motion.p>

      {/* frases de amor rotativas */}
      <LoveNotes night={night} />

      <Ornament delay={timing.messageDelay + 1.9} night={night} />

      {/* botón "hay algo más" — imposible de ignorar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: timing.messageDelay + 2.2, duration: 1, ease }}
        className="flex flex-col items-center"
      >
        {!surprise && (
          <>
            <span className="anim-ring-pulse mt-8 inline-block rounded-full">
              <button
                onClick={onSurprise}
                className="group relative inline-flex scale-105 items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-sunflower-200 via-sunflower-400 to-ember px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-espresso-950 shadow-[0_0_45px_-8px_rgba(255,200,60,0.85),0_16px_45px_-12px_rgba(120,60,5,0.7)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_65px_-5px_rgba(255,205,90,0.95),0_16px_55px_-10px_rgba(120,60,5,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso-950 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:text-[13px]"
              >
                <Sparkles className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" strokeWidth={2} />
                {copy.surpriseButton}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </span>
            <motion.p
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className={`mt-3 flex items-center gap-1.5 text-[11px] font-light tracking-[0.2em] uppercase ${faintInk}`}
            >
              <MousePointerClick className="h-3.5 w-3.5" strokeWidth={1.75} />
              {copy.surpriseHint}
            </motion.p>
          </>
        )}
      </motion.div>

      {/* ── carta sorpresa ── */}
      <AnimatePresence>
        {surprise && (
          <motion.article
            key="carta"
            initial={{ opacity: 0, y: 44, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 1.1, ease }}
            className="relative mt-8 w-full overflow-hidden rounded-3xl border border-white/40 bg-cream/85 p-7 text-left shadow-[0_30px_80px_-20px_rgba(60,30,0,0.55)] backdrop-blur-xl sm:p-9"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sunflower-300/50 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-ember/20 blur-3xl" aria-hidden />

            <motion.p
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease }}
              className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-ember sm:text-[11px]"
            >
              <Heart className="h-3.5 w-3.5 fill-ember" />
              {copy.surpriseTitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease }}
              className="font-serif-d mt-3 text-xl italic leading-relaxed text-espresso-900 sm:text-2xl"
            >
              “{copy.surpriseText}”
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-5"
            >
              <p className="inline-flex items-center gap-2 text-sm font-light text-espresso-900/80">
                <Heart className="h-4 w-4 fill-ember text-ember" />
                {copy.surpriseSign}
              </p>
              {/* indicación: probar cada botón */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ delay: 1.2, duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-espresso-900/70"
              >
                <Sparkles className="h-3.5 w-3.5 text-ember" strokeWidth={2} />
                {hints.buttons}
              </motion.p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {/* 1 · botón flor + inicial */}
                <span className="anim-ring-pulse inline-block rounded-full">
                  <button
                    onClick={onDedication}
                    title={`Una dedicatoria para ${initial}`}
                    aria-label={`Abrir dedicatoria para ${initial}`}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sunflower-200 via-sunflower-400 to-ember py-2 pl-4 pr-5 shadow-[0_0_28px_-6px_rgba(255,200,60,0.8)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_38px_-4px_rgba(255,205,90,0.95)] focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso-950"
                  >
                    <Flower2 className="h-4 w-4 text-espresso-950 transition-transform duration-500 group-hover:rotate-[30deg] group-hover:scale-125" strokeWidth={2.25} />
                    <span className="font-serif-d text-xl font-semibold italic leading-none text-espresso-950">
                      {initial}
                    </span>
                  </button>
                </span>
                {/* 2 · botón arácnido */}
                <button
                  onClick={onSpidey}
                  title="Una sorpresa arácnida…"
                  aria-label="Abrir sorpresa arácnida"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B3232A] via-[#7A1E3E] to-[#1E4FD8] py-2 pl-3 pr-5 text-cream shadow-[0_10px_30px_-8px_rgba(120,20,40,0.7)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_-6px_rgba(194,42,42,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B3232A]"
                >
                  <SpiderGlyph className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-12" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                    {spidey.button}
                  </span>
                </button>
                {/* 3 · botón Potter */}
                <button
                  onClick={onPotter}
                  title="Una sorpresa mágica…"
                  aria-label="Abrir sorpresa Potter"
                  className="group inline-flex items-center gap-2 rounded-full border border-sunflower-300/70 bg-gradient-to-r from-[#241A4D] via-[#3A2560] to-[#1E1440] py-2 pl-3 pr-5 text-sunflower-200 shadow-[0_10px_30px_-8px_rgba(40,25,90,0.8)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_-6px_rgba(255,200,60,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-300"
                >
                  <WandGlyph className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                    {potter.button}
                  </span>
                </button>
              </div>
              {/* ── opción 1 · nuevas sorpresas ── */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onReasons}
                  title="Razones por las que brillas"
                  aria-label="Abrir razones por las que brillas"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunflower-200 to-sunflower-400 py-2 pl-3 pr-5 text-espresso-950 shadow-[0_10px_30px_-8px_rgba(180,130,10,0.6)] transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  <Sun className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" strokeWidth={2} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">{reasons.button}</span>
                </button>
                <button
                  onClick={onCoupons}
                  title="Cupones canjeables"
                  aria-label="Abrir cupones canjeables"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-dashed border-ember/50 bg-white/70 py-2 pl-3 pr-5 text-espresso-950 transition-all duration-300 hover:scale-110 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  <Ticket className="h-5 w-5 text-ember transition-transform duration-500 group-hover:-rotate-12" strokeWidth={2} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">{coupons.button}</span>
                </button>
                <button
                  onClick={onPromise}
                  title={promise.title}
                  aria-label={`Abrir ${promise.title.toLowerCase()}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#241A4D] via-[#3A2560] to-[#7A3E55] py-2 pl-3 pr-5 text-sunflower-200 shadow-[0_10px_30px_-8px_rgba(40,25,90,0.8)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_-6px_rgba(255,200,60,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-300"
                >
                  <WandGlyph className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">{promise.button}</span>
                </button>
              </div>
              {/* ── opción 3 · deseo + postal ── */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onWish}
                  title="Pide un deseo"
                  aria-label="Abrir pide un deseo"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3A2560] to-[#7A3E55] py-2 pl-3 pr-5 text-cream shadow-[0_10px_30px_-8px_rgba(60,30,80,0.7)] transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-300"
                >
                  <Flame className="h-5 w-5 text-sunflower-300 transition-transform duration-500 group-hover:scale-125" strokeWidth={1.75} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">{wish.button}</span>
                </button>
                <button
                  onClick={onPostcard}
                  title="Descargar postal del jardín"
                  aria-label="Abrir postal del jardín"
                  className="group inline-flex items-center gap-2 rounded-full border border-espresso-900/25 bg-cream/60 py-2 pl-3 pr-5 text-espresso-900 transition-all duration-300 hover:scale-110 hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  <ImageDown className="h-5 w-5 transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={1.75} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em]">{postcard.button}</span>
                </button>
              </div>
              {/* ── volver a florecer · siempre al final ── */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onReplay}
                  className="inline-flex items-center gap-2 rounded-full border border-espresso-900/25 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-espresso-900/75 transition-all duration-300 hover:scale-105 hover:border-espresso-900/40 hover:bg-espresso-950/5 hover:text-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {copy.replay}
                </button>
              </div>
            </motion.div>
          </motion.article>
        )}
      </AnimatePresence>

      {/* firma */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: timing.messageDelay + 3, duration: 1.5 }}
        className={`mt-10 text-[10px] font-light uppercase tracking-[0.32em] ${footerInk}`}
      >
        {copy.footerLine}
      </motion.p>
    </div>
  );
}
