// Guía en lenguaje sencillo del Estatuto de la CUT PERÚ. El texto oficial es el documento registrado ante el MTPE.

export type TituloEstatuto = {
  id: string;
  numero: string;
  titulo: string;
  articulos: string;
  resumen: string;
  puntos: { articulo: string; texto: string }[];
};

export const estatuto: TituloEstatuto[] = [
  {
    id: 'denominacion',
    numero: 'Título I',
    titulo: 'Denominación, composición, sede y jurisdicción',
    articulos: 'Arts. 1 a 5',
    resumen: 'Qué es la central, a quién representa y a qué redes internacionales pertenece.',
    puntos: [
      { articulo: 'Art. 1', texto: 'La CUT-PERÚ es una organización sindical de tercer grado, con Registro Oficial Nº 001 – Folio Nº 001 – 98 – MTPE.' },
      { articulo: 'Art. 2', texto: 'Está conformada por organizaciones sindicales y asociativas de primer y segundo grado y de rama de actividad.' },
      { articulo: 'Art. 3', texto: 'Representa a asalariados privados y públicos, organizaciones autogestionarias, autoempleados, pensionistas, jubilados, cesantes, jóvenes que buscan su primer empleo y desempleados.' },
      { articulo: 'Art. 4', texto: 'Tiene jurisdicción nacional, con sede principal en Lima y sedes regionales donde sea necesario.' },
      { articulo: 'Art. 5', texto: 'Está afiliada a la CSI, a la CSA y a la CCSA.' },
    ],
  },
  {
    id: 'principios',
    numero: 'Título II',
    titulo: 'Declaración de valores y principios',
    articulos: 'Art. 6',
    resumen: 'Los valores que orientan la acción de la central.',
    puntos: [
      { articulo: 'Art. 6', texto: 'Es una central sindical y asociativa, con principios de clase e ideario sociopolítico, democrática y progresista.' },
      { articulo: 'Art. 6', texto: 'Las decisiones se toman por mayoría estatutaria y se implementan de manera unitaria.' },
      { articulo: 'Art. 6', texto: 'Promueve la justicia social, la equidad, la inclusión, los valores ancestrales y la pluriculturalidad.' },
      { articulo: 'Art. 6', texto: 'No discrimina por género, etnia, lengua, orientación sexual, pensamiento político, religión, capacidades diferentes o identidad cultural.' },
    ],
  },
  {
    id: 'objetivos',
    numero: 'Título III',
    titulo: 'Objetivos, fines y tareas',
    articulos: 'Arts. 7 a 9',
    resumen: 'Para qué existe la central y en qué campos trabaja.',
    puntos: [
      { articulo: 'Art. 7', texto: 'Trabaja por empleo pleno, digno y productivo, remuneraciones justas, derechos laborales, seguridad social y diálogo social.' },
      { articulo: 'Art. 8', texto: 'Desarrolla asesoría legal y soporte técnico, impulsa escuelas de formación y brinda servicios sindicales.' },
      { articulo: 'Art. 9', texto: 'Actúa en cinco campos: política, economía, políticas sociales, organización sindical y defensa sindical.' },
      { articulo: 'Art. 9', texto: 'Prioriza la afiliación de mujeres y jóvenes, y respalda las luchas y huelgas aprobadas de manera orgánica y legal.' },
    ],
  },
  {
    id: 'afiliacion',
    numero: 'Título IV',
    titulo: 'Afiliación, cuotas y suspensiones',
    articulos: 'Arts. 10 a 13',
    resumen: 'Cómo afiliarse, cuánto se aporta y qué ocurre si no se cumple.',
    puntos: [
      { articulo: 'Art. 10', texto: 'La afiliación institucional requiere ocho documentos, entre ellos solicitud, padrón, estatutos, acta de aprobación y recibo de la primera cuota.' },
      { articulo: 'Art. 11', texto: 'La afiliación individual es personal y voluntaria, y se realiza llenando la Ficha de Afiliación Individual.' },
      { articulo: 'Art. 12', texto: 'La cuota ordinaria es de S/ 12 al año por afiliado. En abonos anuales o semestrales se reduce a S/ 10 por año o S/ 5 por semestre.' },
      { articulo: 'Art. 12', texto: 'Se abona a la cuenta de la central en la primera quincena del mes siguiente a la recaudación, reservando el 50% para la CUT Regional.' },
      { articulo: 'Art. 13', texto: 'No actualizar la documentación o adeudar cuotas suspende automáticamente los derechos de afiliación.' },
    ],
  },
  {
    id: 'estructura',
    numero: 'Título V',
    titulo: 'Estructura y funciones de dirección y control',
    articulos: 'Arts. 14 a 43',
    resumen: 'Quién decide, cada cuánto se reúne y cómo se controla la gestión.',
    puntos: [
      { articulo: 'Art. 15', texto: 'El Congreso Nacional es el órgano supremo y se realiza cada cuatro años.' },
      { articulo: 'Art. 18', texto: 'Un delegado de 20 a 100 afiliados, y uno adicional por cada 100 más o por fracción mayor de 50.' },
      { articulo: 'Art. 25', texto: 'El CDN se reúne en sesión ordinaria dos veces al año.' },
      { articulo: 'Art. 29', texto: 'El CEN es el órgano de dirección permanente de la central.' },
      { articulo: 'Art. 30', texto: 'El CEN tiene 21 cargos: Presidencia, tres Vice-Presidencias, Secretaría General, Adjunta y 15 Secretarías.' },
      { articulo: 'Arts. 42 y 43', texto: 'Las Comisiones de Garantías y de Control tienen cinco miembros cada una, sin otro cargo electo.' },
    ],
  },
  {
    id: 'derechos',
    numero: 'Título VI',
    titulo: 'Deberes, derechos y sanciones',
    articulos: 'Arts. 44 a 47',
    resumen: 'Qué puede exigir cada afiliado o afiliada y qué se espera de cada quien.',
    puntos: [
      { articulo: 'Art. 44', texto: 'Tienes derecho a participar, debatir, elegir y ser elegido, recibir formación, información y un trato justo.' },
      { articulo: 'Art. 45', texto: 'Tienes el deber de cumplir el Estatuto, ser solidario, respetar las opiniones y pagar oportunamente la cuota.' },
      { articulo: 'Art. 46', texto: 'Son faltas, entre otras, infringir el Estatuto, la indisciplina, la difamación y la malversación de fondos.' },
      { articulo: 'Art. 47', texto: 'Las sanciones van desde la amonestación escrita hasta la expulsión, según la gravedad.' },
    ],
  },
  {
    id: 'solidaridad',
    numero: 'Título VII',
    titulo: 'De la solidaridad',
    articulos: 'Art. 48',
    resumen: 'Cómo se apoyan las organizaciones entre sí.',
    puntos: [
      { articulo: 'Art. 48', texto: 'Las afiliadas practican entre sí la solidaridad moral y material.' },
      { articulo: 'Art. 48', texto: 'Quienes sufran represalias por acciones sindicales serán atendidos por su organización, con respaldo de la CUT Territorial y de la dirección nacional.' },
    ],
  },
  {
    id: 'acuerdos',
    numero: 'Título VIII',
    titulo: 'Acuerdos, elecciones, reforma y patrimonio',
    articulos: 'Arts. 49 a 55',
    resumen: 'Cómo se vota, se reforma el Estatuto y se administra el patrimonio.',
    puntos: [
      { articulo: 'Art. 49', texto: 'El CEN se elige por cuatro años, en votación directa, universal y secreta, por listas completas.' },
      { articulo: 'Art. 49', texto: 'Para integrar el CEN se requiere afiliación ininterrumpida no menor de dos años.' },
      { articulo: 'Art. 51', texto: 'El Estatuto se modifica en Congreso Nacional, por mayoría absoluta.' },
      { articulo: 'Art. 55', texto: 'El patrimonio incluye cuotas, donaciones, rentas y demás recursos obtenidos conforme a ley.' },
      { articulo: 'Disposición Final', texto: 'En todos sus actos, elecciones y comisiones se considera no menos del 30% de mujeres trabajadoras.' },
    ],
  },
];
