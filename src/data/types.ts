// Tipos compartidos del módulo de admisiones.
// Cuando exista la conexión con el servidor / Q10, estos tipos deberían
// describir la respuesta real de esa API en vez de los datos de ejemplo.
import type { TipoProceso } from './reglasAdmision';

export type EtapaId =
  | 'cita_inicial'
  | 'entrevista'
  | 'formulario_admision'
  | 'capellania_comite'
  | 'matricula';

export interface EtapaProceso {
  id: EtapaId;
  label: string;
  estado: 'completada' | 'actual' | 'pendiente';
}

export interface DocumentoChecklist {
  nombre: string;
  estado: string;
  pendiente: boolean;
}

export type ResultadoAdmision = 'pendiente' | 'admitido' | 'rechazado';

export interface PasoManual {
  id: 'formulario_fisico' | 'formulario_pagado' | 'papeleria_comite' | 'comite_aprobo';
  label: string;
  // 'documento': se puede subir un archivo y/o marcar como recibido en físico.
  // 'automatico': lo confirma Q10 solo, aquí no se toca nada a mano.
  // 'aprobacion': el paso final — al marcarlo se dispara la bienvenida automática.
  tipo: 'documento' | 'automatico' | 'aprobacion';
  completado: boolean;
}

export interface Aspirante {
  token: string; // identificador aleatorio para el enlace mágico
  radicado: string;
  nombre: string;
  grado: string;
  jornada: string;
  etapaActual: EtapaId;
  resultado: ResultadoAdmision; // 'pendiente' mientras el comité no decide
  tipoProceso: TipoProceso; // 'nuevo' (agosto-febrero) o 'traslado' (todo el año)
  telefonoAcudiente: string; // capturado al agendar la cita (formato WhatsApp: 57XXXXXXXXXX)
  documentos: DocumentoChecklist[];
  proximaCita: {
    titulo: string;
    fecha: string; // texto legible, ej: "Jueves 25 de septiembre · 9:00 a.m."
    // Fecha en formato YYYY-MM-DD — además del texto legible de arriba,
    // para poder ordenar y agrupar citas cronológicamente en el panel de
    // secretaría sin tener que interpretar el texto. Opcional porque los
    // datos de ejemplo más viejos no siempre la traen.
    fechaISO?: string;
    lugar: string;
    notaSincronizacion: string;
  } | null;
  formularioAdmision: {
    estado: 'pagado' | 'pendiente';
    valor: string;
    notaSincronizacion: string;
  };
  mensajeBienvenida: {
    texto: string;
    enviado: boolean;
  };
  mensajeRechazo: {
    texto: string;
    enviado: boolean;
  };
  // Datos que usa el panel de secretaría (src/pages/secretaria/admisiones.astro)
  // para mostrar la ficha del aspirante y su línea de progreso. Viven en el
  // mismo registro que el resto porque secretaría y el portal del padre
  // deben hablar del MISMO aspirante — antes eran dos listas separadas
  // (mockData.ts y mockSecretaria.ts) que podían quedar desincronizadas.
  acudiente: {
    nombre: string;
    telefono: string;
    radicado: string;
  };
  pasos: PasoManual[];
}

export const ETAPAS_ORDEN: { id: EtapaId; label: string }[] = [
  { id: 'cita_inicial', label: 'Cita inicial' },
  { id: 'entrevista', label: 'Entrevista' },
  { id: 'formulario_admision', label: 'Formulario admisión' },
  { id: 'capellania_comite', label: 'Capellanía y comité' },
  { id: 'matricula', label: 'Matrícula' },
];

export function construirEtapas(actual: EtapaId): EtapaProceso[] {
  const idx = ETAPAS_ORDEN.findIndex((e) => e.id === actual);
  return ETAPAS_ORDEN.map((e, i) => ({
    id: e.id,
    label: e.label,
    estado: i < idx ? 'completada' : i === idx ? 'actual' : 'pendiente',
  }));
}
