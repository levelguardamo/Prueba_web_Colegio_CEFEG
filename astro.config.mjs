import { defineConfig } from 'astro/config';

// De momento en modo estático (getStaticPaths con datos de ejemplo).
// Cuando se conecte con el servidor / Q10, cambia a:
//   output: 'server'
// y agrega un adapter (@astrojs/node, @astrojs/vercel, etc.) para que
// /admisiones/seguimiento/[token] se resuelva en cada request en vez
// de generarse solo para las rutas de ejemplo.
export default defineConfig({
  output: 'static',
});
