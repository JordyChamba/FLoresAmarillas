/* ============================================================
   PERSONALIZACIÓN — Edita solo este archivo para adaptar
   la experiencia a tu persona especial.
   ============================================================ */

// ── Destinatario ─────────────────────────────────────────────
// Aparece en el mensaje sorpresa ("Hay algo más...").
// Ejemplos: "Para Valentina", "Para mi amor", "Para ti"
export const recipientName = 'Para ti Preciosaaaaa!';

// ── Inicial protagonista (botón flor + letra) ────────────────
// Aparece en el botón dorado junto a "Volver a florecer" y en su dedicatoria.
export const initial = 'J';

export const dedication = {
  overline: 'Una flor con tu inicial',
  // El título se compone como `Para ${initial}` automáticamente.
  text: 'Hay letras que florecen solas. La tuya pinta de amarillo hasta los lunes grises. Gracias por existir y por hacer que este jardín —y mi mundo— tenga más color.',
  sign: 'Para la mejor J del universo 🌻',
};

export const spidey = {
  button: 'Sorpresa arácnida',
  bubble: '¡THWIP!',
  title: 'Hasta los héroes regalan flores amarillas',
  text: 'Tu amigable vecino cruzó medio jardín colgado de su telaraña solo para traerte este girasol. Que tu día tenga acción, risas y cero villanos.',
  sign: 'Tu amigable vecino 🕷️💛',
  close: 'Cerrar',
};

export const potter = {
  button: 'Sorpresa Potter',
  spell: '¡LUMOS SOLEM!',
  title: 'La magia también florece',
  text: 'Dicen que Hufflepuff viste de amarillo por algo: lealtad, paciencia y magia amable. Pide un deseo en voz alta y mira cómo hasta las flores obedecen un buen hechizo.',
  sign: 'Travesura realizada ⚡',
  close: 'Cerrar',
};

// ── Opción 1 · Nuevas sorpresas ─────────────────────────────────
export const reasons = {
  button: 'Por qué brillas',
  title: 'Razones por las que brillas',
  subtitle: 'Guárdalas para los días grises',
  items: [
    { title: 'Tu risa', text: 'Convierte cualquier lunes en septiembre.' },
    { title: 'Tu calma', text: 'Todo se ordena cuando estás cerca.' },
    { title: 'Tu constancia', text: 'Floreces incluso en los días difíciles.' },
    { title: 'Tu ternura', text: 'Haces que lo ordinario se sienta especial.' },
    { title: 'Tu luz', text: 'Iluminas sin darte cuenta.' },
    { title: 'Tú', text: 'Simplemente por existir, el mundo es mejor.' },
  ],
  sign: 'Y podría seguir… 💛',
  close: 'Cerrar',
};

export const coupons = {
  button: 'Vales',
  title: 'Cupones canjeables',
  subtitle: 'Sin fecha de caducidad, como lo bueno',
  items: [
    { icon: '☕', title: 'Café para dos', text: 'Una tarde sin prisa, por mi cuenta.' },
    { icon: '🎬', title: 'Noche de peli', text: 'Tú eliges la peli.' },
    { icon: '🤗', title: 'Abrazo largo', text: 'Canjeable a cualquier hora.' },
    { icon: '🌻', title: 'Flores', text: 'A buscar flores bonitas juntos.' },
    { icon: '🍰', title: 'Algo dulce', text: 'Porque te lo mereces siempre.' },
    { icon: '💌', title: 'Carta sorpresa', text: 'Una carta escrita solo para ti.' },
  ],
  sign: 'Presenta este jardín para canjear 💛',
  close: 'Cerrar',
};

export const promise = {
  button: 'Poema mágico',
  title: 'Hechizo en verso',
  // Poema estilo Harry Potter: se renderiza verso por verso.
  // Usa '' como separador entre estrofas.
  verses: [
    'Juro solemnemente, varita en mano,',
    'que eres mi mejor hechizo, y no en vano:',
    'ni giratiempo ni capa invisible',
    'me alejan de ti: eso es imposible.',
    '',
    'Dicen que Hufflepuff viste de amarillo',
    'por leal, por noble, por su tierno brillo;',
    'yo, sin ser mago de gran renombre,',
    'conjuro tu risa y repito tu nombre.',
    '',
    'Agito la varita: ¡flores a raudales!',
    'amarillas y altas como ventanales;',
    'que pinten tu día de fiesta y de miel,',
    'como carta que llega por lechuza fiel.',
    '',
    'Y si un dementor te roba la alegría,',
    'mi patronus te guarda de noche y de día.',
    'Travesura realizada, cierro este mapa…',
    'pero mi amor por ti nunca se escapa.',
  ],
  sign: 'Travesura realizada ⚡🌻',
  close: 'Cerrar',
};

