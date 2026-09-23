// Datos de ejemplo — hoy alimentan las páginas directamente.
// TODO(servidor): reemplazar por una función que consulte la API propia
// (que a su vez se sincroniza con Q10 y Aliado) usando el token de la URL.
import type { Aspirante } from './types';
import { construirMensajeBienvenida, construirMensajeRechazo } from './reglasAdmision';

export const aspirantesEjemplo: Aspirante[] = [
  {
    token: 'f3a9c1e2',
    radicado: '#ADM-2026-0184',
    nombre: 'Valentina Ríos',
    grado: 'Transición',
    jornada: 'Jornada única',
    etapaActual: 'capellania_comite',
    resultado: 'pendiente',
    tipoProceso: 'nuevo',
    telefonoAcudiente: '573000000000',
    documentos: [
      { nombre: 'Formulario general (entrevista)', estado: 'Pendiente subir a Q10', pendiente: true },
      { nombre: 'Formulario de admisión pagado', estado: 'Confirmado por Q10', pendiente: false },
      { nombre: 'Papelería para comité', estado: 'Pendiente digitalizar', pendiente: true },
    ],
    proximaCita: {
      titulo: 'Entrevista con capellanía',
      fecha: 'Jueves 25 de septiembre · 9:00 a.m.',
      lugar: 'Sede Guarne · Capellanía',
      notaSincronizacion:
        'Hoy se coordina a mano por WhatsApp y Google Calendar · aquí queda agendada en Q10',
    },
    formularioAdmision: {
      estado: 'pagado',
      valor: '[Valor formulario]',
      notaSincronizacion: 'Confirmado automáticamente por Q10 · antes se validaba a mano',
    },
    mensajeBienvenida: {
      texto: construirMensajeBienvenida({
        nombre: 'Valentina',
        grado: 'Transición',
        tipoProceso: 'nuevo',
      }),
      enviado: false,
    },
    mensajeRechazo: {
      texto: construirMensajeRechazo({ tipoProceso: 'nuevo' }),
      enviado: false,
    },
    acudiente: { nombre: 'Carolina Ríos', telefono: '+57 300 000 0000', radicado: '#ADM-2026-0184' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: true },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: true },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: false },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: false },
    ],
  },
  {
    token: 'a8d21bd0',
    radicado: '#ADM-2026-0107',
    nombre: 'Samuel Ortiz',
    grado: '4° Primaria',
    jornada: 'Jornada única',
    etapaActual: 'matricula',
    resultado: 'admitido',
    tipoProceso: 'nuevo',
    telefonoAcudiente: '573001234567',
    documentos: [
      { nombre: 'Formulario general (entrevista)', estado: 'Confirmado por Q10', pendiente: false },
      { nombre: 'Formulario de admisión pagado', estado: 'Confirmado por Q10', pendiente: false },
      { nombre: 'Papelería para comité', estado: 'Confirmado por Q10', pendiente: false },
    ],
    proximaCita: null,
    formularioAdmision: {
      estado: 'pagado',
      valor: '[Valor formulario]',
      notaSincronizacion: 'Confirmado automáticamente por Q10 · antes se validaba a mano',
    },
    mensajeBienvenida: {
      texto: construirMensajeBienvenida({
        nombre: 'Samuel',
        grado: '4° Primaria',
        tipoProceso: 'nuevo',
      }),
      enviado: false,
    },
    mensajeRechazo: {
      texto: '',
      enviado: false,
    },
    acudiente: { nombre: 'Juliana Ortiz', telefono: '+57 300 123 4567', radicado: '#ADM-2026-0107' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: true },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: true },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: true },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: true },
    ],
  },
  {
    token: 'c47e9f31',
    radicado: '#ADM-2026-0142',
    nombre: 'Mariana Pérez',
    grado: '7° Secundaria',
    jornada: 'Jornada única',
    etapaActual: 'capellania_comite',
    resultado: 'rechazado',
    tipoProceso: 'nuevo',
    telefonoAcudiente: '573009876543',
    documentos: [
      { nombre: 'Formulario general (entrevista)', estado: 'Confirmado por Q10', pendiente: false },
      { nombre: 'Formulario de admisión pagado', estado: 'Confirmado por Q10', pendiente: false },
      { nombre: 'Papelería para comité', estado: 'Confirmado por Q10', pendiente: false },
    ],
    proximaCita: null,
    formularioAdmision: {
      estado: 'pagado',
      valor: '[Valor formulario]',
      notaSincronizacion: 'Confirmado automáticamente por Q10 · antes se validaba a mano',
    },
    mensajeBienvenida: {
      texto: '',
      enviado: false,
    },
    mensajeRechazo: {
      // TODO(diseño): placeholder mientras llega el texto/imagen real de
      // "RESULTADO ADMISIÓN — RECHAZADA" (mismo estilo que la pieza de
      // "APROBADA" que ya mandó el colegio).
      texto: construirMensajeRechazo({ tipoProceso: 'nuevo' }),
      enviado: false,
    },
    acudiente: { nombre: 'Andrés Pérez', telefono: '+57 300 987 6543', radicado: '#ADM-2026-0142' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: true },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: true },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: true },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: false },
    ],
  },
];

export function buscarAspirantePorToken(token: string): Aspirante | undefined {
  return aspirantesEjemplo.find((a) => a.token === token);
}

// TODO(servidor): el respaldo "radicado + últimos 4 dígitos del celular"
// debería validarse contra la base real, no contra este arreglo de ejemplo.
export function buscarAspirantePorRadicadoYTelefono(
  radicado: string,
  ultimos4: string
): Aspirante | undefined {
  return aspirantesEjemplo.find((a) => a.radicado === radicado);
}
