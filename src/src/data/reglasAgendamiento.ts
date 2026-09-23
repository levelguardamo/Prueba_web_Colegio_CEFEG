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
