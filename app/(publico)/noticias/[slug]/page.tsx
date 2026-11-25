import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Compartir from '../../../_componentes/Compartir';
import Icono from '../../../_componentes/Icono';
import PortadaNoticia from '../../../_componentes/PortadaNoticia';
import TextoNoticia from '../../../_componentes/TextoNoticia';
import { obtenerNoticia, obtenerNoticias } from '../../../_datos/noticias';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return obtenerNoticias().map((noticia) => ({ slug: noticia.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noticia = obtenerNoticia(slug);
  if (!noticia) return { title: 'Noticia' };
  return {
    title: noticia.titulo,
    description: noticia.resumen,
    openGraph: { title: noticia.titulo, description: noticia.resumen, images: noticia.portada ? [noticia.portada] : undefined },
  };
}

export default function DetalleNoticia({ params }: Props) {
  return (
    <Suspense fallback={<div className="fondo-indigo h-80" />}>
      <ContenidoNoticia params={params} />
    </Suspense>
  );
}

async function ContenidoNoticia({ params }: Props) {
  const { slug } = await params;
  const noticia = obtenerNoticia(slug);
  if (!noticia) notFound();

  const relacionadas = obtenerNoticias().filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-3xl px-4 pb-40 pt-12 sm:px-6">
          <Link href="/noticias" className="flex w-fit items-center gap-1.5 text-sm font-semibold text-white/75 hover:text-white">
            <Icono nombre="flecha" className="size-4 rotate-180" /> Sala de Prensa
          </Link>
          <p className="mt-6 text-sm font-semibold text-white/80">{noticia.categoria} · {noticia.fechaTexto}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">{noticia.titulo}</h1>
          <p className="mt-3 text-white/75">Por {noticia.autor}</p>
        </div>
      </section>

      <article className="relative mx-auto -mt-32 max-w-3xl px-4 sm:px-6">
        <figure>
          <PortadaNoticia titulo={noticia.titulo} categoria={noticia.categoria} portada={noticia.portada} className="aspect-[16/9] rounded-3xl shadow-xl" tamanos="(min-width: 768px) 48rem, 100vw" prioridad />
          {noticia.pieDeFoto && <figcaption className="mt-2 text-sm text-tenue">{noticia.pieDeFoto}</figcaption>}
        </figure>
        <p className="mt-8 text-xl font-medium leading-relaxed text-tinta">{noticia.resumen}</p>
        <div className="mt-6 border-t border-linea pt-6">
          <TextoNoticia cuerpo={noticia.cuerpo} />
        </div>
        <div className="mt-10 border-t border-linea pt-6">
          <Compartir titulo={noticia.titulo} />
        </div>
      </article>

      <section aria-labelledby="relacionadas" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 id="relacionadas" className="text-2xl font-semibold">Más noticias</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {relacionadas.map((item) => (
            <article key={item.slug} className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <PortadaNoticia titulo={item.titulo} categoria={item.categoria} portada={item.portada} tamanos="(min-width: 768px) 33vw, 100vw" />
              <div className="p-5">
                <p className="text-xs text-tenue">{item.fechaTexto}</p>
                <h3 className="mt-1 font-semibold leading-snug">
                  <Link href={`/noticias/${item.slug}`} className="after:absolute after:inset-0">{item.titulo}</Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
