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
    fecha: string;
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
