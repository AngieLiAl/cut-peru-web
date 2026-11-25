// Modelos orientativos. Deben revisarse con la asesoría legal antes de usarse.

export type Modelo = {
  id: string;
  titulo: string;
  descripcion: string;
  campos: { id: string; etiqueta: string }[];
  plantilla: (datos: Record<string, string>) => string;
};

const valor = (datos: Record<string, string>, id: string, marcador: string) => datos[id]?.trim() || `[${marcador}]`;

export const modelos: Modelo[] = [
  {
    id: 'convocatoria',
    titulo: 'Convocatoria a asamblea',
    descripcion: 'Comunica fecha, lugar y agenda a tus bases.',
    campos: [
      { id: 'organizacion', etiqueta: 'Organización' },
      { id: 'fecha', etiqueta: 'Fecha y hora' },
      { id: 'lugar', etiqueta: 'Lugar' },
      { id: 'agenda', etiqueta: 'Agenda' },
      { id: 'firma', etiqueta: 'Quien convoca' },
    ],
    plantilla: (d) => `CONVOCATORIA A ASAMBLEA

${valor(d, 'organizacion', 'ORGANIZACIÓN')}

Se convoca a todos los afiliados y afiliadas a la asamblea que se realizará:

Fecha y hora: ${valor(d, 'fecha', 'FECHA Y HORA')}
Lugar: ${valor(d, 'lugar', 'LUGAR')}

Agenda:
${valor(d, 'agenda', 'AGENDA')}

Se solicita puntual asistencia.

${valor(d, 'firma', 'NOMBRE Y CARGO')}`,
  },
  {
    id: 'acta',
    titulo: 'Acta de asamblea',
    descripcion: 'Registra asistencia, quórum y acuerdos.',
    campos: [
      { id: 'organizacion', etiqueta: 'Organización' },
      { id: 'fecha', etiqueta: 'Fecha, hora y lugar' },
      { id: 'asistentes', etiqueta: 'Número de asistentes' },
      { id: 'presidio', etiqueta: 'Quien dirigió' },
      { id: 'acuerdos', etiqueta: 'Acuerdos adoptados' },
    ],
    plantilla: (d) => `ACTA DE ASAMBLEA

Organización: ${valor(d, 'organizacion', 'ORGANIZACIÓN')}
Fecha, hora y lugar: ${valor(d, 'fecha', 'FECHA, HORA Y LUGAR')}

Con la asistencia de ${valor(d, 'asistentes', 'NÚMERO')} afiliados y afiliadas, verificado el quórum conforme al estatuto, se dio inicio a la asamblea, dirigida por ${valor(d, 'presidio', 'NOMBRE Y CARGO')}.

ACUERDOS:
${valor(d, 'acuerdos', 'ACUERDOS Y RESULTADO DE LA VOTACIÓN')}

No habiendo más puntos que tratar, se levantó la sesión, firmando los presentes en señal de conformidad.

______________________          ______________________
Firma                           Firma`,
  },
  {
    id: 'pliego',
    titulo: 'Carta de presentación del pliego',
    descripcion: 'Acompaña el proyecto de convención colectiva.',
    campos: [
      { id: 'ciudad', etiqueta: 'Ciudad y fecha' },
      { id: 'empresa', etiqueta: 'Empresa' },
      { id: 'organizacion', etiqueta: 'Organización' },
      { id: 'periodo', etiqueta: 'Período de la convención' },
      { id: 'firma', etiqueta: 'Representantes' },
    ],
    plantilla: (d) => `${valor(d, 'ciudad', 'CIUDAD Y FECHA')}

Señores
${valor(d, 'empresa', 'EMPRESA')}
Presente.

Asunto: Presentación de pliego de reclamos ${valor(d, 'periodo', 'PERÍODO')}

De nuestra consideración:

${valor(d, 'organizacion', 'ORGANIZACIÓN')}, debidamente representada, presenta el pliego de reclamos que contiene el proyecto de convención colectiva aprobado en asamblea, conforme a los artículos 51 y siguientes del TUO de la Ley de Relaciones Colectivas de Trabajo.

Solicitamos iniciar la negociación dentro de los diez días calendario de presentado el pliego, según el artículo 57 de la norma citada. Se remite copia a la Autoridad de Trabajo.

Atentamente,

${valor(d, 'firma', 'NOMBRES Y CARGOS')}`,
  },
  {
    id: 'informacion',
    titulo: 'Solicitud de información económica',
    descripcion: 'Pide datos a la empresa durante la negociación.',
    campos: [
      { id: 'ciudad', etiqueta: 'Ciudad y fecha' },
      { id: 'empresa', etiqueta: 'Empresa' },
      { id: 'organizacion', etiqueta: 'Organización' },
      { id: 'informacion', etiqueta: 'Información solicitada' },
      { id: 'firma', etiqueta: 'Representantes' },
    ],
    plantilla: (d) => `${valor(d, 'ciudad', 'CIUDAD Y FECHA')}

Señores
${valor(d, 'empresa', 'EMPRESA')}
Presente.

Asunto: Solicitud de información para la negociación colectiva

De nuestra consideración:

${valor(d, 'organizacion', 'ORGANIZACIÓN')}, al amparo del artículo 55 del TUO de la Ley de Relaciones Colectivas de Trabajo, solicita la siguiente información sobre la situación económica, financiera y social de la empresa:

${valor(d, 'informacion', 'DETALLE DE LA INFORMACIÓN')}

La información será utilizada únicamente para los fines de la negociación colectiva.

Atentamente,

${valor(d, 'firma', 'NOMBRES Y CARGOS')}`,
  },
];
