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
  jardin: {
    grado: 'Jardín',
    // Jardín se recibe todo el año (ver GRADOS_SIN_VENTANA en cita.astro),
    // pero cuando sí hay cupo de cita, sigue el mismo día/horario grupal
    // que Transición.
    diasHabilitados: [3], // miércoles
    descripcion: 'miércoles, 7:30 am (reunión grupal, máx. 5 familias) — se recibe todo el año',
    horariosPorDia: { 3: ['7:30 a.m.'] },
    grupal: true,
    maxFamilias: 5,
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
};

// El grado específico al que aspira (el que se termina mostrando en la
// tabla de secretaría, ej. "4°", "7°") es distinto del nivel que arriba
// define los días/horarios de la cita — un mismo nivel ("Secundaria")
// agrupa varios grados que comparten agenda. Esta lista es la que llena el
// segundo selector del formulario de cita, según el nivel elegido en el
// primero. Jardín y Transición no tienen grados específicos (son un único
// grado cada uno), así que ese segundo selector se oculta para esos dos
// niveles — ver NIVELES_SIN_GRADO_ESPECIFICO.
export const GRADOS_POR_NIVEL: Record<string, string[]> = {
  jardin: ['Jardín'],
  transicion: ['Transición'],
  primaria: ['1°', '2°', '3°', '4°', '5°'],
  secundaria: ['6°', '7°', '8°', '9°', '10°', '11°'],
};

// Niveles donde no tiene sentido mostrar el selector de "grado específico"
// porque el nivel completo es un único grado.
export const NIVELES_SIN_GRADO_ESPECIFICO = ['jardin', 'transicion'];

// Nivel(es) que se reciben en cualquier momento del año — sin la ventana
// de fechas que aplica a los demás según sean cupo nuevo o traslado (ver
// calcularRangoElegible en cita.astro).
export const NIVELES_SIN_VENTANA_DE_FECHAS = ['jardin'];
