'use client';

import Link from 'next/link';
import { useState } from 'react';
import { guia, type Resultado } from '../_datos/asistente';

export default function Asistente() {
  const [ruta, setRuta] = useState(['inicio']);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const paso = guia[ruta[ruta.length - 1]];

  const volver = () => {
    if (resultado) setResultado(null);
    else setRuta(ruta.slice(0, -1));
  };

  const reiniciar = () => {
    setRuta(['inicio']);
    setResultado(null);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg sm:p-8">
      {resultado ? (
        <div key={resultado.titulo} className="aparece">
          <p className="text-sm font-semibold text-rojo">Tu ruta</p>
          <h2 className="mt-1 text-3xl font-semibold">{resultado.titulo}</h2>
          <p className="mt-3 leading-relaxed">{resultado.texto}</p>
          <ol className="mt-5 space-y-3">
            {resultado.pasos.map((texto, indice) => (
              <li key={texto} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-tinta text-sm font-semibold text-white">{indice + 1}</span>
                {texto}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-2">
            {resultado.enlaces.map((enlace, indice) => (
              <Link key={enlace.href + enlace.texto} href={enlace.href} className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${indice === 0 ? 'bg-rojo text-white hover:bg-rojo-oscuro' : 'bg-niebla text-tinta hover:bg-linea'}`}>
                {enlace.texto}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-tenue">Orientación general. Para tu caso concreto, solicita asesoría.</p>
        </div>
      ) : (
        <fieldset key={ruta.join('/')} className="aparece">
          <legend className="font-titulo text-3xl font-semibold text-tinta">{paso.pregunta}</legend>
          <div className="mt-5 space-y-2">
            {paso.opciones.map((opcion) => (
              <button
                key={opcion.texto}
                type="button"
                onClick={() => (opcion.resultado ? setResultado(opcion.resultado) : setRuta([...ruta, opcion.siguiente!]))}
                className="flex w-full items-center justify-between gap-4 rounded-2xl bg-niebla p-4 text-left font-medium text-tinta transition-colors hover:bg-tinta hover:text-white"
              >
                {opcion.texto}
                <span aria-hidden="true">&rarr;</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {(ruta.length > 1 || resultado) && (
        <div className="mt-6 flex gap-4 border-t border-linea pt-4 text-sm font-semibold text-tinta">
          <button type="button" onClick={volver} className="hover:underline">&larr; Volver</button>
          <button type="button" onClick={reiniciar} className="hover:underline">Empezar de nuevo</button>
        </div>
      )}
    </div>
  );
}
