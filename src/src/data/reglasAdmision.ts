// Reglas para armar el mensaje automático de bienvenida.
// El nombre y el grado siempre salen de los datos del aspirante — lo
// único que hay que "calcular" es el año lectivo que se menciona,
// porque depende de si el cupo es NUEVO o es un TRASLADO:
//
// - Cupos NUEVOS: solo se reciben de agosto a febrero del año
//   siguiente, y siempre apuntan al año lectivo que empieza en enero
//   de ese "año siguiente".
// - TRASLADOS de otras instituciones: se reciben todo el año, y entran
//   al año lectivo que ya está en curso.
//
// TODO(servidor): tipoProceso hoy es un dato de ejemplo; en la
// conexión real debería venir de Q10 (o de lo que el acudiente marcó
// al iniciar el proceso: "cupo nuevo" vs "traslado").

export type TipoProceso = 'nuevo' | 'traslado';

export function calcularAnioLectivo(tipo: TipoProceso, fecha: Date = new Date()): number {
  const mes = fecha.getMonth() + 1; // getMonth() da 0-11, lo pasamos a 1-12
  const anioActual = fecha.getFullYear();

  if (tipo === 'traslado') {
    // Un traslado entra al año lectivo que ya está corriendo.
    return anioActual;
  }

  // Cupo nuevo. Enero-febrero: se está cerrando el proceso que abrió el
  // agosto anterior, así que todavía apunta a ESTE año.
  if (mes === 1 || mes === 2) {
    return anioActual;
  }

  // Marzo-diciembre: ya se está armando el cupo para el año que viene
  // (la ventana de agosto a diciembre apunta directo al año siguiente,
  // y de marzo a julio -aunque la admisión de nuevos no esté abierta
  // todavía- el próximo año lectivo disponible sigue siendo ese mismo).
  return anioActual + 1;
}

interface DatosMensajeBienvenida {
  nombre: string;
  grado: string;
  tipoProceso: TipoProceso;
}

// La frase sobre cuándo llega la información de inicio de clases depende
// del mes en que se está armando el mensaje (no del año lectivo):
// - Agosto a octubre: todavía falta para noviembre, así que se avisa que
//   llega "en noviembre de <este año>".
// - Noviembre: ya se está en el mes, así que se avisa "este mes".
// - Diciembre a septiembre del año siguiente: fuera de esa ventana, se
//   usa el mensaje genérico que había antes de esta regla ("Pronto...").
function fraseInfoInicioClases(fecha: Date): string {
  const mes = fecha.getMonth() + 1; // 1-12
  const anioActual = fecha.getFullYear();

  if (mes >= 8 && mes <= 10) {
    return `En noviembre de ${anioActual} recibirás la información de inicio de clases.`;
  }
  if (mes === 11) {
    return 'Este mes recibirás la información de inicio de clases.';
  }
  return 'Pronto recibirás la información de inicio de clases.';
}

export function construirMensajeBienvenida(
  datos: DatosMensajeBienvenida,
  fecha: Date = new Date()
): string {
  const anio = calcularAnioLectivo(datos.tipoProceso, fecha);
  return `¡Bienvenido a la familia CEFEG! 🎓 ${datos.nombre} ha sido admitido/a oficialmente en ${datos.grado} para el año ${anio}. ${fraseInfoInicioClases(fecha)}`;
}

interface DatosMensajeRechazo {
  tipoProceso: TipoProceso;
}

// Igual que en el mensaje de bienvenida: el año lectivo que se menciona
// se calcula, nunca se escribe fijo — así el mensaje sigue siendo correcto
// aunque cambie el año en que se esté ejecutando el proceso.
export function construirMensajeRechazo(
  datos: DatosMensajeRechazo,
  fecha: Date = new Date()
): string {
  const anio = calcularAnioLectivo(datos.tipoProceso, fecha);
  return `Gracias por confiar en el Colegio Cristiano CEFEG. En respuesta a la solicitud de cupo para el año lectivo ${anio}, el Comité de Admisiones informa que no fue posible asignar el cupo en esta oportunidad.`;
}
