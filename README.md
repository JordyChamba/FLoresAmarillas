# 🌼 Un jardín que florece para ti

Experiencia web romántica e interactiva para el **Día de las Flores Amarillas — 21 de septiembre**.
React + Vite + Tailwind CSS + Framer Motion + Lucide.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # previsualiza el build
```

## Estructura

```
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── audio/
│       ├── music.mp3          ← coloca aquí tu canción
│       └── README.md
└── src/
    ├── config.js              ← ⭐ PERSONALIZA TODO AQUÍ
    ├── main.jsx
    ├── App.jsx
    ├── index.css              ← keyframes, grano de cine, shimmer
    ├── hooks/
    │   ├── useMouseParallax.js
    │   ├── useReducedMotion.js
    │   └── useIsMobile.js
    └── components/
        ├── Intro.jsx          ← pantalla oscura cinematográfica
        ├── Garden.jsx         ← 3 momentos (amanecer/atardecer/anochecer) + parallax
        ├── Flower.jsx         ← flor SVG procedural (5 variantes)
        ├── Buds.jsx           ← capullos cerrados entre las flores
        ├── Grass.jsx          ← hierba de primer plano con brisa
        ├── Petals.jsx         ← partículas, lluvia de pétalos y corazones
        ├── Butterflies.jsx    ← 5 mariposas elegantes
        ├── Birds.jsx          ← pájaros diurnos
        ├── Stars.jsx          ← estrellas + fugaces (noche)
        ├── Fireflies.jsx      ← luciérnagas (noche)
        ├── Message.jsx        ← mensaje palabra por palabra + carta (se adapta a la noche)
        ├── LoveNotes.jsx      ← frases románticas rotativas
        ├── MomentsBar.jsx     ← barra: momentos + lluvia de pétalos (con guía)
        ├── Dedication.jsx     ← modal de la inicial (con InitialBloom)
        ├── InitialBloom.jsx   ← flor que florece con la letra en el corazón
        ├── Spidey.jsx         ← easter egg arácnido + SpiderGlyph
        ├── Potter.jsx         ← easter egg mágico + WandGlyph
        └── MusicButton.jsx    ← pausa/reanuda + invitación pulsante
```

## Personalización (dónde cambiar cada cosa)

Todo lo importante vive en **`src/config.js`**:

| Quiero cambiar… | Dónde |
|---|---|
| Nombre de la persona (`Para ti`) | `recipientName` en `src/config.js` |
| Inicial del botón flor (J) | `initial` en `src/config.js` |
| Texto de la dedicatoria J | `dedication` en `src/config.js` |
| Textos del modo arácnido | `spidey` en `src/config.js` |
| Textos del modo Potter | `potter` en `src/config.js` |
| Indicaciones guía | `hints` en `src/config.js` (`buttons`, `moods`) |
| Textos (intro, mensaje, sorpresa, firma) | objeto `copy` en `src/config.js` |
| Música | coloca el archivo en `public/audio/music.mp3` (ruta en `musicSrc`) |
| Colores | `palette` en `src/config.js` + `theme.extend.colors` en `tailwind.config.js` |
| Ritmo cinematográfico | objeto `timing` en `src/config.js` (segundos): `skyTransition`, `stemStagger`, `messageDelay`, etc. |
| Cantidad de flores / partículas | objeto `density` en `src/config.js` (distinto desktop/móvil) |
| Frases de amor rotativas | `loveNotes` en `src/config.js` (cada 4.2 s, `LoveNotes.jsx`) |
| Firma al pie del jardín | `footerLine` en `src/config.js` |
| Tipografías | `<link>` de Google Fonts en `index.html` + `fontFamily` en `tailwind.config.js` |

## Música

1. Coloca tu archivo MP3 en `public/audio/music.mp3`.
2. La música **arranca sola con el primer toque** (el botón "Haz florecer el jardín" la enciende): los navegadores prohíben el sonido antes del primer gesto, así que no existe autoplay con sonido real — este es el patrón correcto y se siente automático.
3. El botón 🔊 superior derecha pausa/reanuda; si aún no hay música muestra una invitación pulsante ("Toca para la música 🎵").
4. Si el archivo falta, el botón muestra un aviso elegante sin romper nada.
5. Lógica centralizada en `src/audio.js` (singleton + `useSyncExternalStore`).

## Notas de rendimiento y accesibilidad

- Animaciones solo con `transform` + `opacity` (keyframes CSS); Framer Motion solo para entradas/salidas.
- Flores generadas de forma determinista con `useMemo` (sin re-renders aleatorios).
- Densidad reducida automáticamente en móvil (`useIsMobile`).
- `prefers-reduced-motion` desactiva partículas, balanceo, mariposas y parallax.
- Sin Three.js/canvas: todo el efecto se logra con CSS/SVG, más ligero y nítido.
