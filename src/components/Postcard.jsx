import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, ImageDown } from 'lucide-react';
import { copy, postcard, recipientName } from '../config';

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Modal postal: dibuja un PNG en canvas y lo descarga (sin dependencias). */
export default function Postcard({ open, onClose }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    // fondo
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#241407');
    sky.addColorStop(0.45, '#B25E14');
    sky.addColorStop(0.72, '#F5C04A');
    sky.addColorStop(1, '#FAF3E3');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // sol
    const sun = ctx.createRadialGradient(W / 2, H * 0.52, 10, W / 2, H * 0.52, 320);
    sun.addColorStop(0, 'rgba(255,250,230,.95)');
    sun.addColorStop(0.4, 'rgba(255,220,120,.7)');
    sun.addColorStop(1, 'rgba(245,168,40,0)');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, W, H);

    // suelo
    ctx.fillStyle = '#2A3A1E';
    ctx.beginPath();
    ctx.ellipse(W / 2, H + 120, W * 0.75, 340, 0, 0, Math.PI * 2);
    ctx.fill();

    // flores simples
    const flower = (x, y, r) => {
      ctx.save();
      ctx.translate(x, y);
      for (let i = 0; i < 10; i++) {
        ctx.rotate((Math.PI * 2) / 10);
        ctx.fillStyle = '#FFD93B';
        ctx.beginPath();
        ctx.ellipse(0, -r, r * 0.45, r, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#5C3A08';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = '#3E5527';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(x, y + 10);
      ctx.lineTo(x, y + 220);
      ctx.stroke();
    };
    flower(W * 0.25, H * 0.78, 52);
    flower(W * 0.5, H * 0.82, 66);
    flower(W * 0.76, H * 0.78, 52);

    // tarjeta
    const pad = 90;
    ctx.fillStyle = 'rgba(250,243,227,.94)';
    const cardY = 150;
    const cardH = 560;
    ctx.beginPath();
    ctx.roundRect(pad, cardY, W - pad * 2, cardH, 48);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#E8930C';
    ctx.font = '600 30px Outfit, sans-serif';
    ctx.fillText(copy.gardenBadge.toUpperCase(), W / 2, cardY + 80);

    ctx.fillStyle = '#161009';
    ctx.font = 'italic 600 54px Georgia, serif';
    const titleLines = wrapText(ctx, copy.gardenTitle, W - pad * 2 - 120);
    titleLines.slice(0, 4).forEach((ln, i) => {
      ctx.fillText(ln, W / 2, cardY + 160 + i * 64);
    });

    ctx.fillStyle = 'rgba(22,16,9,.8)';
    ctx.font = 'italic 40px Georgia, serif';
    ctx.fillText(recipientName, W / 2, cardY + 160 + Math.min(titleLines.length, 4) * 64 + 20);
    ctx.font = '300 30px Outfit, sans-serif';
    ctx.fillText(copy.footerLine, W / 2, cardY + cardH - 50);

    ctx.fillStyle = 'rgba(250,243,227,.9)';
    ctx.font = '300 28px Outfit, sans-serif';
    ctx.fillText(copy.surpriseSign, W / 2, H - 60);

    setReady(true);
  }, [open]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'postal-jardin-amarillo.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="postcard"
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={postcard.title}
        >
          <div className="absolute inset-0 bg-espresso-950/75 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.article
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 210, damping: 24 }}
            className="relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-sunflower-300/40 bg-cream p-6 text-center sm:p-7"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar postal"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-espresso-950/5 text-espresso-900/60 transition-all hover:rotate-90 hover:text-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <p className="flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-ember">
              <ImageDown className="h-3.5 w-3.5" strokeWidth={2} />
              {postcard.subtitle}
            </p>
            <h3 className="font-serif-d mt-1 text-2xl font-semibold italic text-espresso-950">{postcard.title}</h3>

            <div className="mt-4 overflow-hidden rounded-2xl border border-espresso-900/10 shadow-lg">
              <canvas ref={canvasRef} className="h-auto w-full" aria-label="Vista previa de la postal" />
            </div>

            <button
              onClick={download}
              disabled={!ready}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunflower-200 via-sunflower-400 to-ember px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-espresso-950 shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <Download className="h-4 w-4" strokeWidth={2} />
              {postcard.download}
            </button>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
