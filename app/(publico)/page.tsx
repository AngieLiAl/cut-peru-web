import Image from 'next/image';
import Link from 'next/link';
import Icono, { type NombreIcono } from '../_componentes/Icono';
import LuzCursor from '../_componentes/LuzCursor';
import MapaPeru from '../_componentes/MapaPeru';
import PortadaNoticia from '../_componentes/PortadaNoticia';
import SelectorPerfil from '../_componentes/SelectorPerfil';
import { obtenerNoticias } from '../_datos/noticias';

const tareas: { titulo: string; texto: string; href: string; icono: NombreIcono }[] = [
  { titulo: 'Afiliarme', texto: 'Tu organización o tú, en línea y paso a paso.', href: '/afiliacion', icono: 'afiliar' },
  { titulo: 'Recibir orientación', texto: 'Responde unas preguntas y te decimos qué hacer.', href: '/ayuda', icono: 'ayuda' },
  { titulo: 'Conocer al CEN', texto: 'Los 21 cargos de la dirección y sus funciones.', href: '/directorio', icono: 'personas' },
  { titulo: 'Leer el Estatuto', texto: 'Explicado en lenguaje sencillo.', href: '/estatuto', icono: 'libro' },
];

const datos = [
  { cifra: 'Nº 001', texto: 'Registro Oficial ante el Ministerio de Trabajo' },
  { cifra: '21', texto: 'cargos en el Comité Ejecutivo Nacional' },
  { cifra: '30%', texto: 'mínimo de mujeres en actos, elecciones y comisiones' },
  { cifra: '3', texto: 'redes internacionales: CSI, CSA y CCSA' },
];

const recursos: { titulo: string; texto: string; href: string; icono: NombreIcono }[] = [
  { titulo: 'Red Nacional', texto: 'La central en las 25 regiones del país.', href: '/red-nacional', icono: 'mapa' },
  { titulo: 'Observatorio Laboral', texto: 'Cifras oficiales para negociar con evidencia.', href: '/observatorio', icono: 'grafico' },
  { titulo: 'Estatuto explicado', texto: 'Los 55 artículos con buscador.', href: '/estatuto', icono: 'documento' },
];

const servicios: { texto: string; icono: NombreIcono }[] = [
  { texto: 'Declaración de cuotas', icono: 'moneda' },
  { texto: 'Asesoría legal por tickets', icono: 'mensaje' },
  { texto: 'Escuela Sindical con 4 cursos', icono: 'libro' },
  { texto: 'Modelos de actas y cartas', icono: 'documento' },
];

