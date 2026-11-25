// Guía de orientación. No reemplaza la asesoría legal de la central.

export type Enlace = { texto: string; href: string };

export type Resultado = {
  titulo: string;
  texto: string;
  pasos: string[];
  enlaces: Enlace[];
};

export type Opcion = { texto: string; siguiente?: string; resultado?: Resultado };
export type Paso = { pregunta: string; opciones: Opcion[] };

const asesoria = { texto: 'Solicitar asesoría', href: '/intranet/tickets' };
const afiliacion = { texto: 'Ir a Afiliación', href: '/afiliacion' };

export const guia: Record<string, Paso> = {
  inicio: {
    pregunta: '¿Qué necesitas hoy?',
    opciones: [
      { texto: 'Tengo un problema en mi trabajo', siguiente: 'problema' },
      { texto: 'Quiero organizarme o afiliarme', siguiente: 'organizar' },
      { texto: 'Estamos negociando con la empresa', siguiente: 'negociar' },
      { texto: 'Mi organización tiene un trámite', siguiente: 'tramite' },
    ],
  },
  problema: {
    pregunta: '¿Qué tipo de problema tienes?',
    opciones: [
      { texto: 'Me despidieron o me hostilizan', siguiente: 'despido' },
      { texto: 'Hubo un accidente o hay un peligro', resultado: {
        titulo: 'Protege primero a las personas',
        texto: 'Ante un peligro inminente deben existir instrucciones para interrumpir las actividades. No se reanudan mientras el riesgo no se controle (art. 63 de la Ley 29783).',
        pasos: ['Ponte a salvo y pide atención médica si hace falta.', 'Avisa a tu jefatura y al comité o supervisor de SST.', 'Conserva fotos, nombres y fechas.', 'Pide asesoría a tu organización.'],
        enlaces: [{ texto: 'Curso de Seguridad y Salud', href: '/intranet/campus/seguridad-salud-trabajo' }, asesoria],
      } },
      { texto: 'Sufro hostigamiento sexual', resultado: {
        titulo: 'No estás sola ni solo',
        texto: 'El hostigamiento sexual es una forma de violencia. No se requiere probar que lo rechazaste ni que se repitió (art. 4 de la Ley 27942).',
        pasos: ['Busca a una persona de confianza.', 'Guarda mensajes, fechas y nombres de testigos.', 'Usa el canal de denuncia de tu centro de trabajo.', 'Pide acompañamiento confidencial a tu organización.'],
        enlaces: [{ texto: 'Conoce tus derechos', href: '/intranet/campus/liderazgo-equidad-genero' }, asesoria],
      } },
      { texto: 'Me pagan menos por el mismo trabajo', resultado: {
        titulo: 'Igual remuneración por igual trabajo',
        texto: 'La Ley 30709 prohíbe la discriminación remunerativa entre varones y mujeres. SUNAFIL fiscaliza su cumplimiento.',
        pasos: ['Reúne tus boletas y la descripción de tu puesto.', 'Compara funciones y categoría, no solo el sueldo.', 'Pide orientación antes de reclamar.'],
        enlaces: [{ texto: 'Curso de Equidad de Género', href: '/intranet/campus/liderazgo-equidad-genero' }, asesoria],
      } },
    ],
  },
  despido: {
    pregunta: '¿Tienes sindicato o estás afiliado a la central?',
    opciones: [
      { texto: 'Sí', resultado: {
        titulo: 'Actúa cuanto antes',
        texto: 'Los plazos para reclamar son cortos. Si eres dirigente o miembro de un sindicato en formación, también podrías tener fuero sindical (arts. 30 y 31 del TUO).',
        pasos: ['Guarda tu carta de despido, contrato y boletas.', 'Escribe qué ocurrió, con fechas.', 'Avisa hoy a tu junta directiva.', 'Solicita asesoría por la intranet.'],
        enlaces: [asesoria, { texto: 'Qué es el fuero sindical', href: '/intranet/campus/nuevos-cuadros-sindicales' }],
      } },
      { texto: 'No', resultado: {
        titulo: 'Busca orientación ahora',
        texto: 'Los plazos para reclamar son cortos. Puedes afiliarte de forma individual y también acudir a la Autoridad de Trabajo o a SUNAFIL.',
        pasos: ['Guarda tu carta de despido, contrato y boletas.', 'Escribe qué ocurrió, con fechas.', 'Consulta a la Autoridad de Trabajo de tu región.', 'Considera la afiliación individual.'],
        enlaces: [afiliacion],
      } },
    ],
  },
  organizar: {
    pregunta: '¿Qué quieres hacer?',
    opciones: [
      { texto: 'Formar un sindicato', siguiente: 'cantidad' },
      { texto: 'Afiliar a mi organización', resultado: {
        titulo: 'Afiliación institucional',
        texto: 'Corresponde a organizaciones sindicales y asociativas de primer y segundo grado y de rama de actividad (art. 10 del Estatuto).',
        pasos: ['Reúne los 8 documentos del art. 10.', 'Aprueba la afiliación en asamblea.', 'Completa el formulario en línea.'],
        enlaces: [afiliacion, { texto: 'Ver el Estatuto', href: '/estatuto' }],
      } },
      { texto: 'Afiliarme de forma individual', resultado: {
        titulo: 'Afiliación individual',
        texto: 'Es personal, voluntaria y libre de los requisitos institucionales (art. 11 del Estatuto).',
        pasos: ['Completa la Ficha de Afiliación Individual.', 'Únete a tu Comité Especial.', 'Empieza tu formación en la Escuela Sindical.'],
        enlaces: [afiliacion],
      } },
    ],
  },
  cantidad: {
    pregunta: '¿Cuántas personas trabajan en tu empresa?',
    opciones: [
      { texto: '20 o más', resultado: {
        titulo: 'Pueden formar un sindicato de empresa',
        texto: 'Se necesitan al menos 20 trabajadores afiliados (art. 14 del TUO). Quienes formen el sindicato tienen fuero desde la solicitud de registro y hasta 3 meses después (art. 31).',
        pasos: ['Reúnanse y definan objetivos.', 'Convoquen la asamblea de constitución.', 'Aprueben el estatuto y elijan la junta directiva.', 'Registren el sindicato ante la Autoridad de Trabajo.'],
        enlaces: [{ texto: 'Usar modelo de acta', href: '/intranet/modelos' }, { texto: 'Curso de Nuevos Cuadros', href: '/intranet/campus/nuevos-cuadros-sindicales' }],
      } },
      { texto: 'Menos de 20', resultado: {
        titulo: 'Pueden elegir 2 delegados',
        texto: 'Si no alcanzan el mínimo, pueden elegir 2 delegados que los representen ante el empleador y la Autoridad de Trabajo (art. 15 del TUO).',
        pasos: ['Elijan a sus dos delegados.', 'Comuníquenlo al empleador y a la Autoridad de Trabajo en 5 días hábiles.', 'Consideren la afiliación individual a la central.'],
        enlaces: [{ texto: 'Usar modelo de acta', href: '/intranet/modelos' }, afiliacion],
      } },
    ],
  },
  negociar: {
    pregunta: '¿En qué etapa están?',
    opciones: [
      { texto: 'Preparando el pliego', resultado: {
        titulo: 'Prepara y presenta a tiempo',
        texto: 'El pliego debe presentarse entre 60 y 30 días calendario antes del vencimiento de la convención vigente (art. 52 del TUO).',
        pasos: ['Consulta a tus bases.', 'Redacta el proyecto de convención.', 'Apruébalo en asamblea.', 'Preséntalo a la empresa con copia a la Autoridad de Trabajo.'],
        enlaces: [{ texto: 'Usar modelo de carta', href: '/intranet/modelos' }, { texto: 'Curso de Pliegos', href: '/intranet/campus/derechos-laborales-pliegos' }],
      } },
      { texto: 'En trato directo o conciliación', resultado: {
        titulo: 'Negocia con respaldo',
        texto: 'Puedes pedir información económica y financiera de la empresa (art. 55 del TUO). Sin acuerdo, se puede ir a arbitraje o declarar huelga (arts. 61 y 62).',
        pasos: ['Solicita la información de la empresa.', 'Levanta acta de los acuerdos.', 'Pide acompañamiento de la Secretaría de Defensa.'],
        enlaces: [{ texto: 'Usar modelo de solicitud', href: '/intranet/modelos' }, asesoria],
      } },
    ],
  },
  tramite: {
    pregunta: '¿Qué trámite necesitas?',
    opciones: [
      { texto: 'Declarar cuotas', resultado: {
        titulo: 'Declara tus cuotas',
        texto: 'Las cuotas se abonan en la primera quincena del mes siguiente a la recaudación, adjuntando la nómina de cotizantes (art. 12 del Estatuto).',
        pasos: ['Calcula el monto en la intranet.', 'Realiza el abono.', 'Adjunta voucher y nómina.'],
        enlaces: [{ texto: 'Ir a Pago de Cuotas', href: '/intranet/pagos' }],
      } },
      { texto: 'Ver fechas importantes', resultado: {
        titulo: 'Tu calendario sindical',
        texto: 'Consulta los próximos vencimientos y agrégalos a tu calendario personal.',
        pasos: ['Revisa los plazos.', 'Descarga las fechas a tu celular.'],
        enlaces: [{ texto: 'Abrir Calendario', href: '/intranet/calendario' }],
      } },
      { texto: 'Actualizar datos de mi organización', resultado: {
        titulo: 'Mantén tu expediente al día',
        texto: 'No actualizar la documentación suspende automáticamente los derechos de afiliación (art. 13 del Estatuto).',
        pasos: ['Revisa tu junta directiva y padrón.', 'Envía los cambios a la Secretaría de Organización.'],
        enlaces: [{ texto: 'Solicitar apoyo', href: '/intranet/tickets' }],
      } },
    ],
  },
};
