'use client';

import { useState } from 'react';
import { estatuto } from '../_datos/estatuto';

const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function GuiaEstatuto() {
  const [busqueda, setBusqueda] = useState('');
  const [abierto, setAbierto] = useState(estatuto[0].id);
  const termino = normalizar(busqueda.trim());

  const visibles = estatuto
    .map((titulo) => ({
      ...titulo,
      puntos: titulo.puntos.filter((punto) => normalizar(`${titulo.titulo} ${punto.articulo} ${punto.texto}`).includes(termino)),
    }))
    .filter((titulo) => titulo.puntos.length > 0);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <nav aria-label="Títulos del Estatuto" className="sticky top-24 hidden lg:block">
        <ul className="space-y-1">
          {estatuto.map((titulo) => (
            <li key={titulo.id}>
              <button
                type="button"
                aria-pressed={abierto === titulo.id}
                onClick={() => setAbierto(titulo.id)}
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-tinta transition-colors hover:bg-white aria-pressed:bg-tinta aria-pressed:text-white"
              >
                {titulo.numero}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <label htmlFor="buscar-estatuto" className="block text-sm font-semibold text-tinta">Busca un tema</label>
        <input
          id="buscar-estatuto"
          type="search"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder="Ej. cuota, delegados, Congreso"
          className="mt-2 w-full rounded-full border border-linea bg-white px-5 py-3 outline-none focus:ring-2 focus:ring-violeta"
        />

        <div className="mt-6 space-y-3">
          {visibles.length === 0 && <p className="rounded-2xl bg-white p-6 text-tenue">No encontramos ese tema en la guía.</p>}
          {visibles.map((titulo) => {
            const desplegado = termino !== '' || abierto === titulo.id;
            return (
              <section key={titulo.id} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <h2 className="text-lg">
                  <button
                    type="button"
                    aria-expanded={desplegado}
                    onClick={() => setAbierto(desplegado && termino === '' ? '' : titulo.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span>
                      <span className="block font-sans text-xs font-semibold text-rojo">{titulo.numero} · {titulo.articulos}</span>
                      <span className="mt-1 block font-semibold leading-snug">{titulo.titulo}</span>
                      <span className="mt-1 block font-sans text-sm font-normal text-tenue">{titulo.resumen}</span>
                    </span>
                    <span aria-hidden="true" className={`mt-1 text-xl transition-transform ${desplegado ? 'rotate-45' : ''}`}>+</span>
                  </button>
                </h2>
                {desplegado && (
                  <ul className="aparece divide-y divide-linea px-5 pb-3 sm:px-6">
                    {titulo.puntos.map((punto) => (
                      <li key={punto.texto} className="flex items-baseline justify-between gap-4 py-3">
                        <span className="leading-relaxed">{punto.texto}</span>
                        <span className="shrink-0 rounded-full bg-niebla px-2.5 py-1 text-xs font-semibold text-tinta">{punto.articulo}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
