import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { noticias } from '../../../_datos/noticias';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return noticias.map((noticia) => ({ slug: noticia.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noticia = noticias.find((item) => item.slug === slug);
  return { title: noticia?.titulo ?? 'Noticia', description: noticia?.resumen };
}

export default async function DetalleNoticia({ params }: Props) {
  const { slug } = await params;
  const noticia = noticias.find((item) => item.slug === slug);
  if (!noticia) notFound();

  const relacionadas = noticias.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Link href="/noticias" className="text-sm font-semibold text-white/80 hover:text-white">&larr; Sala de Prensa</Link>
          <p className="mt-6 text-sm font-semibold text-white/80">{noticia.categoria} · {noticia.fecha}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">{noticia.titulo}</h1>
          <p className="mt-3 text-sm text-white/80">Por: {noticia.autor}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-lg leading-relaxed">{noticia.resumen}</p>
        <p className="mt-6 rounded-2xl bg-white p-5 text-sm leading-relaxed text-tenue shadow-sm">
          Esta es una nota de ejemplo. El texto completo se publicará cuando la Secretaría de Comunicación entregue el contenido oficial.
        </p>
      </article>

      <section aria-labelledby="relacionadas" className="mx-auto max-w-3xl px-4 pb-14 sm:px-6">
        <h2 id="relacionadas" className="text-xl font-semibold">Más noticias</h2>
        <ul className="mt-4 divide-y divide-linea">
          {relacionadas.map((item) => (
            <li key={item.slug}>
              <Link href={`/noticias/${item.slug}`} className="block py-3 font-medium text-tinta hover:text-rojo">{item.titulo}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
