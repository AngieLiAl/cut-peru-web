// Fuente: Constancia de Inscripción Automática del MTPE, Expediente N.º 23-1998 (03/11/2025).
// Las funciones resumen el art. 34 del Estatuto. Los DNI de la constancia no se publican.

export type Area = 'direccion' | 'sectores' | 'gestion' | 'derechos' | 'igualdad' | 'social';

export type Cargo = {
  id: string;
  cargo: string;
  corto: string;
  nombre: string;
  area: Area;
  funciones: string[];
};

export const vigenciaMandato = '29 de diciembre de 2026';

export const areas: { id: Area | 'todas'; texto: string }[] = [
  { id: 'todas', texto: 'Todo el CEN' },
  { id: 'direccion', texto: 'Dirección' },
  { id: 'sectores', texto: 'Sectores' },
  { id: 'gestion', texto: 'Gestión' },
  { id: 'derechos', texto: 'Derechos y formación' },
  { id: 'igualdad', texto: 'Mujer, juventud y migrantes' },
  { id: 'social', texto: 'Social y ambiente' },
];

const funcionesSector = (sector: string) => [
  `Implementa en ${sector} las políticas de organización y defensa de la central.`,
  'Canaliza ante el gobierno las reivindicaciones y propuestas de las organizaciones afiliadas de su sector.',
  'Reemplaza de manera temporal y rotativa a la Presidencia en caso de ausencia orgánica.',
];

export const presidencia: Cargo = {
  id: 'presidencia',
  cargo: 'Presidencia',
  corto: 'Presidencia',
  nombre: 'Julio César Bazán Figueroa',
  area: 'direccion',
  funciones: [
    'Ejerce la representación sindical, legal, política y social de la central.',
    'Preside las sesiones del Comité Ejecutivo Nacional.',
    'Firma la correspondencia oficial y las actas de las sesiones del CEN.',
    'Celebra contratos y convenios con autorización del CEN.',
  ],
};

export const vicepresidencias: Cargo[] = [
  { id: 'vp-privada', cargo: 'Vice-Presidencia de Empresa Privada', corto: 'Empresa Privada', nombre: 'Ruth Ángela Anchorena Humala', area: 'sectores', funciones: funcionesSector('el sector privado') },
  { id: 'vp-publica', cargo: 'Vice-Presidencia de Administración Pública', corto: 'Administración Pública', nombre: 'Darda Yhasmin Alatrista Flor', area: 'sectores', funciones: funcionesSector('el sector público') },
  { id: 'vp-autoempleo', cargo: 'Vice-Presidencia de Trabajadores Autoempleados', corto: 'Autoempleados', nombre: 'Adelinda Díaz Uriarte', area: 'sectores', funciones: funcionesSector('el sector autoempleo') },
];

export const secretariaGeneral: Cargo[] = [
  {
    id: 'general',
    cargo: 'Secretaría General',
    corto: 'Secretaría General',
    nombre: 'Paulina Luza Ocsa',
    area: 'direccion',
    funciones: [
      'Supervisa y articula las Secretarías Nacionales, Comités Especiales y Comisiones de Trabajo.',
      'Preside las sesiones de los Equipos Técnicos de la central.',
      'Propone al CEN acuerdos y reglamentos para el mejor funcionamiento de la central.',
    ],
  },
  {
    id: 'adjunta',
    cargo: 'Secretaría General Adjunta',
    corto: 'General Adjunta',
    nombre: 'César Ramos Arcos',
    area: 'direccion',
    funciones: [
      'Colabora y coordina con la Secretaría General.',
      'Ejerce como su reemplazo temporal en casos de ausencia.',
    ],
  },
];