export default function Home() {
  const todas = obtenerNoticias();
  const principal = todas.find((noticia) => noticia.destacada) ?? todas[0];
  const secundarias = todas.filter((noticia) => noticia !== principal).slice(0, 3);

  return (
    <>
      {/* PORTADA */}
      <LuzCursor className="fondo-indigo overflow-hidden text-white">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-40 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-44 lg:pt-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/85">
              <span aria-hidden="true" className="size-2 rounded-full bg-rojo" />
              Organización sindical de tercer grado
            </p>
            <h1 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Por el Trabajo Decente y <span className="text-[#ff8a80]">Desarrollo Sostenible</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Defendemos los derechos laborales, sociales y culturales de los trabajadores del sector privado, público y autoempleados de todo el Perú.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/afiliacion" className="rounded-full bg-rojo px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-black/25 transition-colors hover:bg-rojo-oscuro">
                Afiliarme ahora
              </Link>
              <Link href="/noticias" className="rounded-full bg-white/10 px-7 py-3.5 text-center font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white hover:text-tinta">
                Ver comunicados
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span>Afiliada a</span>
              <Image src="/CSI.png" alt="CSI, Confederación Sindical Internacional" width={40} height={40} loading="eager" className="rounded-lg bg-white p-1" />
              <Image src="/CSA.png" alt="CSA, Confederación Sindical de Trabajadores y Trabajadoras de las Américas" width={40} height={40} loading="eager" className="rounded-lg bg-white p-1" />
              <span className="font-semibold text-white/85">y CCSA</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-md">
            <MapaPeru conRegiones />
            <p className="absolute left-[2%] top-[56%] flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-xs font-semibold text-tinta shadow-xl sm:text-sm">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-rojo" />
              Sede principal · Lima
            </p>
            <p className="absolute right-0 top-[14%] rounded-2xl bg-white/12 px-3.5 py-2.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md sm:text-sm">
              Presencia en las 25 regiones
            </p>
          </div>
        </section>
      </LuzCursor>

      {/* TAREAS RÁPIDAS */}
      <nav aria-labelledby="que-necesitas" className="relative mx-auto -mt-28 max-w-6xl px-4 sm:px-6">
        <h2 id="que-necesitas" className="mb-3 text-sm font-semibold text-white">¿Qué necesitas hacer?</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tareas.map((tarea, indice) => (
            <li key={tarea.href}>
              <Link href={tarea.href} className="group flex h-full flex-col rounded-3xl bg-white p-5 shadow-xl shadow-tinta/10 ring-1 ring-linea transition-all hover:-translate-y-1 hover:shadow-2xl">
                <span className={`flex size-12 items-center justify-center rounded-2xl ${indice === 0 ? 'bg-rojo text-white' : 'bg-niebla text-tinta'} transition-colors group-hover:bg-tinta group-hover:text-white`}>
                  <Icono nombre={tarea.icono} className="size-6" />
                </span>
                <span className="mt-4 flex items-center justify-between gap-2 font-titulo text-lg font-semibold text-tinta">
                  {tarea.titulo}
                  <Icono nombre="flecha" className="size-5 text-tenue transition-transform group-hover:translate-x-1 group-hover:text-rojo" />
                </span>
                <span className="mt-1 text-sm leading-relaxed text-tenue">{tarea.texto}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* DATOS */}
      <section aria-label="La central en datos" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {datos.map((dato) => (
            <div key={dato.cifra} className="flex flex-col-reverse justify-end gap-1 border-l-2 border-rojo/70 pl-4 pr-2">
              <dt className="text-sm leading-snug text-tenue">{dato.texto}</dt>
              <dd className="font-titulo text-4xl font-semibold text-tinta">{dato.cifra}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ACTUALIDAD SINDICAL */}
      <section aria-labelledby="actualidad" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-rojo">Sala de Prensa</p>
            <h2 id="actualidad" className="mt-1 text-3xl font-semibold sm:text-4xl">Actualidad Sindical</h2>
          </div>
          <Link href="/noticias" className="group flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-tinta shadow-sm ring-1 ring-linea hover:ring-tinta">
            Todas las noticias <Icono nombre="flecha" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {principal && (
          <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
            <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl">
              <PortadaNoticia titulo={principal.titulo} categoria={principal.categoria} portada={principal.portada} prioridad />
              <div className="p-6 sm:p-8">
                <p className="text-sm font-semibold text-rojo">{principal.categoria} · <span className="font-normal text-tenue">{principal.fechaTexto}</span></p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
                  <Link href={`/noticias/${principal.slug}`} className="after:absolute after:inset-0">{principal.titulo}</Link>
                </h3>
                <p className="mt-3 line-clamp-3 leading-relaxed text-tenue">{principal.resumen}</p>
              </div>
            </article>

            <ul className="flex flex-col gap-4">
              {secundarias.map((noticia) => (
                <li key={noticia.slug} className="grow">
                  <article className="group relative flex h-full gap-4 overflow-hidden rounded-3xl bg-white p-3 shadow-sm transition-shadow hover:shadow-xl">
                    <PortadaNoticia titulo={noticia.titulo} categoria={noticia.categoria} portada={noticia.portada} className="aspect-square w-28 shrink-0 rounded-2xl sm:w-32 [&>span]:hidden" tamanos="8rem" />
                    <div className="flex min-w-0 flex-col justify-center py-1 pr-2">
                      <p className="text-xs font-semibold text-rojo">{noticia.categoria} · <span className="font-normal text-tenue">{noticia.fechaTexto}</span></p>
                      <h3 className="mt-1 line-clamp-3 font-semibold leading-snug">
                        <Link href={`/noticias/${noticia.slug}`} className="after:absolute after:inset-0">{noticia.titulo}</Link>
                      </h3>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* SELECTOR "SOY..." */}
      <section className="mt-20 border-y border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold text-rojo">Para cada trabajador y trabajadora</p>
          <h2 className="mt-1 text-3xl font-semibold sm:text-4xl">¿Cómo te acompaña la central?</h2>
          <p className="mb-6 mt-2 text-tenue">Elige tu situación.</p>
          <SelectorPerfil />
        </div>
      </section>

      {/* RECURSOS */}
      <section aria-labelledby="recursos" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="text-sm font-semibold text-rojo">Información útil</p>
        <h2 id="recursos" className="mt-1 text-3xl font-semibold sm:text-4xl">Más recursos</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {recursos.map((recurso) => (
            <Link key={recurso.href} href={recurso.href} className="group flex items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-linea transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-niebla text-tinta transition-colors group-hover:bg-tinta group-hover:text-white">
                <Icono nombre={recurso.icono} className="size-6" />
              </span>
              <span>
                <span className="block font-titulo text-lg font-semibold text-tinta">{recurso.titulo}</span>
                <span className="mt-1 block text-sm leading-relaxed text-tenue">{recurso.texto}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* AFILIACIÓN E INTRANET */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-20">
        <div className="grid overflow-hidden rounded-3xl shadow-xl lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-8 bg-rojo p-8 text-white sm:p-10">
            <div>
              <h2 className="text-3xl font-semibold text-white">Organízate.</h2>
              <p className="mt-3 max-w-md leading-relaxed text-white/90">Afilia a tu sindicato o afíliate de forma individual. La solicitud toma pocos minutos.</p>
            </div>
            <Link href="/afiliacion" className="w-fit rounded-full bg-white px-6 py-3 font-semibold text-rojo-oscuro transition-colors hover:bg-fondo">
              Empezar mi afiliación
            </Link>
          </div>
          <div className="fondo-indigo flex flex-col justify-between gap-8 p-8 text-white sm:p-10">
            <div>
              <h2 className="flex items-center gap-2 text-3xl font-semibold text-white">
                <Icono nombre="candado" className="size-7" /> Intranet de Bases
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {servicios.map((servicio) => (
                  <li key={servicio.texto} className="flex items-center gap-2.5 text-white/90">
                    <Icono nombre={servicio.icono} className="size-5 text-white/70" />
                    {servicio.texto}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/intranet/login" className="w-fit rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white hover:text-tinta">
              Ingresar a la intranet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
