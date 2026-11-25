'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';

const enlaces = [
  { href: '/', texto: 'Inicio' },
  { href: '/noticias', texto: 'Noticias' },
  { href: '/directorio', texto: 'Directorio CEN' },
  { href: '/estatuto', texto: 'Estatuto' },
  { href: '/ayuda', texto: 'Asistente' },
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-tinta-profunda/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              aria-current={pathname === enlace.href ? 'page' : undefined}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/15 aria-[current=page]:text-white"
            >
              {enlace.texto}
            </Link>
          ))}
          <Link href="/intranet/login" className="ml-3 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-tinta">
            Intranet
          </Link>
          <Link href="/afiliacion" className="ml-2 rounded-full bg-rojo px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-rojo-oscuro">
            Afiliarse
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className="flex h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-medium text-white md:hidden"
        >
          <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={1.5} d={abierto ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
          {abierto ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Principal" className="aparece absolute inset-x-0 top-full border-b border-white/10 bg-tinta-profunda px-4 py-4 shadow-xl md:hidden">
          <ul className="space-y-1">
            {[...enlaces, { href: '/intranet/login', texto: 'Intranet' }].map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  aria-current={pathname === enlace.href ? 'page' : undefined}
                  className="block rounded-xl px-3 py-3 font-medium text-white aria-[current=page]:bg-white/15"
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
