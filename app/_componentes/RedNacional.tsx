'use client';

import Link from 'next/link';
import { useState } from 'react';
import { proyectar, puntosMapa, regiones } from '../_datos/mapa';

export default function RedNacional() {
  const [activa, setActiva] = useState('Lima');
  const region = regiones.find((item) => item.nombre === activa) ?? regiones[0];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="fondo-indigo rounded-3xl p-5">
        <svg viewBox="0 0 420 580" aria-hidden="true" className="mx-auto h-auto w-full max-w-md">
          {puntosMapa.map((punto) => (
            <circle key={punto.id} cx={punto.x} cy={punto.y} r={3} fill="#ffffff" opacity={0.25} />
          ))}
          {regiones.map((item) => {
            const [x, y] = proyectar(item.lon, item.lat);
            const elegida = item.nombre === activa;
            return (
              <g key={item.nombre} onClick={() => setActiva(item.nombre)} className="cursor-pointer">
                <circle cx={x} cy={y} r={15} fill="transparent" />
                <circle cx={x} cy={y} r={elegida ? 9 : 6} fill={elegida ? '#cf2118' : '#ffffff'} stroke={elegida ? '#ffffff' : '#cf2118'} strokeWidth={2.5} />
              </g>
            );
          })}
        </svg>
      </div>

      <div>
        <div key={region.nombre} className="aparece rounded-3xl bg-white p-6 shadow-lg">
          <p className="text-sm font-semibold text-rojo">Capital: {region.capital}</p>
          <h2 className="mt-1 text-3xl font-semibold">{region.nombre}</h2>
          <p className="mt-3 leading-relaxed">{region.cut ?? 'Datos de la CUT Regional por confirmar.'}</p>
          {region.contacto && <p className="mt-2 font-semibold text-tinta">{region.contacto}</p>}
          <Link href="/ayuda" className="mt-5 inline-block rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-white">Necesito orientación</Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Elige una región">
          {regiones.map((item) => (
            <button
              key={item.nombre}
              type="button"
              aria-pressed={item.nombre === activa}
              onClick={() => setActiva(item.nombre)}
              className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-tinta shadow-sm transition-colors hover:bg-tinta hover:text-white aria-pressed:bg-rojo aria-pressed:text-white"
            >
              {item.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
