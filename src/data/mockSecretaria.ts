// Datos de ejemplo para el panel interno de secretaría.
//
// Antes esta lista vivía separada de mockData.ts (el portal del padre
// tenía su propia lista de aspirantes, con nombres/radicados parecidos
// pero sin ningún campo que los conectara). Eso hacía imposible una
// interconexión real: un cambio hecho aquí no tenía forma de saber a
// cuál aspirante del portal correspondía.
//
// Ahora secretaría lee del MISMO arreglo que usa el portal del padre
// (aspirantesEjemplo, en mockData.ts), identificado por `token` — el
// mismo token que se usa en /admisiones/seguimiento/<token>. Por eso la
// tabla de secretaría hoy solo muestra 3 aspirantes en vez de 5: son los
// que también existen como ejemplo en el portal del padre. Al conectar
// esto con la base de datos real, ambos paneles van a leer de la misma
// tabla y este problema desaparece solo.
//
// TODO(servidor): reemplazar por una consulta autenticada a la API
// propia (que agrega datos de Q10) — esta página debe quedar detrás de
// un login real de secretaría, distinto del acceso ligero de los padres.
import { aspirantesEjemplo } from './mockData';
import type { Aspirante, PasoManual } from './types';

export type { PasoManual };
export type FilaAspirante = Aspirante;

export const aspirantesTabla: Aspirante[] = aspirantesEjemplo;
