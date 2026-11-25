// Cursos de la Escuela Sindical. Contenido educativo basado en las fuentes citadas en cada curso.
// No reemplaza la asesoría legal; verificar la vigencia de las normas antes de cada edición.

export type Bloque =
  | { tipo: 'texto'; texto: string }
  | { tipo: 'clave'; texto: string }
  | { tipo: 'lista'; titulo: string; items: string[] }
  | { tipo: 'pasos'; titulo: string; items: string[] }
  | { tipo: 'caso'; titulo: string; texto: string; solucion: string };

export type Pregunta = {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
};

export type Video = { id: string; titulo: string; canal: string };

export type Leccion = {
  id: string;
  titulo: string;
  minutos: number;
  objetivo: string;
  bloques: Bloque[];
  video?: Video;
  evaluacion: Pregunta[];
};

export type Curso = {
  slug: string;
  titulo: string;
  categoria: string;
  fondo: string;
  descripcion: string;
  lecciones: Leccion[];
  fuentes: { titulo: string; url: string }[];
};

const fuenteLrct = { titulo: 'TUO de la Ley de Relaciones Colectivas de Trabajo, D.S. 010-2003-TR', url: 'https://www2.congreso.gob.pe/sicr/cendocbib/con6_uibd.nsf/E77379ABF039FB1705258A750060B5AB/$FILE/DS_010-2003-TR.pdf' };
const fuenteSst = { titulo: 'Ley 29783, Ley de Seguridad y Salud en el Trabajo', url: 'https://www.onpsctr.gob.pe/DocumentosComunes/1)%20Ley%20SST%2029783%20-%20Ley%20de%20Seguridad%20y%20Salud%20en%20el%20Trabajo.pdf' };

