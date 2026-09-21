import { useEffect, useRef, useState } from 'react';

/**
 * Parallax suave por cursor / touch.
 * Devuelve { x, y } normalizados en [-1, 1] con suavizado por rAF.
 * En touch, el arrastre horizontal/vertical desplaza el jardín.
 */
export function useMouseParallax({ disabled = false, smoothing = 0.06 } = {}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (disabled) {
      setPos({ x: 0, y: 0 });
      return;
    }
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * smoothing;
      current.current.y += (target.current.y - current.current.y) * smoothing;
      setPos({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [disabled, smoothing]);

  useEffect(() => {
    if (disabled) return;
    const onMouse = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    let lastTouch = null;
    const onTouchStart = (e) => {
      if (e.touches[0]) lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e) => {
      if (!e.touches[0] || !lastTouch) return;
      const dx = (e.touches[0].clientX - lastTouch.x) / window.innerWidth;
      const dy = (e.touches[0].clientY - lastTouch.y) / window.innerHeight;
      target.current.x = Math.max(-1, Math.min(1, target.current.x + dx * 2.2));
      target.current.y = Math.max(-1, Math.min(1, target.current.y + dy * 2.2));
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    // Deriva ambiental elegante cuando no hay interacción (brisa)
    let t = 0;
    const idle = setInterval(() => {
      t += 0.15;
      if (Math.abs(target.current.x) < 0.02 && Math.abs(target.current.y) < 0.02) {
        target.current.x = Math.sin(t * 0.4) * 0.08;
        target.current.y = Math.cos(t * 0.3) * 0.05;
      }
    }, 120);

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      clearInterval(idle);
    };
  }, [disabled]);

  return pos;
}
