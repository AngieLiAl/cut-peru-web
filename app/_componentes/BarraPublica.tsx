'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icono from './Icono';
import Logo from './Logo';

const enlaces = [
  { href: '/', texto: 'Inicio' },
  { href: '/noticias', texto: 'Noticias' },
  { href: '/directorio', texto: 'Directorio CEN' },
  { href: '/estatuto', texto: 'Estatuto' },
  { href: '/ayuda', texto: 'Ayuda' },
];

export default function BarraPublica() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!abierto) return;

    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setAbierto(false);
    };

    window.addEventListener('keydown', cerrarConEscape);
    return () => window.removeEventListener('keydown', cerrarConEscape);
  }, [abierto]);

  const actual = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-white/95 shadow-sm backdrop-blur-md">
      <div className="hidden bg-tinta-profunda text-xs text-white/75 md:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 sm:px-6">
          <p>Central Unitaria de Trabajadores del Perú · Registro Oficial Nº 001 – MTPE</p>
          <Link href="/intranet/login" className="flex items-center gap-1.5 font-semibold text-white hover:underline">
            <Icono nombre="candado" className="size-3.5" /> Intranet de Bases
          </Link>
        </div>
      </div>

      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              aria-current={actual(enlace.href) ? 'page' : undefined}
              className="relative px-3.5 py-2 text-sm font-semibold text-tenue transition-colors hover:text-tinta aria-[current=page]:text-tinta aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:-bottom-[1.15rem] aria-[current=page]:after:h-[3px] aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-rojo"
            >
              {enlace.texto}
            </Link>
          ))}
          <Link href="/afiliacion" className="ml-4 rounded-full bg-rojo px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-rojo/20 transition-colors hover:bg-rojo-oscuro">
            Afiliarse
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className="flex h-11 items-center gap-2 rounded-full border border-linea px-4 text-sm font-semibold text-tinta md:hidden"
        >
          <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={1.6} d={abierto ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
          {abierto ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Principal" className="aparece absolute inset-x-0 top-full border-b border-linea bg-white px-4 py-4 shadow-xl md:hidden">
          <ul className="space-y-1">
            {[...enlaces, { href: '/intranet/login', texto: 'Intranet de Bases' }].map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  aria-current={actual(enlace.href) ? 'page' : undefined}
                  className="block rounded-xl px-3 py-3 font-semibold text-tinta aria-[current=page]:bg-niebla"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/afiliacion"
            onClick={() => setAbierto(false)}
            className="mt-3 block rounded-xl bg-rojo p-3 text-center font-semibold text-white"
          >
            Afiliarse
          </Link>
        </nav>
      )}
    </header>
  );
}