export const cursos: Curso[] = [
  {
    slug: 'nuevos-cuadros-sindicales',
    titulo: 'Formación de Nuevos Cuadros Sindicales',
    categoria: 'Liderazgo',
    fondo: 'from-tinta to-violeta',
    descripcion: 'Las bases para liderar: trabajo decente, libertad sindical, estructura de la central y cómo conducir una asamblea.',
    fuentes: [
      { titulo: 'OIT: ¿Qué es el trabajo decente?', url: 'https://www.ilo.org/es/resource/news/que-es-el-trabajo-decente' },
      { titulo: 'OIT: Los convenios fundamentales', url: 'https://www.ilo.org/es/media/316461/download' },
      fuenteLrct,
      { titulo: 'Estatuto de la CUT PERÚ', url: '/estatuto' },
    ],
    lecciones: [
      {
        id: 'trabajo-decente',
        titulo: 'Qué es el trabajo decente',
        minutos: 15,
        objetivo: 'Explicar con tus palabras qué es el trabajo decente y reconocer sus cuatro pilares.',
        video: { id: 'sPseJc7R3I0', titulo: '¿Cuál es el mandato de la OIT en relación con el trabajo decente?', canal: 'Organización Internacional del Trabajo' },
        bloques: [
          { tipo: 'texto', texto: 'El trabajo decente es mucho más que tener empleo. La Organización Internacional del Trabajo (OIT) usa este concepto, presentado en 1999, para describir un trabajo que dignifica a la persona y le permite desarrollar sus capacidades.' },
          { tipo: 'lista', titulo: 'Los cuatro pilares', items: ['Derechos en el trabajo: se respetan los derechos fundamentales.', 'Oportunidades de empleo: hay trabajo productivo con ingreso justo.', 'Protección social: existe cobertura frente a riesgos como enfermedad o vejez.', 'Diálogo social: trabajadores, empleadores y gobierno conversan y negocian.'] },
          { tipo: 'clave', texto: 'Si falta uno de los pilares, el trabajo aún no es decente. Por ejemplo, un buen sueldo sin derecho a organizarse no cumple el concepto.' },
          { tipo: 'caso', titulo: 'Analiza el caso', texto: 'Rosa gana más que el salario mínimo, pero no tiene seguro de salud y la despidieron a una compañera por proponer un sindicato. ¿Qué pilares están fallando?', solucion: 'Fallan la protección social (no tiene seguro) y los derechos en el trabajo (se castiga la libertad sindical). También se debilita el diálogo social.' },
        ],
        evaluacion: [
          { pregunta: '¿Cuál de estos NO es uno de los cuatro pilares del trabajo decente?', opciones: ['Diálogo social', 'Protección social', 'Publicidad de la empresa', 'Derechos en el trabajo'], correcta: 2, explicacion: 'Los pilares son derechos, empleo, protección social y diálogo social.' },
          { pregunta: 'Un trabajo con buen sueldo, pero sin libertad para organizarse, ¿es trabajo decente?', opciones: ['Sí, porque el sueldo es lo único importante', 'No, porque vulnera derechos fundamentales', 'Sí, si el contrato es indefinido'], correcta: 1, explicacion: 'El ingreso justo no compensa la falta de derechos fundamentales.' },
        ],
      },
      {
        id: 'libertad-sindical',
        titulo: 'Libertad sindical y fuero sindical',
        minutos: 20,
        objetivo: 'Conocer qué protege la libertad sindical y qué requisitos existen para formar un sindicato.',
        video: { id: 'kQbfvDfFs-I', titulo: 'La Libertad Sindical: Un derecho fundamental', canal: 'OIT San José' },
        bloques: [
          { tipo: 'texto', texto: 'La libertad sindical es el derecho de organizarte para defender tus intereses. El Convenio 87 de la OIT reconoce el derecho a constituir organizaciones y afiliarse a ellas sin autorización previa. El Convenio 98 protege frente a la discriminación antisindical y promueve la negociación colectiva.' },
          { tipo: 'lista', titulo: 'Lo que dice la ley peruana', items: ['Un sindicato de empresa necesita al menos 20 trabajadores afiliados (art. 14 del TUO).', 'Los sindicatos de otra naturaleza necesitan al menos 50 (art. 14).', 'Si la empresa no llega al mínimo, se pueden elegir 2 delegados (art. 15).', 'No se puede pertenecer a dos sindicatos del mismo ámbito (art. 12).'] },
          { tipo: 'clave', texto: 'El fuero sindical protege a determinados trabajadores de ser despedidos o trasladados sin justa causa demostrada o sin su aceptación (art. 30).' },
          { tipo: 'lista', titulo: '¿Quiénes tienen fuero sindical? (art. 31)', items: ['Miembros de sindicatos en formación, desde la solicitud de registro y hasta 3 meses después.', 'Miembros de la junta directiva, en los cargos que señale el estatuto.', 'Delegados elegidos en empresas que no alcanzan el mínimo para un sindicato.'] },
          { tipo: 'caso', titulo: 'Analiza el caso', texto: 'En una empresa de 12 trabajadores quieren organizarse. ¿Pueden formar un sindicato de empresa?', solucion: 'No, porque se requieren 20 afiliados. Pero pueden elegir 2 delegados que los representen ante el empleador y la Autoridad de Trabajo, y comunicar la elección dentro de 5 días hábiles.' },
        ],
        evaluacion: [
          { pregunta: '¿Cuántos afiliados necesita como mínimo un sindicato de empresa?', opciones: ['10', '20', '50', '100'], correcta: 1, explicacion: 'El art. 14 del TUO exige 20 para sindicatos de empresa.' },
          { pregunta: '¿Qué garantiza el fuero sindical?', opciones: ['Un aumento de sueldo automático', 'No ser despedido ni trasladado sin justa causa demostrada o sin aceptación', 'Trabajar menos horas'], correcta: 1, explicacion: 'Así lo señala el art. 30 del TUO.' },
          { pregunta: 'Una empresa tiene 10 trabajadores. ¿Qué opción de representación tienen?', opciones: ['Ninguna', 'Elegir 2 delegados', 'Formar un sindicato de empresa'], correcta: 1, explicacion: 'El art. 15 permite elegir dos delegados.' },
        ],
      },
      {
        id: 'estructura-cut',
        titulo: 'Cómo funciona nuestra central',
        minutos: 15,
        objetivo: 'Ubicar a tu organización dentro de la estructura de la CUT PERÚ.',
        bloques: [
          { tipo: 'lista', titulo: 'Grados de organización sindical', items: ['Primer grado: sindicatos de base.', 'Segundo grado: federaciones.', 'Tercer grado: confederaciones y centrales, como la CUT PERÚ.'] },
          { tipo: 'pasos', titulo: 'Quién decide en la central', items: ['Congreso Nacional: órgano supremo, cada cuatro años.', 'Consejo Directivo Nacional: máximo organismo entre congresos, dos sesiones ordinarias al año.', 'Comité Ejecutivo Nacional: dirección permanente, con 21 cargos.', 'CUT Sectoriales y Territoriales: llevan la acción a sectores y regiones.'] },
          { tipo: 'clave', texto: 'Los derechos de afiliación se suspenden automáticamente si no se actualiza la documentación o se adeuda la cuota (art. 13 del Estatuto). Mantenerse al día protege a tu base.' },
          { tipo: 'caso', titulo: 'Practica el cálculo', texto: 'Tu sindicato sectorial de primer grado tiene 280 afiliados. ¿Cuántos delegados plenos le corresponden al Congreso?', solucion: 'Le corresponden 3: uno por los primeros 100 afiliados, uno por los siguientes 100 y uno más por la fracción de 80, que es mayor de 50 (art. 18 del Estatuto).' },
        ],
        evaluacion: [
          { pregunta: '¿Cuál es el órgano supremo de la central?', opciones: ['El CEN', 'El Congreso Nacional', 'La CUT Regional'], correcta: 1, explicacion: 'Art. 15 del Estatuto.' },
          { pregunta: '¿Qué ocurre si una organización adeuda la cuota sindical?', opciones: ['Nada', 'Se suspenden automáticamente los derechos de afiliación', 'Se disuelve el sindicato'], correcta: 1, explicacion: 'Art. 13, inciso c del Estatuto.' },
        ],
      },
      {
        id: 'asambleas-oratoria',
        titulo: 'Conducir una asamblea y hablar en público',
        minutos: 20,
        objetivo: 'Preparar una asamblea ordenada y un mensaje claro para tus bases.',
        bloques: [
          { tipo: 'pasos', titulo: 'Una asamblea en seis pasos', items: ['Convoca según tu estatuto, con fecha, hora, lugar y agenda.', 'Verifica el quórum y regístralo.', 'Lee la agenda y fija tiempos de intervención.', 'Da la palabra por orden y modera con respeto.', 'Vota cada acuerdo y cuenta los votos en voz alta.', 'Registra los acuerdos en el acta y publica los responsables.'] },
          { tipo: 'lista', titulo: 'Fórmula para un mensaje claro', items: ['Empieza con el problema, en una frase.', 'Muestra un dato o un caso real.', 'Propón una solución concreta.', 'Termina diciendo qué esperas de tu público.'] },
          { tipo: 'clave', texto: 'Quien dirige no gana discusiones: ayuda a que la asamblea decida. Escucha primero, resume lo dicho y lleva el debate a una decisión.' },
          { tipo: 'caso', titulo: 'Practica', texto: 'Tienes 2 minutos para convencer a tu asamblea de crear un fondo de solidaridad. Escribe tu mensaje con la fórmula de cuatro partes.', solucion: 'Ejemplo: «Cuando un compañero enferma, nos quedamos sin cómo ayudarlo. El año pasado pasó tres veces. Propongo un fondo de aportes voluntarios. Hoy les pido votar por crear una comisión que lo organice.»' },
        ],
        evaluacion: [
          { pregunta: '¿Qué debe verificarse antes de tomar acuerdos?', opciones: ['El quórum', 'El clima', 'La publicidad'], correcta: 0, explicacion: 'Sin quórum, los acuerdos pueden ser cuestionados.' },
          { pregunta: '¿Cuál es el papel principal de quien dirige una asamblea?', opciones: ['Hablar la mayor parte del tiempo', 'Ayudar a que la asamblea decida ordenadamente', 'Evitar las votaciones'], correcta: 1, explicacion: 'La dirección facilita la decisión colectiva.' },
        ],
      },
    ],
  },
  {
    slug: 'derechos-laborales-pliegos',
    titulo: 'Derechos Laborales y Pliegos de Reclamos',
    categoria: 'Legal',
    fondo: 'from-rojo to-rojo-oscuro',
    descripcion: 'De la idea al acuerdo: cómo preparar un pliego, negociar y conocer las reglas de la huelga.',
    fuentes: [
      fuenteLrct,
      { titulo: 'Constitución Política del Perú, artículo 28', url: 'https://leyes.congreso.gob.pe/Documentos/constituciones_ordenado/CONSTIT_1993/Texto_actualizado_CONS_1993.pdf' },
    ],
    lecciones: [
      {
        id: 'convencion-colectiva',
        titulo: 'La convención colectiva',
        minutos: 15,
        objetivo: 'Comprender qué es una convención colectiva y por qué tiene tanta fuerza.',
        video: { id: 'JLpNWkM6Y1U', titulo: '¿Cómo entender la creación de un sindicato y la negociación colectiva?', canal: 'LP - Pasión por el Derecho' },
        bloques: [
          { tipo: 'texto', texto: 'La Constitución reconoce los derechos de sindicación, negociación colectiva y huelga (art. 28). La convención colectiva es el acuerdo que regula remuneraciones, condiciones de trabajo y productividad entre trabajadores y empleadores (art. 41 del TUO).' },
          { tipo: 'lista', titulo: 'Por qué es tan importante', items: ['Tiene fuerza vinculante para las partes (art. 42).', 'Modifica de pleno derecho la relación de trabajo (art. 43).', 'Los contratos individuales se adaptan y no pueden empeorarla (art. 43).', 'Alcanza también a quienes se incorporen después, salvo puestos de dirección o confianza (art. 42).'] },
          { tipo: 'clave', texto: 'A falta de acuerdo sobre su duración, la convención dura un año (art. 43).' },
        ],
        evaluacion: [
          { pregunta: 'Si un contrato individual empeora lo pactado en la convención, ¿qué sucede?', opciones: ['Prevalece el contrato', 'El contrato queda adaptado a la convención', 'Se anula la convención'], correcta: 1, explicacion: 'Art. 43 inciso a: los contratos no pueden contener disposiciones contrarias en perjuicio del trabajador.' },
          { pregunta: '¿Cuánto dura una convención si no se pacta su duración?', opciones: ['6 meses', '1 año', '3 años'], correcta: 1, explicacion: 'A falta de acuerdo, dura un año.' },
        ],
      },
      {
        id: 'preparar-pliego',
        titulo: 'Cómo preparar el pliego de reclamos',
        minutos: 25,
        objetivo: 'Elaborar un pliego ordenado y presentarlo dentro del plazo legal.',
        video: { id: '6cusQYbqVgU', titulo: 'Negociación colectiva: pliego de reclamos', canal: 'LP - Pasión por el Derecho' },
        bloques: [
          { tipo: 'pasos', titulo: 'Ruta de preparación', items: ['Consulta a las bases y recoge sus necesidades.', 'Revisa la convención vigente y la información de la empresa.', 'Prioriza pedidos económicos y de condiciones de trabajo.', 'Redacta el proyecto de convención colectiva.', 'Aprueba el pliego en asamblea y designa a tus representantes.', 'Presenta el pliego a la empresa, con copia a la Autoridad de Trabajo.'] },
          { tipo: 'clave', texto: 'Plazo clave: el pliego debe presentarse no antes de 60 ni después de 30 días calendario previos al vencimiento de la convención vigente (art. 52). Si se presenta tarde, la vigencia se posterga en proporción al retraso.' },
          { tipo: 'lista', titulo: 'Reglas que debes recordar', items: ['La empresa debe recibir el pliego, salvo causa legal o convencional demostrable (art. 54).', 'Si se niega, se entrega a través de la Autoridad de Trabajo (art. 53).', 'Puedes pedir información económica y financiera de la empresa (art. 55).', 'Ambas partes deben negociar de buena fe (art. 54).'] },
          { tipo: 'caso', titulo: 'Calcula el plazo', texto: 'Tu convención vence el 31 de diciembre. ¿Cuál es la ventana para presentar el pliego?', solucion: 'Del 1 de noviembre al 1 de diciembre aproximadamente: entre 60 y 30 días calendario antes del vencimiento. Confirma las fechas exactas con tu asesor.' },
        ],
        evaluacion: [
          { pregunta: '¿Cuándo debe presentarse el pliego?', opciones: ['Cualquier día del año', 'Entre 60 y 30 días calendario antes del vencimiento de la convención', 'Un día antes del vencimiento'], correcta: 1, explicacion: 'Art. 52 del TUO.' },
          { pregunta: 'Si la empresa se niega a recibir el pliego, ¿qué se hace?', opciones: ['Se renuncia a negociar', 'Se entrega a través de la Autoridad de Trabajo', 'Se declara huelga de inmediato'], correcta: 1, explicacion: 'Art. 53 del TUO.' },
        ],
      },
      {
        id: 'etapas-negociacion',
        titulo: 'Etapas de la negociación',
        minutos: 20,
        objetivo: 'Reconocer qué puede pasar desde el trato directo hasta la solución del conflicto.',
        video: { id: 'fJ43mrjj9cA', titulo: 'Conoce los alcances de la ley de negociaciones colectivas en el Estado', canal: 'TVPerú Noticias' },
        bloques: [
          { tipo: 'pasos', titulo: 'Camino de la negociación en el régimen privado', items: ['Trato directo: debe iniciarse dentro de los 10 días calendario de presentado el pliego (art. 57).', 'Fin del trato directo: las partes informan a la Autoridad de Trabajo y pueden pedir conciliación (art. 58).', 'Conciliación: la realiza personal especializado del Ministerio, o personas privadas si las partes acuerdan (art. 59).', 'Sin acuerdo: las partes pueden ir a arbitraje (art. 61) o los trabajadores pueden declarar huelga (art. 62).'] },
          { tipo: 'clave', texto: 'En cada reunión solo es obligatorio levantar acta de los acuerdos adoptados (art. 57). Aun así, conviene dejar constancia de pedidos y ofertas.' },
          { tipo: 'texto', texto: 'Si trabajas en el Estado, la negociación tiene reglas propias: revisa la Ley 31188, Ley de Negociación Colectiva en el Sector Estatal, con tu asesor.' },
        ],
        evaluacion: [
          { pregunta: '¿Cuándo debe iniciarse la negociación directa?', opciones: ['Dentro de 10 días calendario de presentado el pliego', 'Dentro de 3 meses', 'Después de la huelga'], correcta: 0, explicacion: 'Art. 57 del TUO.' },
          { pregunta: 'Sin acuerdo en trato directo o conciliación, ¿qué alternativas existen?', opciones: ['Arbitraje o huelga', 'Solo renunciar', 'Solo esperar un año'], correcta: 0, explicacion: 'Arts. 61 y 62 del TUO.' },
        ],
      },
      {
        id: 'huelga',
        titulo: 'La huelga: requisitos y límites',
        minutos: 20,
        objetivo: 'Identificar los requisitos de una huelga conforme a ley y las modalidades no amparadas.',
        bloques: [
          { tipo: 'texto', texto: 'La huelga es la suspensión colectiva del trabajo acordada mayoritariamente y realizada en forma voluntaria y pacífica, con abandono del centro de trabajo (art. 72 del TUO).' },
          { tipo: 'pasos', titulo: 'Requisitos para declararla (art. 73)', items: ['Que defienda derechos e intereses socioeconómicos o profesionales de los trabajadores.', 'Que la decisión represente la voluntad mayoritaria, con acta refrendada por Notario o, a falta de este, Juez de Paz.', 'Que se comunique al empleador y a la Autoridad de Trabajo con al menos 5 días útiles de antelación, o 10 en servicios públicos esenciales.', 'Que la negociación colectiva no haya sido sometida a arbitraje.'] },
          { tipo: 'lista', titulo: 'Modalidades no amparadas (art. 81)', items: ['Paralización intempestiva.', 'Trabajo a desgano o a ritmo lento.', 'Permanecer dentro del centro de trabajo.', 'Obstruir el ingreso al centro de trabajo.'] },
          { tipo: 'clave', texto: 'La huelga debe ser pacífica, sin violencia sobre personas o bienes (art. 79). Antes de declararla, debe agotarse la negociación directa (art. 75).' },
        ],
        evaluacion: [
          { pregunta: '¿Con cuánta anticipación se comunica una huelga en general?', opciones: ['1 día', '5 días útiles', '30 días'], correcta: 1, explicacion: 'Art. 73 inciso c: 5 días útiles, o 10 en servicios públicos esenciales.' },
          { pregunta: '¿Cuál de estas modalidades NO está amparada?', opciones: ['Huelga comunicada con abandono del centro de trabajo', 'Trabajo a desgano', 'Huelga pacífica aprobada por mayoría'], correcta: 1, explicacion: 'Art. 81 del TUO.' },
          { pregunta: '¿Qué debe agotarse antes de ejercer la huelga?', opciones: ['La negociación directa', 'El presupuesto del sindicato', 'Las vacaciones'], correcta: 0, explicacion: 'Art. 75 del TUO.' },
        ],
      },
    ],
  },
  {
    slug: 'seguridad-salud-trabajo',
    titulo: 'Seguridad y Salud en el Trabajo',
    categoria: 'Salud',
    fondo: 'from-emerald-700 to-teal-800',
    descripcion: 'Tus derechos frente a los riesgos, el comité paritario y qué hacer ante un peligro.',
    fuentes: [
      fuenteSst,
      { titulo: 'Reglamento de la Ley 29783, D.S. 005-2012-TR', url: 'https://cdn.www.gob.pe/uploads/document/file/571763/Decreto_Supremo_N__005-2012-TR.pdf' },
    ],
    lecciones: [
      {
        id: 'principios-sst',
        titulo: 'Principios y derechos básicos',
        minutos: 15,
        objetivo: 'Conocer los principios de la Ley 29783 y lo que puedes exigir.',
        video: { id: 'do9POTLVLWM', titulo: 'Ley 29783 Ley de Seguridad y Salud en el Trabajo - Sunafil', canal: 'YGM Asesores Consultores en SST' },
        bloques: [
          { tipo: 'texto', texto: 'La Ley 29783 busca promover una cultura de prevención. Sus nueve principios incluyen prevención, responsabilidad, cooperación, información y capacitación, gestión integral, atención integral de la salud, consulta y participación, primacía de la realidad y protección.' },
          { tipo: 'lista', titulo: 'El empleador debe', items: ['Garantizar la seguridad y salud en el trabajo (art. 49).', 'Realizar no menos de cuatro capacitaciones al año (art. 35).', 'Entregar copia del reglamento interno de SST (art. 35).', 'Practicar exámenes médicos a su cargo, acordes con los riesgos (art. 49).', 'Dar equipos de protección adecuados cuando el riesgo no pueda eliminarse (art. 60).'] },
          { tipo: 'clave', texto: 'Primacía de la realidad: si los documentos dicen una cosa y la realidad otra, las autoridades optan por lo constatado en la realidad.' },
          { tipo: 'caso', titulo: 'Analiza el caso', texto: 'La empresa muestra listas firmadas de capacitaciones que nunca se dictaron. ¿Qué principio ayuda a los trabajadores?', solucion: 'El principio de primacía de la realidad: ante la discrepancia, la autoridad opta por lo que constate en la realidad.' },
        ],
        evaluacion: [
          { pregunta: '¿Cuántas capacitaciones de SST debe realizar como mínimo el empleador al año?', opciones: ['Una', 'Dos', 'Cuatro', 'Doce'], correcta: 2, explicacion: 'Art. 35 inciso b de la Ley 29783.' },
          { pregunta: '¿Quién asume el costo de los exámenes médicos ocupacionales?', opciones: ['El trabajador', 'El empleador', 'El sindicato'], correcta: 1, explicacion: 'Art. 49 inciso d: están a cargo del empleador.' },
        ],
      },
      {
        id: 'comite-paritario',
        titulo: 'Comité paritario y supervisor',
        minutos: 20,
        objetivo: 'Saber cuándo corresponde un comité, cómo se elige y qué protección tiene.',
        video: { id: 'zf6kGkwOtcY', titulo: 'Funciones y responsabilidades del Comité de Seguridad y Salud en el Trabajo', canal: 'C. Ponciano' },
        bloques: [
          { tipo: 'lista', titulo: 'Reglas principales', items: ['Con 20 o más trabajadores corresponde un comité paritario: igual número de representantes de empleador y trabajadores (art. 29).', 'Con menos de 20, los trabajadores nombran un supervisor (art. 30).', 'Los trabajadores eligen a sus representantes (art. 31).', 'Si hay sindicato, la organización más representativa convoca a las elecciones (art. 31).', 'Con sindicatos mayoritarios, se incorpora un observador sindical (art. 29).'] },
          { tipo: 'clave', texto: 'Los miembros del comité y los supervisores tienen licencia con goce de haber para sus funciones y protección contra el despido incausado, desde seis meses antes y hasta seis meses después del término de su función (art. 32).' },
          { tipo: 'caso', titulo: 'Analiza el caso', texto: 'Un taller de 15 personas no tiene comité y el dueño designó a su sobrino como supervisor. ¿Es correcto?', solucion: 'No. Aunque no corresponde comité por tener menos de 20 trabajadores, el supervisor lo nombran los propios trabajadores (arts. 30 y 31).' },
        ],
        evaluacion: [
          { pregunta: '¿Desde cuántos trabajadores corresponde un comité paritario?', opciones: ['5', '10', '20', '100'], correcta: 2, explicacion: 'Art. 29 de la Ley 29783.' },
          { pregunta: '¿Quién elige a los representantes de los trabajadores?', opciones: ['El gerente', 'Los trabajadores', 'SUNAFIL'], correcta: 1, explicacion: 'Art. 31 de la Ley 29783.' },
        ],
      },
      {
        id: 'riesgos-peligro',
        titulo: 'Riesgos, accidentes y peligro inminente',
        minutos: 20,
        objetivo: 'Actuar correctamente ante riesgos, peligros inminentes y accidentes.',
        video: { id: 'fQhTxStV37Q', titulo: 'Comité de Seguridad y Salud - SUNAFIL (Ley 29783) - Módulo 1', canal: 'SOLUTION QHSE' },
        bloques: [
          { tipo: 'pasos', titulo: 'Jerarquía de prevención', items: ['Eliminar el riesgo en su origen (art. 50).', 'Controlar con sistemas lo que no se pueda eliminar (art. 50).', 'Proporcionar equipos de protección adecuados y verificar su uso (art. 60).'] },
          { tipo: 'clave', texto: 'Ante un peligro inminente que sea un riesgo importante o intolerable, deben existir instrucciones para interrumpir las actividades e incluso abandonar el lugar. No se reanuda mientras el riesgo no se reduzca o controle (art. 63).' },
          { tipo: 'pasos', titulo: 'Si ocurre un accidente', items: ['Pon a salvo a las personas y pide atención médica.', 'Avisa de inmediato a tu jefatura y al comité o supervisor.', 'Conserva evidencias: fotos, nombres y lugar.', 'Participa en la investigación de causas (art. 42).', 'Haz seguimiento a las medidas correctivas.'] },
          { tipo: 'lista', titulo: 'También tienes derecho a', items: ['Examinar los factores que afectan tu seguridad y salud, y proponer medidas (art. 78).', 'Ser transferido a un puesto de menos riesgo tras un accidente o enfermedad ocupacional, sin perder remuneración ni categoría (art. 76).'] },
        ],
        evaluacion: [
          { pregunta: '¿Cuál es la primera medida de prevención?', opciones: ['Dar casco a todos', 'Eliminar el riesgo en su origen', 'Colocar un cartel'], correcta: 1, explicacion: 'Art. 50: primero se elimina el riesgo; los equipos se usan cuando no pueda eliminarse.' },
          { pregunta: 'Tras interrumpir labores por peligro inminente, ¿cuándo se puede reanudar?', opciones: ['A la hora siguiente', 'Cuando el riesgo se haya reducido o controlado', 'Cuando lo diga cualquier compañero'], correcta: 1, explicacion: 'Art. 63 de la Ley 29783.' },
        ],
      },
    ],
  },
  {
    slug: 'liderazgo-equidad-genero',
    titulo: 'Liderazgo y Equidad de Género',
    categoria: 'Igualdad',
    fondo: 'from-fuchsia-700 to-violeta',
    descripcion: 'Igualdad remunerativa, prevención del hostigamiento y más mujeres en la dirección sindical.',
    fuentes: [
      { titulo: 'Ley 30709, prohíbe la discriminación remunerativa entre varones y mujeres', url: 'https://www.leyes.congreso.gob.pe/Documentos/2016_2021/ADLP/Normas_Legales/30709-LEY.pdf' },
      { titulo: 'Ley 27942, Prevención y Sanción del Hostigamiento Sexual', url: 'https://www.muniate.gob.pe/wp-content/uploads/2026/02/LEY-No-27942.pdf' },
      { titulo: 'Estatuto de la CUT PERÚ', url: '/estatuto' },
    ],
    lecciones: [
      {
        id: 'igualdad-remunerativa',
        titulo: 'Igual remuneración por igual trabajo',
        minutos: 15,
        objetivo: 'Identificar la discriminación remunerativa y las protecciones de la Ley 30709.',
        video: { id: '2jAbdbBatxM', titulo: 'Clase maestra: Igualdad de género empresarial / Convenio 100 de la OIT', canal: 'SCORE y MIG SCORE Colombia' },
        bloques: [
          { tipo: 'texto', texto: 'La Ley 30709 prohíbe la discriminación remunerativa entre varones y mujeres mediante categorías, funciones y remuneraciones que permitan aplicar el principio de igual remuneración por igual trabajo (art. 1).' },
          { tipo: 'lista', titulo: 'Lo que establece', items: ['Las remuneraciones de cada categoría se fijan sin discriminación (art. 3).', 'La capacitación debe garantizar la igualdad entre mujeres y hombres (art. 4).', 'Se debe garantizar un trato digno y compatibilidad entre vida personal, familiar y laboral (art. 5).', 'Se prohíbe despedir o no renovar por embarazo o lactancia (art. 6).'] },
          { tipo: 'clave', texto: 'SUNAFIL y las gerencias regionales de trabajo fiscalizan el cumplimiento de esta ley.' },
          { tipo: 'caso', titulo: 'Analiza el caso', texto: 'Ana y Luis tienen el mismo puesto, antigüedad y funciones, pero Luis gana 20% más sin ninguna razón objetiva. ¿Qué puede hacer el sindicato?', solucion: 'Pedir el cuadro de categorías y funciones, documentar el caso, incluir la igualdad en la negociación y, si no se corrige, acudir a la fiscalización.' },
        ],
        evaluacion: [
          { pregunta: '¿Qué principio protege la Ley 30709?', opciones: ['Igual remuneración por igual trabajo', 'Mayor sueldo por mayor edad', 'Salario único nacional'], correcta: 0, explicacion: 'Art. 1 de la Ley 30709.' },
          { pregunta: '¿Se puede no renovar un contrato por embarazo?', opciones: ['Sí', 'No, está prohibido', 'Solo en empresas pequeñas'], correcta: 1, explicacion: 'Art. 6 de la Ley 30709.' },
        ],
      },
      {
        id: 'hostigamiento',
        titulo: 'Prevenir y enfrentar el hostigamiento sexual',
        minutos: 20,
        objetivo: 'Reconocer el hostigamiento sexual y acompañar a quien lo sufre.',
        video: { id: '-qAMeSGfrDA', titulo: 'Vídeo animado. Igualdad de género', canal: 'SEP Sala de Maestras y Maestros' },
        bloques: [
          { tipo: 'texto', texto: 'El hostigamiento sexual es una forma de violencia: una conducta de naturaleza o connotación sexual o sexista no deseada, que puede crear un ambiente intimidatorio, hostil o humillante, o afectar la situación laboral (art. 4 de la Ley 27942).' },
          { tipo: 'clave', texto: 'No se requiere acreditar el rechazo ni la reiteración de la conducta (art. 4). Una sola conducta puede configurarlo.' },
          { tipo: 'lista', titulo: 'Puede manifestarse mediante (art. 6)', items: ['Promesas de trato preferente a cambio de favores sexuales.', 'Amenazas para exigir una conducta no deseada.', 'Términos, insinuaciones, gestos o imágenes de contenido sexual o sexista.', 'Acercamientos, roces o tocamientos no deseados.', 'Trato hostil por rechazar estas conductas.'] },
          { tipo: 'pasos', titulo: 'Cómo acompañar desde el sindicato', items: ['Escucha sin juzgar y cree en lo que te cuentan.', 'Mantén la confidencialidad.', 'Explica los canales de denuncia de la empresa y de la autoridad.', 'Ofrece acompañamiento legal y emocional.', 'Vigila que no existan represalias.'] },
        ],
        evaluacion: [
          { pregunta: '¿Es necesario que la conducta se repita para que exista hostigamiento?', opciones: ['Sí, al menos tres veces', 'No, no se requiere reiteración', 'Sí, durante un año'], correcta: 1, explicacion: 'Art. 4 de la Ley 27942.' },
          { pregunta: '¿Qué debe hacer primero quien acompaña a una víctima?', opciones: ['Publicar el caso', 'Escuchar sin juzgar y mantener confidencialidad', 'Pedir que lo olvide'], correcta: 1, explicacion: 'La confianza y la confidencialidad protegen a la persona.' },
        ],
      },
      {
        id: 'mujeres-direccion',
        titulo: 'Más mujeres en la dirección sindical',
        minutos: 15,
        objetivo: 'Diseñar acciones concretas para ampliar la participación de las mujeres.',
        bloques: [
          { tipo: 'texto', texto: 'El Estatuto de la CUT PERÚ dispone que en todos sus actos, elecciones y comisiones se considere un porcentaje no menor al 30% de mujeres trabajadoras. También prioriza la afiliación de mujeres y jóvenes y su participación en la dirección (art. 9).' },
          { tipo: 'lista', titulo: 'Acciones que funcionan', items: ['Reunirse en horarios compatibles con el cuidado de la familia.', 'Formar a nuevas lideresas antes de cada elección.', 'Rotar la vocería para que más mujeres hablen en público.', 'Incorporar el enfoque de género en cada pliego.', 'Medir cuántas mujeres participan y publicar el avance.'] },
          { tipo: 'clave', texto: 'La cuota es el piso, no el techo: la meta es que las mujeres participen de verdad en las decisiones, no solo que figuren en la lista.' },
          { tipo: 'caso', titulo: 'Practica', texto: 'Tu junta tiene 10 integrantes y solo 2 son mujeres. ¿Cuántas faltan para llegar al 30% y qué harías?', solucion: 'Faltaría 1 para llegar a 3 de 10. Prepara lideresas desde ahora, invítalas a comisiones y revisa los horarios de las reuniones antes de la próxima elección.' },
        ],
        evaluacion: [
          { pregunta: '¿Qué porcentaje mínimo de mujeres establece el Estatuto?', opciones: ['10%', '20%', '30%', '50%'], correcta: 2, explicacion: 'Disposición Final Única del Estatuto.' },
          { pregunta: 'En una comisión de 20 personas, ¿cuántas mujeres como mínimo debe haber?', opciones: ['3', '6', '10'], correcta: 1, explicacion: 'El 30% de 20 es 6.' },
        ],
      },
    ],
  },
];

export const obtenerCurso = (slug: string) => cursos.find((curso) => curso.slug === slug);
