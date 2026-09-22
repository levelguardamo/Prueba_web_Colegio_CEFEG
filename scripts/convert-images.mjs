import sharp from 'sharp';
import { copyFileSync, mkdirSync } from 'fs';

const SRC = 'public/images/_banco';
const DST = 'public/images';

const conversions = [
  // ── HERO (1920×1080, q82) ──────────────────────────────────────────────
  { src: 'CEFEG_1.10.1.jpg', dst: 'home/hero-comunidad-escaleras-01.webp', w: 1920, h: 1080, q: 82 },
  { src: 'CEFEG_1.1.1.jpg',  dst: 'home/hero-ninas-patio-02.webp',         w: 1920, h: 1080, q: 82 },
  { src: 'CEFEG_1.18.1.jpg', dst: 'home/hero-sede-exterior-03.webp',       w: 1920, h: 1080, q: 82 },

  // ── HOME (quiénes somos + footer bg) ─────────────────────────────────
  { src: 'CEFEG_1.9.1.jpg',  dst: 'home/quienes-estudiantes-arbol.webp',   w: 1200, h: 800,  q: 80 },
  { src: 'CEFEG_1.86.1.jpg', dst: 'home/footer-sede-patio.webp',           w: 1920, h: 900,  q: 72 },

  // ── FILOSOFÍA ─────────────────────────────────────────────────────────
  { src: 'CEFEG_1.71.1.jpg', dst: 'filosofia/mural-versiculo-jeremias.webp', w: 1200, h: 800, q: 80 },

  // ── PILARES ───────────────────────────────────────────────────────────
  { src: 'CEFEG_1.12.1.jpg', dst: 'pilares/pilar-biblico-aula.webp',        w: 900,  h: 600,  q: 80 },
  { src: 'CEFEG_1.73.1.jpg', dst: 'pilares/pilar-academico-matematicas.webp',w: 900, h: 600,  q: 80 },
  { src: 'CEFEG_1.64.1.jpg', dst: 'pilares/pilar-deporte-natacion.webp',    w: 900,  h: 600,  q: 80 },
  { src: 'CEFEG_1.80.1.jpg', dst: 'pilares/pilar-arte-banda-musical.webp',  w: 900,  h: 600,  q: 80 },

  // ── HISTORIA ──────────────────────────────────────────────────────────
  { src: 'CEFEG_1.24.1.jpg', dst: 'historia/sede-exterior-recreo.webp',     w: 1200, h: 700,  q: 80 },

  // ── CORPORACIÓN ───────────────────────────────────────────────────────
  { src: 'CEFEG_1.56.1.jpg', dst: 'corporacion/uniforme-escudo-cefeg.webp', w: 700,  h: 700,  q: 82 },

  // ── SERVICIOS ─────────────────────────────────────────────────────────
  { src: 'CEFEG_1.17.1.jpg', dst: 'servicios/aula-secundaria-clase.webp',         w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.77.1.jpg', dst: 'servicios/extracurricular-musica-teclado.webp', w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.63.1.jpg', dst: 'servicios/extracurricular-natacion-piscina.webp', w: 900, h: 600, q: 80 },

  // ── REFLEXIONES ───────────────────────────────────────────────────────
  { src: 'CEFEG_1.69.1.jpg', dst: 'reflexiones/aula-presentacion-versiculo.webp', w: 1200, h: 700, q: 80 },

  // ── SEDE PRIMARIA (galería, 11 imágenes) ──────────────────────────────
  { src: 'CEFEG_1.6.1.jpg',  dst: 'sede-primaria/preescolar-pintura-01.webp',    w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.42.1.jpg', dst: 'sede-primaria/docente-grupo-02.webp',          w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.48.1.jpg', dst: 'sede-primaria/aula-colorida-03.webp',          w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.50.1.jpg', dst: 'sede-primaria/preescolar-mesa-04.webp',        w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.40.1.jpg', dst: 'sede-primaria/docente-alumna-05.webp',         w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.38.1.jpg', dst: 'sede-primaria/aula-trabajando-06.webp',        w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.84.1.jpg', dst: 'sede-primaria/patio-juego-07.webp',            w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.23.1.jpg', dst: 'sede-primaria/patio-amigos-08.webp',           w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.60.1.jpg', dst: 'sede-primaria/aula-grupo-09.webp',             w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.55.1.jpg', dst: 'sede-primaria/docente-actividad-10.webp',      w: 900, h: 600, q: 80 },
  { src: 'CEFEG_1.33.1.jpg', dst: 'sede-primaria/aula-atencion-11.webp',          w: 900, h: 600, q: 80 },
];

let ok = 0, fail = 0;

for (const c of conversions) {
  try {
    await sharp(`${SRC}/${c.src}`)
      .resize(c.w, c.h, { fit: 'cover', position: 'center' })
      .webp({ quality: c.q })
      .toFile(`${DST}/${c.dst}`);
    console.log(`✓  ${c.dst}`);
    ok++;
  } catch (e) {
    console.error(`✗  ${c.dst}: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} OK, ${fail} failed`);
