import Image from 'next/image';
import Link from 'next/link';
import LuzCursor from '../_componentes/LuzCursor';
import MapaPeru from '../_componentes/MapaPeru';
import SelectorPerfil from '../_componentes/SelectorPerfil';
import { noticias } from '../_datos/noticias';

const accesos = [
  {
    titulo: 'Afiliación Digital',
    texto: 'Une a tu organización o afíliate de forma individual.',
    href: '/afiliacion',
    color: 'bg-rojo text-white',
    icono: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  },
  {
    titulo: 'Defensa Laboral',
    texto: 'Acompañamiento jurídico en pliegos de reclamos y vulneración de derechos.',
    href: '/intranet/tickets',
    color: 'bg-white text-tinta',
    icono: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  },
  {
    titulo: 'Campus Virtual',
    texto: 'Ingresa a la Escuela Sindical, descarga normativas y accede a cursos.',
    href: '/intranet/campus',
    color: 'bg-violeta text-white',
    icono: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    titulo: 'Gestión de Cuotas',
    texto: 'Administra tu padrón de afiliados y declara tus vouchers de cotización.',
    href: '/intranet/pagos',
    color: 'bg-tinta text-white',
    icono: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
];

const afiliaciones = [
  { logo: '/CSI.png', sigla: 'CSI', nombre: 'Confederación Sindical Internacional' },
  { logo: '/CSA.png', sigla: 'CSA', nombre: 'Confederación Sindical de Trabajadores y Trabajadoras de las Américas' },
];

const datos = [
  { cifra: 'Nº 001', texto: 'Registro Oficial ante el Ministerio de Trabajo' },
  { cifra: '21', texto: 'cargos integran el Comité Ejecutivo Nacional' },
  { cifra: '30%', texto: 'mínimo de mujeres en actos, elecciones y comisiones' },
  { cifra: '3', texto: 'redes internacionales: CSI, CSA y CCSA' },
];

export default function Home() {
  return (
    <>
      {/* PORTADA */}
      <LuzCursor className="fondo-indigo overflow-hidden text-white">
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-32 pt-12 sm:px-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:pt-14">
          <div>
            <p className="inline-block rounded-full bg-white/12 px-4 py-1.5 text-sm font-medium">Organización Sindical de Tercer Grado</p>
            <h1 className="mt-5 text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Por el Trabajo Decente y Desarrollo Sostenible
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Unificamos las luchas sociopolíticas y defendemos los derechos laborales, sociales y culturales de los trabajadores del sector privado, público y autoempleados de todo el Perú.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/afiliacion" className="rounded-full bg-rojo px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-rojo-oscuro">
                Afiliación Digital
              </Link>
              <Link href="/noticias" className="rounded-full border border-white/35 px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white hover:text-tinta">
                Últimos Comunicados
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
            <MapaPeru />
            <p className="absolute bottom-[12%] left-0 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              Sede principal en Lima · Jurisdicción nacional
            </p>
          </div>
        </section>
      </LuzCursor>

      {/* HERRAMIENTAS */}
      <section aria-labelledby="herramientas" className="relative mx-auto -mt-22 max-w-6xl px-4 sm:px-6">
        <h2 id="herramientas" className="mb-3 text-sm font-semibold text-white">Herramientas para nuestras Bases</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {accesos.map((acceso) => (
            <li key={acceso.href}>
              <Link href={acceso.href} className={`group flex h-full flex-col rounded-3xl p-5 shadow-lg transition-transform hover:-translate-y-1 ${acceso.color}`}>
                <svg aria-hidden="true" className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d={acceso.icono} />
                </svg>
                <span className="mt-6 flex items-center justify-between gap-2 font-titulo text-lg font-semibold">
                  {acceso.titulo}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
                <span className="mt-1 text-sm leading-relaxed opacity-85">{acceso.texto}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* AFILIACIONES INTERNACIONALES */}
      <section aria-label="Afiliaciones internacionales" className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <div className="grid items-center gap-6 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-[auto_1fr_1fr] md:gap-10">
          <p className="font-titulo text-lg font-semibold text-tinta">Estamos afiliados a</p>
          {afiliaciones.map((afiliacion) => (
            <div key={afiliacion.sigla} className="flex items-center gap-4">
              <Image src={afiliacion.logo} alt={`Logo de la ${afiliacion.sigla}`} width={68} height={68} loading="eager" className="shrink-0" />
              <p className="text-sm leading-snug text-tenue">
                <span className="block font-semibold text-tinta">{afiliacion.sigla}</span>
                {afiliacion.nombre}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SELECTOR "SOY..." */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">Soy…</h2>
          <p className="mb-6 mt-2 text-tenue">Elige tu situación y te mostramos cómo te acompaña la central.</p>
          <SelectorPerfil />
        </div>
      </section>

      {/* DATOS */}
      <section aria-label="La central en datos" className="bg-linear-to-r from-rojo via-tinta to-violeta text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {datos.map((dato) => (
            <div key={dato.cifra} className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-sm leading-snug text-white/85">{dato.texto}</dt>
              <dd className="font-titulo text-4xl font-semibold">{dato.cifra}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* EXPLORA */}
      <section aria-label="Explora" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { titulo: 'Asistente', texto: 'Responde unas preguntas y encuentra qué hacer.', href: '/ayuda', fondo: 'bg-rojo' },
            { titulo: 'Red Nacional', texto: 'La central en las regiones del Perú.', href: '/red-nacional', fondo: 'bg-tinta' },
            { titulo: 'Observatorio Laboral', texto: 'Cifras públicas para argumentar con evidencia.', href: '/observatorio', fondo: 'bg-violeta' },
          ].map((tarjeta) => (
            <Link key={tarjeta.href} href={tarjeta.href} className={`rounded-3xl p-6 text-white transition-transform hover:-translate-y-1 ${tarjeta.fondo}`}>
              <span className="block font-titulo text-2xl font-semibold">{tarjeta.titulo}</span>
              <span className="mt-2 block text-white/85">{tarjeta.texto}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ACTUALIDAD SINDICAL */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Actualidad Sindical</h2>
            <p className="mt-2 text-tenue">Últimas noticias, pronunciamientos y comunicados del CEN.</p>
          </div>
          <Link href="/noticias" className="hidden shrink-0 rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violeta sm:block">
            Ver todas las noticias
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-rows-2">
          {noticias.slice(0, 3).map((noticia, indice) => (
            <article
              key={noticia.titulo}
              className={`group relative flex flex-col rounded-3xl p-6 transition-transform hover:-translate-y-0.5 ${indice === 0 ? 'bg-linear-to-br from-tinta to-violeta text-white lg:row-span-2 lg:p-8' : 'bg-white shadow-sm'}`}
            >
              <p className={`text-xs font-semibold ${indice === 0 ? 'text-white/80' : 'text-rojo'}`}>{noticia.categoria}</p>
              <h3 className={`mt-3 font-semibold leading-snug ${indice === 0 ? 'text-2xl text-white lg:text-3xl' : 'text-xl'}`}>
                <Link href={`/noticias/${noticia.slug}`} className="after:absolute after:inset-0">{noticia.titulo}</Link>
              </h3>
              <p className={`mt-3 grow text-sm leading-relaxed ${indice === 0 ? 'text-white/85' : 'text-tenue'}`}>{noticia.resumen}</p>
              <p className={`mt-5 text-xs ${indice === 0 ? 'text-white/75' : 'text-tenue'}`}>{noticia.fecha}</p>
            </article>
          ))}
        </div>

        <Link href="/noticias" className="mt-6 block text-sm font-semibold text-tinta sm:hidden">
          Ver todas las noticias &rarr;
        </Link>
      </section>

      {/* CIERRE */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-rojo p-8 sm:flex-row sm:items-center sm:p-10">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Organízate.</h2>
          <Link href="/afiliacion" className="rounded-full bg-white px-6 py-3 font-semibold text-tinta transition-colors hover:bg-niebla">
            Afiliar a mi organización
          </Link>
        </div>
      </section>
    </>
  );
}
