// Simulación de "servidor compartido" para citas agendadas desde el
// formulario público (/admisiones/cita), usando localStorage — el mismo
// enfoque que estadoAspirantes.ts, pero para aspirantes que NO existen en
// los datos de ejemplo del build (mockData.ts): nacen aquí mismo, en el
// navegador, cuando alguien agenda una cita.
//
// Por qué un archivo aparte de estadoAspirantes.ts: ese módulo guarda
// CAMBIOS sobre un aspirante que ya existe (sus `pasos` y `resultado`);
// este módulo guarda el aspirante COMPLETO recién creado. Una vez creado,
// cualquier cambio que secretaría le haga (marcar un paso, admitir,
// rechazar) sí pasa por estadoAspirantes.ts como con cualquier otro.
//
// Limitación importante de esta demo: como el sitio es 100% estático, la
// página /admisiones/seguimiento/<token> solo existe para los tokens que
// ya estaban en mockData.ts al momento del build. Un aspirante creado
// aquí, en el navegador, NO tiene esa página — solo aparece en el panel
// de secretaría. Para que también tuviera su portal de seguimiento hace
// falta el backend real (SSR / servidor), ver el TODO(servidor) de más
// abajo y en seguimiento/[token].astro.
//
// TODO(servidor): cuando exista el backend real, agendar una cita debe
// crear el registro en la base (o en Q10) — con su propia página de
// seguimiento — y este archivo deja de usarse.

import type { Aspirante } from '../data/types';
import type { TipoProceso } from '../data/reglasAdmision';
import { construirMensajeBienvenida, construirMensajeRechazo } from '../data/reglasAdmision';

const CLAVE = 'cefeg_admisiones_nuevos_v1';

function leerTodos(): Aspirante[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return crudo ? JSON.parse(crudo) : [];
  } catch {
    return [];
  }
}

function guardarTodos(lista: Aspirante[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {
    /* almacenamiento no disponible: la cita no queda guardada, pero la
       página sigue funcionando y muestra igual la confirmación */
  }
}

function generarToken(): string {
  // 8 caracteres hexadecimales, con el mismo formato que los tokens de
  // ejemplo (f3a9c1e2, a8d21bd0...).
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function generarRadicado(): string {
  const anio = new Date().getFullYear();
  const numero = Math.floor(1000 + Math.random() * 9000);
  return `#ADM-${anio}-${numero}`;
}

export interface DatosCitaNueva {
  nombreNino: string;
  acudiente: string;
  telefono: string;
  gradoLabel: string;
  fechaLegible: string; // ej: "Martes 30 de septiembre · 10:00 a.m."
  fechaISO: string; // YYYY-MM-DD, para poder ordenar la cita en la agenda de secretaría
  grupal: boolean;
  // 'nuevo': el estudiante va a iniciar el grado por primera vez.
  // 'traslado': ya inició el proceso escolar en ese grado en otro colegio
  // y se traslada la información para matricularlo acá. Elegido por el
  // acudiente en el formulario — define también el año lectivo que se
  // menciona en los mensajes de bienvenida/rechazo (ver reglasAdmision.ts).
  tipoProceso: TipoProceso;
}

// Arma un Aspirante completo a partir de lo que se llenó en el formulario
// de cita, lo guarda en localStorage y lo devuelve para poder mostrar la
// confirmación en pantalla.
export function crearAspiranteDesdeCita(datos: DatosCitaNueva): Aspirante {
  const token = generarToken();
  const radicado = generarRadicado();
  const nombreNino = datos.nombreNino.trim();
  const nombrePila = nombreNino.split(/\s+/)[0] || nombreNino;
  const acudienteNombre = datos.acudiente.trim();
  const telefono = datos.telefono.trim();

  const aspirante: Aspirante = {
    token,
    radicado,
    nombre: nombreNino,
    grado: datos.gradoLabel,
    jornada: 'Jornada única',
    etapaActual: 'cita_inicial',
    resultado: 'pendiente',
    tipoProceso: datos.tipoProceso,
    telefonoAcudiente: telefono,
    documentos: [
      { nombre: 'Formulario general (entrevista)', estado: 'Pendiente subir a Q10', pendiente: true },
      { nombre: 'Formulario de admisión pagado', estado: 'Pendiente de pago', pendiente: true },
      { nombre: 'Papelería para comité', estado: 'Pendiente digitalizar', pendiente: true },
    ],
    proximaCita: {
      titulo: datos.grupal ? 'Reunión grupal de admisión' : 'Cita inicial de admisión',
      fecha: datos.fechaLegible,
      fechaISO: datos.fechaISO,
      lugar: 'Sede Guarne',
      notaSincronizacion: 'Agendada desde el formulario público · aquí queda agendada en Q10',
    },
    formularioAdmision: {
      estado: 'pendiente',
      valor: '[Valor formulario]',
      notaSincronizacion: 'Se confirma automáticamente por Q10 apenas se registre el pago',
    },
    mensajeBienvenida: {
      texto: construirMensajeBienvenida({ nombre: nombrePila, grado: datos.gradoLabel, tipoProceso: datos.tipoProceso }),
      enviado: false,
    },
    mensajeRechazo: {
      texto: construirMensajeRechazo({ tipoProceso: datos.tipoProceso }),
      enviado: false,
    },
    acudiente: { nombre: acudienteNombre, telefono, radicado },
    // El paso de pago normalmente lo confirma Q10 solo ('automatico', como
    // en los aspirantes de ejemplo de mockData.ts, que ya nacen con ese
    // paso resuelto). Un aspirante recién agendado aquí todavía no tiene
    // esa integración real detrás, así que si naciera como 'automatico'
    // quedaría con ese paso bloqueado PARA SIEMPRE — nadie podría marcarlo
    // nunca, y por lo tanto tampoco admitir al estudiante. Por eso, solo
    // para los aspirantes nacidos en esta demo, ese paso nace como
    // 'documento': secretaría puede marcarlo a mano mientras no exista la
    // conexión real con Q10.
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: false },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'documento', completado: false },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: false },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: false },
    ],
  };

  const todos = leerTodos();
  todos.push(aspirante);
  guardarTodos(todos);
  return aspirante;
}

export function leerNuevosAspirantes(): Aspirante[] {
  return leerTodos();
}
