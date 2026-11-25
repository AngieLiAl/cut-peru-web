'use client';

import Link from 'next/link';
import { useState } from 'react';
import { progresoInicial, useAlmacen, type Progreso } from '../_datos/almacen';
import type { Bloque, Curso, Leccion, Video } from '../_datos/cursos';

function ReproductorVideo({ video }: { video: Video }) {
  const [activo, setActivo] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl bg-tinta-profunda">
      <div className="aspect-video">
        {activo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.titulo}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        ) : (
          <button type="button" onClick={() => setActivo(true)} className="fondo-indigo flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-white">
            <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-rojo text-2xl">▶</span>
            <span className="font-titulo text-lg font-semibold">Reproducir video</span>
            <span className="max-w-md text-sm text-white/80">{video.titulo}</span>
          </button>
        )}
      </div>
      <figcaption className="flex flex-wrap justify-between gap-2 p-3 text-xs text-white/80">
        <span>Video externo · {video.canal}</span>
        <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="font-semibold underline">Ver en YouTube</a>
      </figcaption>
    </figure>
  );
}

function ContenidoBloque({ bloque }: { bloque: Bloque }) {
  const [visible, setVisible] = useState(false);

  switch (bloque.tipo) {
    case 'texto':
      return <p className="leading-relaxed">{bloque.texto}</p>;
    case 'clave':
      return (
        <div className="rounded-2xl border-l-4 border-rojo bg-niebla p-4">
          <p className="text-sm font-semibold text-tinta">Idea clave</p>
          <p className="mt-1 leading-relaxed">{bloque.texto}</p>
        </div>
      );
    case 'lista':
      return (
        <div>
          <h3 className="text-lg font-semibold">{bloque.titulo}</h3>
          <ul className="mt-2 space-y-2">
            {bloque.items.map((item) => (
              <li key={item} className="flex gap-2.5 leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-rojo" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'pasos':
      return (
        <div>
          <h3 className="text-lg font-semibold">{bloque.titulo}</h3>
          <ol className="mt-3 space-y-3">
            {bloque.items.map((item, indice) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-tinta text-sm font-semibold text-white">{indice + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      );
    case 'caso':
      return (
        <div className="rounded-2xl bg-tinta p-5 text-white">
          <h3 className="text-lg font-semibold text-white">{bloque.titulo}</h3>
          <p className="mt-2 leading-relaxed text-white/90">{bloque.texto}</p>
          {visible ? (
            <p className="aparece mt-3 rounded-xl bg-white/12 p-3 leading-relaxed">{bloque.solucion}</p>
          ) : (
            <button type="button" onClick={() => setVisible(true)} className="mt-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-tinta">Ver respuesta</button>
          )}
        </div>
      );
  }
}

function Evaluacion({ leccion, aprobada, onAprobar }: { leccion: Leccion; aprobada: boolean; onAprobar: () => void }) {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [corregida, setCorregida] = useState(false);

  const aciertos = leccion.evaluacion.filter((pregunta, indice) => respuestas[indice] === pregunta.correcta).length;
  const completa = Object.keys(respuestas).length === leccion.evaluacion.length;
  const perfecta = aciertos === leccion.evaluacion.length;

  const revisar = () => {
    setCorregida(true);
    if (perfecta) onAprobar();
  };

  return (
    <section aria-labelledby="evaluacion" className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 id="evaluacion" className="text-xl font-semibold">Comprueba lo aprendido</h2>
      <p className="mt-1 text-sm text-tenue">Responde todo correctamente para completar la lección. Puedes intentarlo las veces que quieras.</p>

      <div className="mt-5 space-y-6">
        {leccion.evaluacion.map((pregunta, indice) => (
          <fieldset key={pregunta.pregunta}>
            <legend className="font-semibold text-tinta">{indice + 1}. {pregunta.pregunta}</legend>
            <div className="mt-2 space-y-2">
              {pregunta.opciones.map((opcion, numero) => {
                const elegida = respuestas[indice] === numero;
                const correcta = numero === pregunta.correcta;
                const estado = corregida && elegida ? (correcta ? 'bg-emerald-100 ring-2 ring-emerald-600' : 'bg-red-50 ring-2 ring-rojo') : elegida ? 'bg-niebla ring-2 ring-violeta' : 'bg-niebla/60';
                return (
                  <label key={opcion} className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 text-sm ${estado}`}>
                    <input
                      type="radio"
                      name={`pregunta-${indice}`}
                      checked={elegida}
                      onChange={() => {
                        setRespuestas({ ...respuestas, [indice]: numero });
                        setCorregida(false);
                      }}
                      className="mt-0.5 accent-rojo"
                    />
                    {opcion}
                  </label>
                );
              })}
            </div>
            {corregida && respuestas[indice] !== undefined && (
              <p className="mt-2 text-sm leading-relaxed text-tenue">
                <strong className={respuestas[indice] === pregunta.correcta ? 'text-emerald-800' : 'text-rojo-oscuro'}>
                  {respuestas[indice] === pregunta.correcta ? 'Correcto.' : 'Revisa esta respuesta.'}
                </strong>{' '}
                {respuestas[indice] === pregunta.correcta ? pregunta.explicacion : 'Vuelve al contenido e inténtalo otra vez.'}
              </p>
            )}
          </fieldset>
        ))}
      </div>

      <button type="button" disabled={!completa} onClick={revisar} className="mt-5 rounded-full bg-rojo px-6 py-3 font-semibold text-white transition-colors hover:bg-rojo-oscuro disabled:cursor-not-allowed disabled:opacity-50">
        Revisar respuestas
      </button>
      <p aria-live="polite" className="mt-3 font-semibold text-tinta">
        {corregida && (perfecta ? '¡Lección completada!' : `Tienes ${aciertos} de ${leccion.evaluacion.length} correctas.`)}
        {!corregida && aprobada && 'Ya completaste esta lección.'}
      </p>
    </section>
  );
}

export default function AulaCurso({ curso }: { curso: Curso }) {
  const [progreso, setProgreso] = useAlmacen<Progreso>('cut-progreso', progresoInicial);
  const [indice, setIndice] = useState(0);
  const [nombre, setNombre] = useState('');
  const hechas = progreso[curso.slug] ?? [];
  const leccion = curso.lecciones[indice];
  const terminado = hechas.length === curso.lecciones.length;

  const aprobar = () => {
    setProgreso((actual) => {
      const lista = actual[curso.slug] ?? [];
      return lista.includes(leccion.id) ? actual : { ...actual, [curso.slug]: [...lista, leccion.id] };
    });
  };

  const irA = (nuevo: number) => {
    setIndice(nuevo);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="p-6 md:p-10">
      <Link href="/intranet/campus" className="text-sm font-semibold text-tenue hover:text-tinta">&larr; Escuela Sindical</Link>
      <div className={`mt-3 rounded-3xl bg-linear-to-br p-6 text-white ${curso.fondo}`}>
        <p className="text-sm font-semibold text-white/85">{curso.categoria} · {hechas.length} de {curso.lecciones.length} lecciones completadas</p>
        <h1 className="mt-1 text-3xl font-semibold text-white">{curso.titulo}</h1>
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <nav aria-label="Lecciones" className="lg:sticky lg:top-6">
          <ol className="space-y-1">
            {curso.lecciones.map((item, numero) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-current={numero === indice ? 'step' : undefined}
                  onClick={() => irA(numero)}
                  className="flex w-full items-start gap-3 rounded-xl p-3 text-left text-sm font-medium text-tinta transition-colors hover:bg-white aria-[current=step]:bg-white aria-[current=step]:shadow-sm"
                >
                  <span aria-hidden="true" className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${hechas.includes(item.id) ? 'bg-emerald-600 text-white' : 'bg-linea text-tinta'}`}>
                    {hechas.includes(item.id) ? '✓' : numero + 1}
                  </span>
                  <span>
                    {item.titulo}
                    <span className="sr-only">{hechas.includes(item.id) ? ' (completada)' : ''}</span>
                    <span className="block text-xs font-normal text-tenue">{item.minutos} min</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div key={leccion.id} className="aparece min-w-0 space-y-6">
          <article className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-rojo">Lección {indice + 1}</p>
            <h2 className="mt-1 text-2xl font-semibold">{leccion.titulo}</h2>
            <p className="mt-2 text-tenue"><strong className="text-tinta">Al terminar podrás:</strong> {leccion.objetivo}</p>
            <div className="mt-6 space-y-6">
              {leccion.bloques.map((bloque, numero) => <ContenidoBloque key={numero} bloque={bloque} />)}
              {leccion.video && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Mira y refuerza</h3>
                  <ReproductorVideo video={leccion.video} />
                </div>
              )}
            </div>
          </article>

          <Evaluacion leccion={leccion} aprobada={hechas.includes(leccion.id)} onAprobar={aprobar} />

          <div className="flex justify-between gap-3">
            {indice > 0 ? <button type="button" onClick={() => irA(indice - 1)} className="rounded-full bg-white px-5 py-2.5 font-semibold text-tinta shadow-sm">Anterior</button> : <span />}
            {indice < curso.lecciones.length - 1 && <button type="button" onClick={() => irA(indice + 1)} className="rounded-full bg-tinta px-5 py-2.5 font-semibold text-white">Siguiente lección</button>}
          </div>

          {terminado && (
            <section className="fondo-indigo rounded-3xl p-6 text-white">
              <h2 className="text-2xl font-semibold text-white">Curso completado</h2>
              <p className="mt-2 text-white/85">Escribe tu nombre para generar una constancia de participación de demostración.</p>
              <label htmlFor="nombre-constancia" className="mt-4 block text-sm font-semibold">Tu nombre</label>
              <input id="nombre-constancia" value={nombre} onChange={(evento) => setNombre(evento.target.value)} className="mt-1 w-full max-w-md rounded-xl bg-white p-3 text-tinta outline-none" />
              {nombre.trim() && (
                <div className="mt-5 rounded-2xl bg-white p-6 text-center text-tinta">
                  <p className="text-sm font-semibold text-tenue">Constancia de participación · Demostración</p>
                  <p className="mt-3 font-titulo text-2xl font-semibold">{nombre.trim()}</p>
                  <p className="mt-2">completó el curso <strong>{curso.titulo}</strong> de la Escuela Sindical CUT PERÚ.</p>
                </div>
              )}
            </section>
          )}

          <section aria-labelledby="fuentes" className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 id="fuentes" className="text-lg font-semibold">Fuentes del curso</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {curso.fuentes.map((fuente) => (
                <li key={fuente.url}>
                  <a href={fuente.url} target={fuente.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-tinta underline">{fuente.titulo}</a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-tenue">Material educativo. No reemplaza la asesoría legal; verifica las normas vigentes para cada caso.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
