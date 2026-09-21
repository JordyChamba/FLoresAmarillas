import { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Music4 } from 'lucide-react';
import {
  subscribeMusic, getMusicVersion,
  isMusicPlaying, isMusicMissing,
  playMusic, pauseMusic,
} from '../audio';
import { copy } from '../config';

export default function MusicButton({ dark = false, invite = false }) {
  useSyncExternalStore(subscribeMusic, getMusicVersion);
  const playing = isMusicPlaying();
  const missing = isMusicMissing();
  const [hint, setHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!hint) return;
    const id = setTimeout(() => setHint(false), 5000);
    return () => clearTimeout(id);
  }, [hint]);

  // Cuando empieza a sonar, la invitación ya cumplió su misión.
  useEffect(() => {
    if (playing) setDismissed(true);
  }, [playing]);

  const toggle = async () => {
    setDismissed(true);
    if (playing) {
      pauseMusic();
      return;
    }
    const ok = await playMusic();
    if (!ok) setHint(true);
  };

  const showInvite = invite && !playing && !dismissed && !missing;

  return (
    <div className="fixed right-4 top-4 z-[60] flex flex-col items-end gap-2 sm:right-6 sm:top-6">
      <div className="relative">
        {/* anillo que invita a tocar cuando aún no hay música */}
        {showInvite && (
          <span className="anim-ring-pulse pointer-events-none absolute inset-0 rounded-full" aria-hidden />
        )}
        <motion.button
          onClick={toggle}
          aria-label={playing ? 'Pausar música' : 'Reproducir música'}
          aria-pressed={playing}
          title={missing ? 'No se encontró el audio' : playing ? 'Pausar música' : 'Reproducir música'}
          whileTap={{ scale: 0.9 }}
          animate={showInvite ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={showInvite ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
          className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower-300 ${
            dark
              ? 'border border-espresso-900/20 bg-cream/80 text-espresso-900 shadow-[0_8px_30px_-8px_rgba(60,30,0,0.5)] hover:bg-cream'
              : 'border border-sunflower-300/40 bg-white/[0.07] text-sunflower-200 shadow-[0_0_25px_-6px_rgba(255,200,60,0.5)] hover:border-sunflower-300/70 hover:text-white'
          } ${playing ? 'shadow-[0_0_30px_-5px_rgba(255,200,60,0.8)]' : ''}`}
        >
          {playing ? (
            <Volume2 className="h-5 w-5" strokeWidth={1.75} />
          ) : missing ? (
            <Music4 className="h-5 w-5 opacity-60" strokeWidth={1.75} />
          ) : (
            <VolumeX className="h-5 w-5" strokeWidth={1.75} />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {(showInvite || hint) && (
          <motion.button
            key="music-invite"
            onClick={toggle}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`max-w-[230px] rounded-2xl rounded-tr-md px-4 py-2.5 text-right text-[11px] font-light leading-relaxed backdrop-blur-md transition-colors ${
              dark
                ? 'bg-espresso-950/90 text-cream/90 hover:bg-espresso-950'
                : 'bg-black/60 text-cream/90 hover:bg-black/75'
            }`}
          >
            {missing && hint ? (
              <>
                No encuentro el audio. Revisa{' '}
                <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-sunflower-200">
                  public/audio/music.mp3
                </code>{' '}
                y recarga con Ctrl+Shift+R.
              </>
            ) : (
              <>{copy.musicInvite}</>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ecualizador mínimo cuando suena */}
      {playing && (
        <div className="flex items-end gap-[3px] pr-2" aria-hidden>
          {[0.5, 0.9, 0.65].map((d, i) => (
            <motion.span
              key={i}
              className={`w-[3px] rounded-full ${dark ? 'bg-ember' : 'bg-sunflower-300'}`}
              animate={{ height: [4, 12, 5, 10, 4] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
