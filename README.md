# Módulo de Admisiones — Colegio CEFEG (Astro)

Código del apartado de admisiones, construido a partir del diseño aprobado. Por ahora corre solo con datos
de ejemplo (`src/data/mockData.ts`, `src/data/mockSecretaria.ts`) — sin conexión a Q10, Aliado ni WhatsApp.
Cada punto donde falta esa conexión está marcado con `TODO(servidor)` en el código.

## Cómo correrlo

```bash
npm install
npm run dev
```

Páginas disponibles:

- `/admisiones/seguimiento/f3a9c1e2` — portal de seguimiento del acudiente (token de ejemplo)
- `/admisiones/consultar` — consulta de respaldo por radicado + últimos 4 dígitos
- `/admisiones/cita` — ventana para agendar cita (ejemplo con grado "Secundaria")
- `/secretaria/admisiones` — panel interno de secretaría

## Estructura

```
src/
  components/admisiones/   componentes reutilizables (Stepper, checklist, tarjetas, calendario, tabla)
  data/                    tipos + datos de ejemplo + reglas de agendamiento
  layouts/BaseLayout.astro estructura base (fuentes, <head>)
  styles/global.css        tokens de color y tipografía de la marca
  pages/                   las 4 rutas de arriba
```

## Lo que falta para conectar con el servidor

Ya está señalado en el plan técnico (`plan-tecnico-admisiones-cefeg.md`) y en los `TODO(servidor)` del código:

1. **Cambiar a modo servidor**: en `astro.config.mjs`, pasar `output: 'static'` a `'server'` y agregar un
   adapter (`@astrojs/node`, `@astrojs/vercel`, etc.), para que `/admisiones/seguimiento/[token]` resuelva
   cualquier token en cada visita en vez de solo los que están en `getStaticPaths`.
2. **Reemplazar los datos de ejemplo** (`mockData.ts`, `mockSecretaria.ts`) por llamadas reales — a Q10
   directamente, o a una API propia que se sincronice con Q10 y Aliado (pendiente de decidir).
3. **Endpoints** para los formularios que ya están armados en la interfaz: agendar cita
   (`/admisiones/cita`), consulta de respaldo (`/admisiones/consultar`), actualizar etapa manual y enviar
   bienvenida (`/secretaria/admisiones`).
4. **Autenticación real** para `/secretaria/admisiones` (usuario/contraseña) — el portal de padres
   deliberadamente no la necesita (ver el plan técnico).
5. **Envío de WhatsApp** vía la API de WhatsApp Business o un proveedor (Twilio, 360dialog...), disparado
   desde esos endpoints.