// ── Opción 3 · Detalles que enamoran ───────────────────────────
export const counter = {
  // Cambia por su fecha especial: AAAA-MM-DD
  startDate: '2024-09-21',
  label: 'floreciendo juntos desde hace',
  unitSingular: 'día',
  unitPlural: 'días',
};

export const wish = {
  button: 'Pide un deseo',
  title: 'Pide un deseo',
  text: 'Cierra los ojos, piensa en algo bonito… y sopla la vela para sellarlo.',
  hint: 'Toca la llama para soplar 🕯️',
  madeTitle: 'Deseo guardado ✨',
  madeText: 'El jardín ya lo sabe. Todo lo que se pide con el corazón, florece.',
  close: 'Cerrar',
};

export const postcard = {
  button: 'Postal',
  title: 'Postal del jardín',
  subtitle: 'Descarga este recuerdo en PNG',
  download: 'Descargar postal',
  close: 'Cerrar',
};

// ── Textos guía (para que nadie se pierda las sorpresas) ─────
export const hints = {
  buttons: 'Prueba cada botón… cada uno esconde una sorpresa ✨',
  moods: 'Toca para ver el jardín al amanecer, al atardecer o al anochecer',
};

// ── Mensajes ─────────────────────────────────────────────────
export const copy = {
  introKicker: '21 · septiembre',
  introTitle: 'Hay días que merecen llenarse de color…',
  introSubtitle: 'Y este es uno de ellos.',
  introButton: 'Haz florecer el jardín',

  gardenBadge: '21 de septiembre — Día de las Flores Amarillas',
  gardenTitle: 'Para ti, porque hay personas que hacen que todo florezca un poquito más.',
  gardenSubtitle: 'Feliz Día de las Flores Amarillas',

  surpriseButton: 'Hay algo más…',
  surpriseHint: 'Te prometo que vale la pena ✨',
  surpriseTitle: recipientName,
  surpriseText:
    'Si las flores amarillas significan alegría, que nunca te falte. Gracias por florecer incluso en los días grises. Este jardín es solo un recordatorio de lo que provocas en quienes te quieren.',
  surpriseSign: 'Con cariño, siempre 💛',
  replay: 'Volver a florecer',

  // ── Frases de amor rotativas (bajo el mensaje principal) ──
  loveNotes: [
    'Eres la calma y la fiesta, todo a la vez.',
    'Contigo, hasta lo ordinario florece.',
    'Mi lugar favorito siempre es a tu lado.',
    'Haces que los días grises den flores.',
    'Eres mi sol de septiembre, todo el año.',
  ],

  footerLine: 'Hecho con amor, para ti — 21 · 09',
  musicInvite: 'Toca para la música 🎵',
};

// ── Música ───────────────────────────────────────────────────
// Coloca tu archivo en: /public/audio/music.mp3
// Si no existe, el botón lo indicará con elegancia (sin errores).
export const musicSrc = '/audio/music.mp3';

// ── Tiempos (segundos) — ajusta el ritmo cinematográfico ─────
export const timing = {
  introExit: 1.4, // fundido de la intro
  skyTransition: 3.2, // oscuro → atardecer
  firstStem: 0.5, // retardo antes del primer tallo
  stemStagger: 0.16, // escalonado entre flores
  stemGrow: 1.6, // duración del crecimiento del tallo
  bloomPop: 1.1, // apertura de cada flor
  messageDelay: 3.4, // aparición del mensaje principal
  surpriseGlow: 1.2, // encendido cálido del modo sorpresa
};

// ── Densidad (rendimiento) ───────────────────────────────────
export const density = {
  flowersDesktop: { back: 16, mid: 14, front: 9 },
  flowersMobile: { back: 6, mid: 5, front: 4 },
  budsDesktop: 8,
  budsMobile: 3,
  grassDesktop: 16,
  grassMobile: 6,
  firefliesDesktop: 12,
  firefliesMobile: 4,
  starsDesktop: 70,
  starsMobile: 25,
  particlesDesktop: 26,
  particlesMobile: 6,
  petalsAmbientDesktop: 14,
  petalsAmbientMobile: 4,
  petalsShower: 42,
  butterflies: 5,
};

// ── Paleta (debe coincidir con tailwind.config.js) ───────────
export const palette = {
  sunflower: '#FFD93B',
  gold: '#C9A227',
  cream: '#FAF3E3',
  moss: '#1C2615',
  olive: '#6B7A3A',
  ember: '#E8930C',
  espresso: '#0D0A06',
};
