// Datos de ejemplo para el panel interno de secretaría.
// TODO(servidor): reemplazar por una consulta autenticada a la API
// propia (que agrega datos de Q10) — esta página debe quedar detrás de
// un login real de secretaría, distinto del acceso ligero de los padres.

export interface PasoManual {
  id: 'formulario_fisico' | 'formulario_pagado' | 'papeleria_comite' | 'comite_aprobo';
  label: string;
  // 'documento': se puede subir un archivo y/o marcar como recibido en físico.
  // 'automatico': lo confirma Q10 solo, aquí no se toca nada a mano.
  // 'aprobacion': el paso final — al marcarlo se dispara la bienvenida automática.
  tipo: 'documento' | 'automatico' | 'aprobacion';
  completado: boolean;
}

export interface FilaAspirante {
  nombre: string;
  grado: string;
  etapa: string;
  formulario: 'Pagado' | 'Pendiente' | '—';
  comite: 'Aprobado' | 'Pendiente' | '—';
  acudiente: {
    nombre: string;
    telefono: string;
    radicado: string;
  };
  pasos: PasoManual[];
}

export const aspirantesTabla: FilaAspirante[] = [
  {
    nombre: 'Valentina Ríos',
    grado: 'Transición',
    etapa: 'Capellanía y comité',
    formulario: 'Pagado',
    comite: 'Pendiente',
    acudiente: { nombre: 'Carolina Ríos', telefono: '+57 300 000 0000', radicado: '#ADM-2026-0184' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: true },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: true },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: false },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: false },
    ],
  },
  {
    nombre: 'Samuel Ortiz',
    grado: '4° Primaria',
    etapa: 'Matrícula',
    formulario: 'Pagado',
    comite: 'Aprobado',
    acudiente: { nombre: 'Juliana Ortiz', telefono: '+57 300 123 4567', radicado: '#ADM-2026-0107' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: true },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: true },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: true },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: true },
    ],
  },
  {
    nombre: 'Mariana Pérez',
    grado: '7° Secundaria',
    etapa: 'Entrevista',
    formulario: 'Pendiente',
    comite: '—',
    acudiente: { nombre: 'Andrés Pérez', telefono: '+57 300 987 6543', radicado: '#ADM-2026-0142' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: false },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: false },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: false },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: false },
    ],
  },
  {
    nombre: 'Andrés Gómez',
    grado: '2° Primaria',
    etapa: 'Cita inicial',
    formulario: '—',
    comite: '—',
    acudiente: { nombre: 'Liliana Gómez', telefono: '+57 300 456 7890', radicado: '#ADM-2026-0166' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: false },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: false },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: false },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: false },
    ],
  },
  {
    nombre: 'Isabella Cano',
    grado: '9° Secundaria',
    etapa: 'Formulario admisión',
    formulario: 'Pagado',
    comite: 'Pendiente',
    acudiente: { nombre: 'Ricardo Cano', telefono: '+57 300 222 3344', radicado: '#ADM-2026-0151' },
    pasos: [
      { id: 'formulario_fisico', label: 'Formulario general recibido en físico', tipo: 'documento', completado: true },
      { id: 'formulario_pagado', label: 'Formulario de admisión pagado (Q10)', tipo: 'automatico', completado: true },
      { id: 'papeleria_comite', label: 'Papelería entregada para comité', tipo: 'documento', completado: false },
      { id: 'comite_aprobo', label: 'Comité aprobó el cupo', tipo: 'aprobacion', completado: false },
    ],
  },
];
