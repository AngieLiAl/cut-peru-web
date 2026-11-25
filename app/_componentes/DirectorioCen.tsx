'use client';

import { useState } from 'react';
import { areas, organos, presidencia, secretariaGeneral, secretarias, vicepresidencias, type Area, type Cargo } from '../_datos/cen';

const todos = [presidencia, ...vicepresidencias, ...secretariaGeneral, ...secretarias];

const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const iniciales = (nombre: string) => {
  const partes = nombre.split(' ');
  return partes[0][0] + partes[partes.length - 2][0];
};

function Ficha({ persona, onMover }: { persona: Cargo; onMover: (paso: number) => void }) {
  return (
    <div key={persona.id} className="aparece overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="fondo-indigo p-6 text-white">
        <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-2xl bg-rojo font-titulo text-2xl font-semibold">
          {iniciales(persona.nombre)}
        </span>
        <p className="mt-4 text-sm text-white/80">{persona.cargo}</p>
        <h3 className="mt-1 text-2xl font-semibold leading-tight text-white">{persona.nombre}</h3>
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold text-tinta">Funciones principales</p>
        <ul className="mt-3 space-y-2.5">
          {persona.funciones.map((funcion) => (
            <li key={funcion} className="flex gap-2.5 text-sm leading-relaxed">
              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rojo" />
              {funcion}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between gap-2">
          <button type="button" onClick={() => onMover(-1)} className="rounded-full bg-niebla px-4 py-2 text-sm font-semibold text-tinta transition-colors hover:bg-linea">
            &larr; Anterior
          </button>
          <button type="button" onClick={() => onMover(1)} className="rounded-full bg-niebla px-4 py-2 text-sm font-semibold text-tinta transition-colors hover:bg-linea">
            Siguiente &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DirectorioCen() {
  const [organo, setOrgano] = useState('cen');
  const [busqueda, setBusqueda] = useState('');
  const [area, setArea] = useState<Area | 'todas'>('todas');
  const [activa, setActiva] = useState(presidencia.id);

  const termino = normalizar(busqueda.trim());
  const coincide = (persona: Cargo) =>
    (area === 'todas' || persona.area === area) &&
    normalizar(`${persona.nombre} ${persona.cargo}`).includes(termino);

  const coincidencias = todos.filter(coincide);
  const seleccionada = coincidencias.find((persona) => persona.id === activa) ?? coincidencias[0] ?? presidencia;
  const organoActivo = organos.find((item) => item.id === organo) ?? organos[2];

  const mover = (paso: number) => {
    const lista = coincidencias.length > 0 ? coincidencias : todos;
    const actual = lista.findIndex((persona) => persona.id === seleccionada.id);
    setActiva(lista[(actual + paso + lista.length) % lista.length].id);
  };

  const nodo = (persona: Cargo, grande = false) => {
    const elegida = persona.id === seleccionada.id;
    const visible = coincide(persona);
    return (
      <div className={visible ? '' : 'opacity-30'}>
        <button
          type="button"
          aria-pressed={elegida}
          onClick={() => setActiva(persona.id)}
          className={`flex h-full w-full items-center gap-3 rounded-2xl p-3 text-left transition-all hover:-translate-y-0.5 ${elegida ? 'bg-rojo text-white shadow-lg' : 'bg-white shadow-sm hover:shadow-md'} ${grande ? 'sm:p-4' : ''}`}
        >
          <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full text-sm font-semibold ${grande ? 'size-12' : 'size-10'} ${elegida ? 'bg-white text-rojo' : 'bg-linear-to-br from-tinta to-violeta text-white'}`}>
            {iniciales(persona.nombre)}
          </span>
          <span className="min-w-0">
            <span className={`block text-xs font-semibold ${elegida ? 'text-white/85' : 'text-rojo'}`}>{persona.corto}</span>
            <span className={`block font-titulo font-semibold leading-tight ${grande ? 'text-base' : 'text-sm'} ${elegida ? 'text-white' : 'text-tinta'}`}>{persona.nombre}</span>
          </span>
        </button>
        {elegida && (
          <div className="mt-3 lg:hidden">
            <Ficha persona={seleccionada} onMover={mover} />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* CÓMO SE DECIDE */}
      <section aria-labelledby="como-decide" className="relative mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white p-5 shadow-lg sm:p-6">
          <h2 id="como-decide" className="text-xl font-semibold">Cómo se decide en la central</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {organos.map((item, indice) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === organo}
                onClick={() => setOrgano(item.id)}
                className="flex items-center gap-2 rounded-full bg-niebla px-3.5 py-2 text-sm font-semibold text-tinta transition-colors hover:bg-linea aria-pressed:bg-tinta aria-pressed:text-white"
              >
                <span aria-hidden="true" className="text-xs opacity-70">{indice + 1}</span>
                {item.nombre}
              </button>
            ))}
          </div>
          <div key={organoActivo.id} className="aparece mt-4 flex flex-col gap-2 border-t border-linea pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <p className="leading-relaxed"><span className="font-semibold text-tinta">{organoActivo.cuando}.</span> {organoActivo.texto}</p>
            <span className="shrink-0 text-xs font-semibold text-tenue">{organoActivo.articulo}</span>
          </div>
        </div>
      </section>

      {/* ORGANIGRAMA */}
      <section aria-labelledby="organigrama" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="organigrama" className="text-3xl font-semibold">Organigrama del CEN</h2>
        <p className="mt-2 text-tenue">Toca un cargo para conocer a la persona y sus funciones.</p>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="buscar-cargo" className="sr-only">Buscar por nombre o cargo</label>
            <input
              id="buscar-cargo"
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar por nombre o cargo"
              className="w-full max-w-md rounded-full border border-linea bg-white px-5 py-3 outline-none transition-shadow focus:ring-2 focus:ring-violeta"
            />
            <p aria-live="polite" className="mt-2 text-sm text-tenue">{coincidencias.length} de 21 cargos</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por área">
            {areas.map((opcion) => (
              <button
                key={opcion.id}
                type="button"
                aria-pressed={area === opcion.id}
                onClick={() => setArea(opcion.id)}
                className="rounded-full bg-white px-3.5 py-2 text-sm font-medium text-tinta shadow-sm transition-colors hover:bg-tinta hover:text-white aria-pressed:bg-tinta aria-pressed:text-white"
              >
                {opcion.texto}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div>
            <div className="mx-auto max-w-sm">{nodo(presidencia, true)}</div>

            <div aria-hidden="true" className="mx-auto h-6 w-px bg-linea" />
            <h3 className="mb-2 text-center text-sm font-semibold text-tenue">Vice-Presidencias</h3>
            <ul className="grid gap-3 sm:grid-cols-3">
              {vicepresidencias.map((persona) => <li key={persona.id}>{nodo(persona)}</li>)}
            </ul>

            <div aria-hidden="true" className="mx-auto h-6 w-px bg-linea" />
            <h3 className="mb-2 text-center text-sm font-semibold text-tenue">Secretaría General</h3>
            <ul className="mx-auto grid max-w-xl gap-3 sm:grid-cols-2">
              {secretariaGeneral.map((persona) => <li key={persona.id}>{nodo(persona)}</li>)}
            </ul>

            <div aria-hidden="true" className="mx-auto h-6 w-px bg-linea" />
            <h3 className="mb-2 text-center text-sm font-semibold text-tenue">Secretarías Nacionales</h3>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {secretarias.map((persona) => <li key={persona.id}>{nodo(persona)}</li>)}
            </ul>
          </div>

          <aside aria-label="Ficha del cargo seleccionado" className="sticky top-24 hidden lg:block">
            <Ficha persona={seleccionada} onMover={mover} />
          </aside>
        </div>
      </section>
    </>
  );
}
