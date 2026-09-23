// Simulación de "servidor compartido" usando localStorage del navegador.
//
// El sitio es 100% estático (sin backend todavía — ver los TODO(servidor)
// repartidos por el proyecto), así que no hay una base de datos real donde
// secretaría escriba y el portal del padre lea. Para poder PROBAR cómo se
// vería esa interconexión sin construir todavía el backend real, este
// módulo guarda los cambios que hace secretaría (qué pasos se marcaron, si
// el comité aprobó o rechazó el cupo) en localStorage, bajo la MISMA clave
// para todas las páginas del sitio. Como localStorage es del navegador (no
// del servidor), esto solo funciona probando en el mismo navegador/equipo
// — es una maqueta para la demo, no una sincronización real entre
// dispositivos. Eso solo se logra con el backend real.
//
// TODO(servidor): cuando exista la API real, este archivo se reemplaza por
// llamadas fetch() a esa API, y deja de usarse localStorage.

import type { PasoManual, ResultadoAdmision } from '../data/types';

const CLAVE = 'cefeg_admisiones_estado_v1';

export interface CambiosAspirante {
  pasos?: PasoManual[];
  resultado?: ResultadoAdmision;
}

type EstadoGuardado = Record<string, CambiosAspirante>;

function leerTodo(): EstadoGuardado {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return crudo ? JSON.parse(crudo) : {};
  } catch {
    // Navegación privada, almacenamiento bloqueado, etc. — la página sigue
    // funcionando con los datos de ejemplo tal como se generaron al build.
    return {};
  }
}

function guardarTodo(estado: EstadoGuardado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    /* almacenamiento no disponible: el cambio no persiste, pero no rompe nada */
  }
}

// Lee los cambios guardados para UN aspirante (o null si nunca se ha
// tocado desde este navegador — en ese caso la página usa los datos de
// ejemplo generados al hacer build, tal cual).
export function leerCambios(token: string): CambiosAspirante | null {
  return leerTodo()[token] ?? null;
}

// Actualiza SOLO el estado de un paso puntual (ej: "papeleria_comite"),
// dejando los demás pasos guardados (o los del build) intactos.
export function actualizarPaso(
  token: string,
  pasosBase: PasoManual[],
  pasoId: PasoManual['id'],
  completado: boolean
): PasoManual[] {
  const todo = leerTodo();
  const pasosActuales = todo[token]?.pasos ?? pasosBase;
  const nuevosPasos = pasosActuales.map((p) => (p.id === pasoId ? { ...p, completado } : p));
  todo[token] = { ...todo[token], pasos: nuevosPasos };
  guardarTodo(todo);
  return nuevosPasos;
}

// Cambia el resultado final del proceso (lo que dispara, en el portal del
// padre, que se muestre "admitido" o "rechazado" en vez de "pendiente" —
// y con eso, el popup de bienvenida por WhatsApp).
export function actualizarResultado(token: string, resultado: ResultadoAdmision) {
  const todo = leerTodo();
  todo[token] = { ...todo[token], resultado };
  guardarTodo(todo);
}
