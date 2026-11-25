// Contenido de ejemplo hasta que la Secretaría de Comunicación publique las notas reales.

export type Noticia = {
  slug: string;
  categoria: string;
  color: string;
  fecha: string;
  autor: string;
  titulo: string;
  resumen: string;
};

export const noticias: Noticia[] = [
  {
    slug: 'posicionamiento-normativas-dialogo-social',
    categoria: 'Comunicado',
    color: 'text-rojo',
    fecha: '19 Octubre, 2026',
    autor: 'Comité Ejecutivo Nacional',
    titulo: 'Posicionamiento frente a las nuevas normativas de diálogo social',
    resumen: 'El Consejo Directivo Nacional (CDN) emite un pronunciamiento oficial exigiendo la revisión de los proyectos de ley que vulneran la negociación colectiva y los acuerdos del Consejo Nacional del Trabajo.',
  },
  {
    slug: 'asamblea-macrorregion-sur',
    categoria: 'Acción Sindical',
    color: 'text-blue-700',
    fecha: '15 Octubre, 2026',
    autor: 'Secretaría de Organización',
    titulo: 'Asamblea Nacional con bases territoriales de la macrorregión sur',
    resumen: 'Las bases territoriales de la macrorregión sur se reunieron para coordinar el fortalecimiento organizativo de la central.',
  },
  {
    slug: 'nuevo-ciclo-campus-virtual',
    categoria: 'Educación',
    color: 'text-green-700',
    fecha: '10 Octubre, 2026',
    autor: 'Secretaría de Educación y Cultura',
    titulo: 'Apertura del nuevo ciclo del Campus Virtual CUT-PERÚ',
    resumen: 'La nueva plataforma digital ofrece formación sociopolítica y técnica para líderes y lideresas sindicales.',
  },
  {
    slug: 'encuentro-mujeres-autoempleadas',
    categoria: 'Mujer Trabajadora',
    color: 'text-purple-700',
    fecha: '05 Octubre, 2026',
    autor: 'Secretaría de la Mujer de los Autoempleados',
    titulo: 'Encuentro nacional de mujeres lideresas del sector autoempleado',
    resumen: 'Lideresas del sector autoempleado compartieron experiencias sobre organización, capacitación y desarrollo de sus actividades.',
  },
  {
    slug: 'foro-coordinadora-andina',
    categoria: 'Internacional',
    color: 'text-orange-700',
    fecha: '28 Septiembre, 2026',
    autor: 'Secretaría de Asuntos Internacionales',
    titulo: 'Participación de la CUT en el foro de la Coordinadora Sindical Andina',
    resumen: 'La central participó en el espacio de intercambio de las organizaciones sindicales de la región andina.',
  },
  {
    slug: 'resoluciones-sesion-cdn',
    categoria: 'Comunicado',
    color: 'text-rojo',
    fecha: '20 Septiembre, 2026',
    autor: 'Secretaría de Actas y Archivos',
    titulo: 'Resoluciones aprobadas en la última sesión del CDN',
    resumen: 'Se informa a las organizaciones afiliadas sobre los acuerdos adoptados en la última sesión del Consejo Directivo Nacional.',
  },
  {
    slug: 'redes-comunicacion-jovenes',
    categoria: 'Juventud',
    color: 'text-teal-700',
    fecha: '15 Septiembre, 2026',
    autor: 'Secretaría de la Juventud',
    titulo: 'Nuevas redes de comunicación para acercar a los jóvenes al sindicalismo',
    resumen: 'La Secretaría de la Juventud impulsa redes para acercar a más jóvenes al sindicalismo sociopolítico.',
  },
];
