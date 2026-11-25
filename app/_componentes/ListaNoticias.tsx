'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Noticia } from '../_datos/noticias';
import Icono from './Icono';
import PortadaNoticia from './PortadaNoticia';

const porPagina = 9;

export default function ListaNoticias({ noticias }: { noticias: Noticia[] }) {
  const [categoria, setCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [visibles, setVisibles] = useState(porPagina);

  const categorias = ['Todas', ...new Set(noticias.map((noticia) => noticia.categoria))];
  const termino = busqueda.trim().toLowerCase();
  const resultado = noticias.filter(
    (noticia) =>
      (categoria === 'Todas' || noticia.categoria === categoria) &&
      `${noticia.titulo} ${noticia.resumen}`.toLowerCase().includes(termino),
  );
  const filtrando = categoria !== 'Todas' || termino !== '';
  const [principal, ...resto] = filtrando ? [undefined, ...resultado] : resultado;
  const mostradas = resto.slice(0, visibles);

  const elegirCategoria = (opcion: string) => {
    setCategoria(opcion);
    setVisibles(porPagina);
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {categorias.map((opcion) => (
            <button
              key={opcion}
              type="button"
              aria-pressed={categoria === opcion}
              onClick={() => elegirCategoria(opcion)}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-tinta ring-1 ring-linea transition-colors hover:ring-tinta aria-pressed:bg-tinta aria-pressed:text-white aria-pressed:ring-tinta"
            >
              {opcion}
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <label htmlFor="buscar-noticia" className="sr-only">Buscar noticias</label>
          <input
            id="buscar-noticia"
            type="search"
            value={busqueda}
            onChange={(evento) => {
              setBusqueda(evento.target.value);
              setVisibles(porPagina);
            }}
            placeholder="Buscar noticias"
            className="w-full rounded-full border border-linea bg-fondo px-5 py-2.5 outline-none focus:ring-2 focus:ring-violeta"
          />
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-tenue">{resultado.length} {resultado.length === 1 ? 'noticia' : 'noticias'}</p>

      {resultado.length === 0 && <p className="mt-4 rounded-3xl bg-white p-8 text-center text-tenue">No encontramos noticias con esa búsqueda.</p>}

      {principal && (
        <article className="group relative mt-4 grid overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl lg:grid-cols-[1.2fr_1fr]">
          <PortadaNoticia titulo={principal.titulo} categoria={principal.categoria} portada={principal.portada} className="aspect-[16/9] lg:aspect-auto lg:min-h-80" prioridad />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold text-rojo">{principal.categoria} · <span className="font-normal text-tenue">{principal.fechaTexto}</span></p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
              <Link href={`/noticias/${principal.slug}`} className="after:absolute after:inset-0">{principal.titulo}</Link>
            </h2>
            <p className="mt-4 leading-relaxed text-tenue">{principal.resumen}</p>
            <p className="mt-6 flex items-center gap-1.5 font-semibold text-tinta">Leer noticia <Icono nombre="flecha" className="size-4 transition-transform group-hover:translate-x-1" /></p>
          </div>
        </article>
      )}

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mostradas.map((noticia) => noticia && (
          <article key={noticia.slug} className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <PortadaNoticia titulo={noticia.titulo} categoria={noticia.categoria} portada={noticia.portada} tamanos="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
            <div className="flex grow flex-col p-6">
              <p className="text-xs font-semibold text-rojo">{noticia.categoria} · <span className="font-normal text-tenue">{noticia.fechaTexto}</span></p>
              <h3 className="mt-2 text-lg font-semibold leading-snug">
                <Link href={`/noticias/${noticia.slug}`} className="after:absolute after:inset-0">{noticia.titulo}</Link>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-tenue">{noticia.resumen}</p>
            </div>
          </article>
        ))}
      </div>

      {resto.length > visibles && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setVisibles(visibles + porPagina)} className="rounded-full bg-tinta px-7 py-3 font-semibold text-white transition-colors hover:bg-tinta-suave">
            Ver más noticias
          </button>
        </div>
      )}
    </>
  );
}
