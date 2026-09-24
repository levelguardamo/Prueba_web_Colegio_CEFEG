// Reglas de agendamiento por grado.
// getDay(): 0=domingo, 1=lunes, 2=martes, 3=miércoles, 4=jueves, 5=viernes, 6=sábado
// Lunes y jueves nunca se atienden (se aplica en Calendar.astro para todos los grados).

export interface ReglaGrado {
  grado: string;
  diasHabilitados: number[];
  descripcion: string;
  horariosPorDia: Record<number, string[]>; // día de la semana -> horarios
  grupal: boolean;
  maxFamilias?: number;
}

export const REGLAS_POR_GRADO: Record<string, ReglaGrado> = {
  secundaria: {
    grado: 'Secundaria',
    diasHabilitados: [2, 5], // martes, viernes
    descripcion: 'martes (8:00 am, 10:00 am, 12:00 m) y viernes (11:00 am, 1:00 pm)',
    horariosPorDia: {
      2: ['8:00 a.m.', '10:00 a.m.', '12:00 m'],
      5: ['11:00 a.m.', '1:00 p.m.'],
    },
    grupal: false,
  },
  transicion: {
    grado: 'Transición',
    diasHabilitados: [3], // miércoles
    descripcion: 'miércoles, 7:30 am (reunión grupal, máx. 5 familias)',
    horariosPorDia: { 3: ['7:30 a.m.'] },
    grupal: true,
    maxFamilias: 5,
  },
  primaria: {
    grado: 'Primaria',
    diasHabilitados: [5], // viernes
    descripcion: 'viernes, 7:30 am (reunión grupal, máx. 5 familias)',
    horariosPorDia: { 5: ['7:30 a.m.'] },
    grupal: true,
    maxFamilias: 5,
  },
};

// El grado específico al que aspira (el que se termina mostrando en la
// tabla de secretaría, ej. "4° Primaria", "7° Secundaria") es distinto del
// nivel que arriba define los días/horarios de la cita — un mismo nivel
// ("Secundaria") agrupa varios grados que comparten agenda. Esta lista es
// la que llena el segundo selector del formulario de cita, según el nivel
// elegido en el primero.
export const GRADOS_POR_NIVEL: Record<string, string[]> = {
  transicion: ['Transición'],
  primaria: ['1° Primaria', '2° Primaria', '3° Primaria', '4° Primaria', '5° Primaria'],
  secundaria: [
    '6° Secundaria',
    '7° Secundaria',
    '8° Secundaria',
    '9° Secundaria',
    '10° Secundaria',
    '11° Secundaria',
  ],
};
