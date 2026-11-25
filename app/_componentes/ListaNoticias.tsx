'use client';

import Link from 'next/link';
import { useState } from 'react';
import { noticias } from '../_datos/noticias';

const categorias = ['Todas', ...new Set(noticias.map((noticia) => noticia.categoria))];

export default function ListaNoticias() {
  const [categoria, setCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  const termino = busqueda.trim().toLowerCase();
  const resultado = noticias.filter(
    (noticia) =>
      (categoria === 'Todas' || noticia.categoria === categoria) &&
      `${noticia.titulo} ${noticia.resumen}`.toLowerCase().includes(termino),
  );
  const [principal, ...resto] = resultado;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="buscar-noticia" className="sr-only">Buscar noticias</label>
          <input
            id="buscar-noticia"
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar noticias"
            className="w-full max-w-md rounded-full border border-linea bg-white px-5 py-3 outline-none focus:ring-2 focus:ring-violeta"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {categorias.map((opcion) => (
            <button
              key={opcion}
              type="button"
              aria-pressed={categoria === opcion}
              onClick={() => setCategoria(opcion)}
              className="rounded-full bg-white px-3.5 py-2 text-sm font-medium text-tinta shadow-sm transition-colors hover:bg-tinta hover:text-white aria-pressed:bg-tinta aria-pressed:text-white"
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>

      {!principal && <p className="mt-8 rounded-2xl bg-white p-6 text-tenue">No encontramos noticias con esa búsqueda.</p>}

      {principal && (
        <article className="group relative mt-8 rounded-3xl bg-linear-to-br from-tinta to-violeta p-8 text-white md:p-10">
          <p className="text-sm font-semibold text-white/80">{principal.categoria} · {principal.fecha}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-4xl">
            <Link href={`/noticias/${principal.slug}`} className="after:absolute after:inset-0">{principal.titulo}</Link>
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/85">{principal.resumen}</p>
          <p className="mt-5 font-semibold">Leer comunicado &rarr;</p>
        </article>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resto.map((noticia) => (
          <article key={noticia.slug} className="group relative flex flex-col rounded-3xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5">
            <p className={`text-xs font-semibold ${noticia.color}`}>{noticia.categoria}</p>
            <h3 className="mt-3 text-xl font-semibold leading-snug">
              <Link href={`/noticias/${noticia.slug}`} className="after:absolute after:inset-0">{noticia.titulo}</Link>
            </h3>
            <p className="mt-3 grow text-sm leading-relaxed text-tenue">{noticia.resumen}</p>
            <p className="mt-5 text-xs text-tenue">{noticia.fecha}</p>
          </article>
        ))}
      </div>
    </>
  );
}
