'use client';

import { useState } from 'react';
import { modelos } from '../../../_datos/modelos';

export default function Modelos() {
  const [activo, setActivo] = useState(modelos[0].id);
  const [datos, setDatos] = useState<Record<string, string>>({});
  const [copiado, setCopiado] = useState(false);

  const modelo = modelos.find((item) => item.id === activo) ?? modelos[0];
  const texto = modelo.plantilla(datos);

  const copiar = async () => {
    await navigator.clipboard.writeText(texto);
    setCopiado(true);
  };

  const descargar = () => {
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([texto], { type: 'text/plain;charset=utf-8' }));
    enlace.download = `${modelo.id}.txt`;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-semibold">Modelos de Documentos</h1>
      <p className="mt-1 text-tenue">Completa los datos y obtén tu documento. Revísalo con tu asesoría antes de presentarlo.</p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Elige un modelo">
        {modelos.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === activo}
            onClick={() => {
              setActivo(item.id);
              setCopiado(false);
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-tinta shadow-sm transition-colors hover:bg-tinta hover:text-white aria-pressed:bg-rojo aria-pressed:text-white"
          >
            {item.titulo}
          </button>
        ))}
      </div>

      <div key={modelo.id} className="aparece mt-5 grid items-start gap-6 lg:grid-cols-2">
        <form className="rounded-3xl bg-white p-6 shadow-sm" onSubmit={(evento) => evento.preventDefault()}>
          <h2 className="text-xl font-semibold">{modelo.titulo}</h2>
          <p className="mt-1 text-sm text-tenue">{modelo.descripcion}</p>
          <div className="mt-4 space-y-3">
            {modelo.campos.map((campo) => (
              <div key={campo.id}>
                <label htmlFor={campo.id} className="text-sm font-semibold text-tinta">{campo.etiqueta}</label>
                {['agenda', 'acuerdos', 'informacion'].includes(campo.id) ? (
                  <textarea id={campo.id} rows={4} value={datos[campo.id] ?? ''} onChange={(evento) => setDatos({ ...datos, [campo.id]: evento.target.value })} className="mt-1 w-full rounded-xl border border-linea p-3 outline-none focus:ring-2 focus:ring-violeta" />
                ) : (
                  <input id={campo.id} value={datos[campo.id] ?? ''} onChange={(evento) => setDatos({ ...datos, [campo.id]: evento.target.value })} className="mt-1 w-full rounded-xl border border-linea p-3 outline-none focus:ring-2 focus:ring-violeta" />
                )}
              </div>
            ))}
          </div>
        </form>

        <section aria-label="Vista previa" className="rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
          <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-2xl bg-niebla p-4 font-sans text-sm leading-relaxed">{texto}</pre>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button type="button" onClick={copiar} className="rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-white">{copiado ? 'Copiado' : 'Copiar texto'}</button>
            <button type="button" onClick={descargar} className="rounded-full bg-niebla px-5 py-2.5 text-sm font-semibold text-tinta">Descargar</button>
          </div>
        </section>
      </div>
    </div>
  );
}
