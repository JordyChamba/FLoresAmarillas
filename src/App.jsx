import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './components/Intro';
import Garden from './components/Garden';
import MusicButton from './components/MusicButton';
import { playMusic, subscribeMusic, getMusicVersion, isMusicPlaying } from './audio';

export default function App() {
  const [stage, setStage] = useState('intro'); // 'intro' | 'garden'
  const [surprise, setSurprise] = useState(false);

  // Estado global de música (para la invitación "toca para la música").
  useSyncExternalStore(subscribeMusic, getMusicVersion);
  const musicOn = isMusicPlaying();

  // La música nace con el primer gesto: intento optimista al montar
  // (por si el navegador lo permite) + arranque garantizado en el
  // primer toque/tecla. Los navegadores bloquean el sonido antes del
  // primer gesto, así que este es el "autoplay con sonido" real.
  useEffect(() => {
    let detached = false;
    const detach = () => {
      if (detached) return;
      detached = true;
      window.removeEventListener('pointerdown', tryStart);
      window.removeEventListener('keydown', tryStart);
    };
    const tryStart = () => {
      playMusic().then((ok) => { if (ok) detach(); });
    };
    window.addEventListener('pointerdown', tryStart);
    window.addEventListener('keydown', tryStart);
    tryStart();
    return detach;
  }, []);

  const handleBloom = useCallback(() => {
    setStage('garden');
    playMusic(); // el clic ES el gesto: aquí sí suena seguro
  }, []);

  const handleSurprise = useCallback(() => {
    setSurprise(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 450);
  }, []);

  const handleReplay = useCallback(() => {
    setSurprise(false);
    setStage('intro');
    setTimeout(() => window.scrollTo({ top: 0 }), 60);
  }, []);

  return (
    <main className="min-h-dvh bg-espresso-950">
      <MusicButton dark={stage === 'garden'} invite={stage === 'garden' && !musicOn && !surprise} />
      <AnimatePresence mode="wait">
        {stage === 'intro' ? (
          <Intro key="intro" onBloom={handleBloom} />
        ) : (
          <Garden
            key="garden"
            surprise={surprise}
            onSurprise={handleSurprise}
            onReplay={handleReplay}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
