import { musicSrc } from './config';

/**
 * Singleton de audio compartido por toda la experiencia.
 * - La música arranca con el primer gesto del usuario (el botón
 *   "Haz florecer el jardín" la enciende): los navegadores bloquean
 *   cualquier sonido antes del primer toque, así que no existe
 *   "autoplay con sonido" real; este es el patrón correcto.
 * - MusicButton y App leen el mismo estado vía useSyncExternalStore.
 */

const base = `${import.meta.env.BASE_URL || '/'}`.replace(/\/?$/, '/');
export const resolvedMusicSrc = `${base}${musicSrc.replace(/^\//, '')}`;

let audio = null;
let version = 0;
const listeners = new Set();
const state = { playing: false, missing: false };

function emit() {
  version += 1;
  listeners.forEach((cb) => {
    try { cb(); } catch { /* noop */ }
  });
}

export function subscribeMusic(cb) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
export function getMusicVersion() { return version; }
export function isMusicPlaying() { return state.playing; }
export function isMusicMissing() { return state.missing; }

function ensure() {
  if (audio) return audio;
  const a = new Audio();
  a.loop = true;
  a.volume = 0.55;
  a.preload = 'auto';
  a.src = resolvedMusicSrc;
  a.addEventListener('playing', () => { state.playing = true; state.missing = false; emit(); });
  a.addEventListener('pause', () => { state.playing = false; emit(); });
  a.addEventListener('error', () => { state.playing = false; state.missing = true; emit(); });
  audio = a;
  return a;
}

export async function playMusic() {
  const a = ensure();
  if (!a.paused) return true;
  try {
    // Si antes falló (o aún no hay src), reintentar con URL fresca.
    if (state.missing || !a.getAttribute('src')) {
      const sep = resolvedMusicSrc.includes('?') ? '&' : '?';
      a.src = `${resolvedMusicSrc}${sep}t=${Date.now()}`;
      a.load();
    }
    state.missing = false;
    await a.play();
    return true;
  } catch (e) {
    // Bloqueo de autoplay (sin gesto aún): NO es "archivo faltante".
    const blocked = e && (e.name === 'NotAllowedError' || e.name === 'NotSupportedError');
    if (!blocked) state.missing = true;
    emit();
    return false;
  }
}

export function pauseMusic() {
  if (audio && !audio.paused) audio.pause();
}
