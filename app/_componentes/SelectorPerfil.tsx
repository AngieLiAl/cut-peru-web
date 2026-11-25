'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

type Punto = { texto: string; articulo: string };

type Perfil = {
  id: string;
  etiqueta: string;
  titulo: string;
  puntos: Punto[];
  referente: string;
  accion: { texto: string; href: string };
};

const perfiles: Perfil[] = [
  {
    id: 'privado',
    etiqueta: 'Empresa privada',
    titulo: 'Tu sindicato no negocia solo.',
    puntos: [
      { texto: 'Asesoría para elaborar y tramitar pliegos de reclamos', articulo: 'Art. 33' },
      { texto: 'Representación en negociación colectiva si tu base lo solicita', articulo: 'Art. 34' },
      { texto: 'Acompañamiento en acciones de defensa sindical', articulo: 'Art. 9' },
    ],
    referente: 'Vice-Presidencia de trabajadores(as) de la Empresa Privada',
    accion: { texto: 'Afiliar a mi organización', href: '/afiliacion' },
  },
  {
    id: 'publico',
    etiqueta: 'Administración pública',
    titulo: 'Tus derechos también se defienden en el Estado.',
    puntos: [
      { texto: 'Defensa de tus derechos ante empleadores y autoridades', articulo: 'Art. 9' },
      { texto: 'Reivindicaciones canalizadas ante las instancias de gobierno', articulo: 'Art. 34' },
      { texto: 'Formación sindical y sociopolítica', articulo: 'Art. 8' },
    ],
    referente: 'Vice-Presidencia de trabajadores(as) de la Administración Pública',
    accion: { texto: 'Afiliar a mi organización', href: '/afiliacion' },
  },
  {
    id: 'autoempleado',
    etiqueta: 'Autoempleo',
    titulo: 'Trabajar por tu cuenta no es trabajar solo.',
    puntos: [
      { texto: 'Apoyo a microemprendimientos y pequeños negocios', articulo: 'Art. 34' },
      { texto: 'Ferias y capacitación productiva', articulo: 'Art. 34' },
      { texto: 'Afiliación individual, personal y voluntaria', articulo: 'Art. 11' },
    ],
    referente: 'Vice-Presidencia de trabajadores(as) Autoempleados',
    accion: { texto: 'Afiliarme', href: '/afiliacion' },
  },
  {
    id: 'pensionista',
    etiqueta: 'Pensionista o jubilado(a)',
    titulo: 'Tu lucha continúa después del trabajo.',
    puntos: [
      { texto: 'La central también te organiza y representa', articulo: 'Art. 3' },
      { texto: 'Planes y políticas públicas de seguridad social', articulo: 'Art. 34' },
      { texto: 'Afiliación individual, personal y voluntaria', articulo: 'Art. 11' },
    ],
    referente: 'Secretaría de Pensionistas y Jubilados',
    accion: { texto: 'Afiliarme', href: '/afiliacion' },
  },
  {
    id: 'joven',
    etiqueta: 'Joven buscando empleo',
    titulo: 'Tu primer empleo debe ser un empleo digno.',
    puntos: [
      { texto: 'Prioridad en afiliación, capacitación y participación', articulo: 'Art. 9' },
      { texto: 'Círculos de estudio y redes de jóvenes', articulo: 'Art. 34' },
      { texto: 'Escuelas de formación y capacitación técnica', articulo: 'Art. 8' },
    ],
    referente: 'Secretaría de la Juventud',
    accion: { texto: 'Afiliarme', href: '/afiliacion' },
  },
  {
    id: 'desempleado',
    etiqueta: 'Sin empleo',
    titulo: 'Quedarte sin trabajo no te deja sin derechos.',
    puntos: [
      { texto: 'La central también te organiza y representa', articulo: 'Art. 3' },
      { texto: 'Capacitación técnica y formación profesional', articulo: 'Art. 8' },
      { texto: 'Afiliación individual, personal y voluntaria', articulo: 'Art. 11' },
    ],
    referente: 'Secretaría de Promoción y Desarrollo Social',
    accion: { texto: 'Afiliarme', href: '/afiliacion' },
  },
];

export default function SelectorPerfil() {
  const [activo, setActivo] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const perfil = perfiles[activo];

  const moverConTeclado = (evento: React.KeyboardEvent, indice: number) => {
    const destinos: Record<string, number> = {
      ArrowDown: (indice + 1) % perfiles.length,
      ArrowRight: (indice + 1) % perfiles.length,
      ArrowUp: (indice - 1 + perfiles.length) % perfiles.length,
      ArrowLeft: (indice - 1 + perfiles.length) % perfiles.length,
      Home: 0,
      End: perfiles.length - 1,
    };
    const destino = destinos[evento.key];
    if (destino === undefined) return;

    evento.preventDefault();
    setActivo(destino);
    pestanas.current[destino]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Elige tu situación" className="flex flex-wrap gap-2">
        {perfiles.map((opcion, indice) => (
          <button
            key={opcion.id}
            ref={(elemento) => {
              pestanas.current[indice] = elemento;
            }}
            id={`pestana-${opcion.id}`}
            type="button"
            role="tab"
            aria-selected={indice === activo}
            aria-controls="panel-perfil"
            tabIndex={indice === activo ? 0 : -1}
            onClick={() => setActivo(indice)}
            onKeyDown={(evento) => moverConTeclado(evento, indice)}
            className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-tinta shadow-sm transition-colors hover:bg-tinta hover:text-white aria-selected:bg-rojo aria-selected:text-white"
          >
            {opcion.etiqueta}
          </button>
        ))}
      </div>

      <div
        key={perfil.id}
        id="panel-perfil"
        role="tabpanel"
        aria-labelledby={`pestana-${perfil.id}`}
        className="aparece mt-6 grid overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-[2fr_3fr]"
      >
        <div className="bg-linear-to-br from-tinta to-violeta p-6 sm:p-8">
          <h3 className="text-2xl font-semibold leading-snug text-white">{perfil.titulo}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">Te acompaña: {perfil.referente}</p>
          <Link href={perfil.accion.href} className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-tinta transition-colors hover:bg-niebla">
            {perfil.accion.texto}
          </Link>
        </div>
        <ul className="divide-y divide-linea self-center p-6 sm:p-8">
          {perfil.puntos.map((punto) => (
            <li key={punto.texto} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span className="leading-relaxed">{punto.texto}</span>
              <span className="shrink-0 rounded-full bg-niebla px-2.5 py-1 text-xs font-semibold text-tinta">{punto.articulo}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