export const secretarias: Cargo[] = [
  {
    id: 'organizacion', cargo: 'Secretaría de Organización', corto: 'Organización', nombre: 'Guillermo Abraham Honores Ramírez', area: 'gestion',
    funciones: ['Lleva el registro de las organizaciones afiliadas y su documentación.', 'Coordina con las afiliadas y los Comités Ejecutivos Regionales.', 'Apoya la conformación de organismos de segundo nivel y sindicatos por rama.'],
  },
  {
    id: 'defensa', cargo: 'Secretaría de Defensa y Derechos Humanos', corto: 'Defensa y DD. HH.', nombre: 'Pablo Augusto Díaz Robles', area: 'derechos',
    funciones: ['Propone estrategias de defensa de los derechos humanos y laborales.', 'Representa en negociaciones colectivas a las bases afiliadas que lo soliciten.', 'Hace seguimiento de las demandas de las bases afiliadas.'],
  },
  {
    id: 'economia', cargo: 'Secretaría de Economía y Finanzas', corto: 'Economía y Finanzas', nombre: 'Alfonso Hernán Gamboa Briceño', area: 'gestion',
    funciones: ['Recauda las cuotas ordinarias y extraordinarias.', 'Vela por la legalidad y transparencia de las acciones económicas.', 'Rinde cuentas semestrales al CEN y al CDN.'],
  },
  {
    id: 'educacion', cargo: 'Secretaría de Educación y Cultura', corto: 'Educación y Cultura', nombre: 'José Antonio Rosas Sayas', area: 'derechos',
    funciones: ['Propone planes de capacitación sindical, sociopolítica y técnica.', 'Fomenta escuelas sindicales y bibliotecas.', 'Organiza actividades de capacitación e investigación.'],
  },
  {
    id: 'comunicacion', cargo: 'Secretaría de Comunicación', corto: 'Comunicación', nombre: 'Roberto Fredy Bravo Gutiérrez', area: 'gestion',
    funciones: ['Presenta el plan de comunicación sindical sociopolítica.', 'Fomenta la producción de materiales de prensa.', 'Establece redes de corresponsales de prensa.'],
  },
  {
    id: 'mujer-asalariada', cargo: 'Secretaría de la Mujer Asalariada', corto: 'Mujer Asalariada', nombre: 'Irma Esther Orihuela Núñez', area: 'igualdad',
    funciones: ['Presenta planes para fortalecer la afiliación y el liderazgo de las trabajadoras asalariadas.', 'Promueve normas que mejoren sus condiciones de vida.', 'Impulsa el enfoque de género en la acción sindical.'],
  },
  {
    id: 'mujer-autoempleada', cargo: 'Secretaría de la Mujer de los Autoempleados', corto: 'Mujer Autoempleada', nombre: 'Carmen Alina Alejos Román', area: 'igualdad',
    funciones: ['Participa en redes que desarrollan capacidades en mujeres autoempleadas.', 'Impulsa estudios y normas para mejorar sus condiciones de trabajo y de vida.', 'Impulsa el enfoque de género en la acción sindical.'],
  },
  {
    id: 'juventud', cargo: 'Secretaría de la Juventud', corto: 'Juventud', nombre: 'Azucena Rita Vásquez Zacarías', area: 'igualdad',
    funciones: ['Implementa planes de afiliación y organización de la juventud trabajadora.', 'Crea círculos de análisis y redes para acercar jóvenes al sindicalismo.', 'Desarrolla actividades deportivas, culturales y sociales.'],
  },
  {
    id: 'seguridad-social', cargo: 'Secretaría de Seguridad Social y Seguridad y Salud en el Trabajo', corto: 'Seguridad Social y SST', nombre: 'Guillermo Antonio Onofre Flores', area: 'social',
    funciones: ['Promueve planes y políticas públicas de protección y seguridad social.', 'Constituye una red institucional en seguridad y salud en el trabajo.', 'Impulsa estudios para proponer normas legales sobre seguridad social.'],
  },
  {
    id: 'internacionales', cargo: 'Secretaría de Asuntos Internacionales', corto: 'Asuntos Internacionales', nombre: 'Miryan del Rosario Tejada Romero', area: 'gestion',
    funciones: ['Promueve redes de integración y solidaridad internacional.', 'Establece alianzas con organizaciones internacionales.', 'Articula acciones con la cooperación internacional solidaria.'],
  },
  {
    id: 'actas', cargo: 'Secretaría de Actas y Archivos', corto: 'Actas y Archivos', nombre: 'María Concepción Atoche Gutiérrez', area: 'gestion',
    funciones: ['Administra el archivo y registro de los documentos institucionales.', 'Redacta y gestiona las actas del CEN y del CDN.', 'Custodia los Libros de Actas de la central.'],
  },
  {
    id: 'migrantes', cargo: 'Secretaría de Trabajadores Migrantes', corto: 'Migrantes', nombre: 'María de los Ángeles Ochoa Luján', area: 'igualdad',
    funciones: ['Elabora planes sindicales para trabajadores y trabajadoras migrantes.', 'Desarrolla actividades sobre sus derechos laborales y seguridad social.', 'Promueve alianzas con organizaciones sindicales internacionales.'],
  },
  {
    id: 'pensionistas', cargo: 'Secretaría de Pensionistas y Jubilados', corto: 'Pensionistas', nombre: 'María Lourdes Bastidas Alfaro', area: 'social',
    funciones: ['El Estatuto la incluye en la estructura del CEN (art. 30). Sus funciones específicas no se detallan en el art. 34.'],
  },
  {
    id: 'promocion', cargo: 'Secretaría de Promoción y Desarrollo Social', corto: 'Promoción Social', nombre: 'José Luis Almanza San Miguel', area: 'social',
    funciones: ['Promueve microemprendimientos y pequeños negocios de los autoempleados.', 'Organiza ferias nacionales e internacionales.', 'Promueve el cooperativismo y la autogestión.'],
  },
  {
    id: 'ambiente', cargo: 'Secretaría de Recursos Naturales y Medio Ambiente', corto: 'Ambiente', nombre: 'Marisol Steffani Clavijo Quino', area: 'social',
    funciones: ['Propone planes de cuidado del ambiente con enfoque de cambio climático y transición justa.', 'Promueve políticas de desarrollo sustentable.', 'Defiende los derechos ambientales y la biodiversidad.'],
  },
];

export const organos = [
  { id: 'congreso', nombre: 'Congreso Nacional', cuando: 'Cada 4 años', texto: 'Órgano supremo de la central. Aprueba el programa y el Estatuto, y elige al CEN y a las Comisiones de Garantías y de Control.', articulo: 'Arts. 15 y 16' },
  { id: 'cdn', nombre: 'Consejo Directivo Nacional', cuando: '2 sesiones ordinarias al año', texto: 'Máximo organismo de dirección entre Congreso y Congreso. Aprueba el presupuesto y los planes, y supervisa la gestión.', articulo: 'Arts. 23 a 26' },
  { id: 'cen', nombre: 'Comité Ejecutivo Nacional', cuando: 'Permanente', texto: 'Órgano de dirección permanente. Sus 21 integrantes ejecutan las resoluciones del Congreso y del CDN.', articulo: 'Arts. 29 a 34' },
  { id: 'comisiones', nombre: 'Garantías y Control', cuando: '5 integrantes cada una', texto: 'La Comisión de Garantías asegura el cumplimiento de derechos y deberes. La de Control supervisa la contabilidad y los fondos.', articulo: 'Arts. 42 y 43' },
  { id: 'cut', nombre: 'CUT Sectoriales y Territoriales', cuando: 'En todo el país', texto: 'Llevan la acción sindical a los sectores de la economía y a las regiones, provincias y distritos.', articulo: 'Arts. 35 a 41' },
];
