import Image from 'next/image';
import Link from 'next/link';
import { cacheLife } from 'next/cache';
import Logo from './Logo';

async function AnioActual() {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}

const columnas = [
  {
    titulo: 'La central',
    enlaces: [
      { href: '/directorio', texto: 'Directorio del CEN' },
      { href: '/noticias', texto: 'Sala de Prensa' },
      { href: '/estatuto', texto: 'Estatuto explicado' },
      { href: '/red-nacional', texto: 'Red Nacional' },
      { href: '/observatorio', texto: 'Observatorio Laboral' },
      { href: '/ayuda', texto: 'Ayuda y orientación' },
      { href: '/privacidad', texto: 'Política de Privacidad' },
    ],
  },
  {
    titulo: 'Área privada',
    enlaces: [
      { href: '/afiliacion', texto: 'Requisitos de Afiliación' },
      { href: '/intranet/login', texto: 'Acceso Intranet' },
    ],
  },
];

export default function PiePagina() {
  return (
    <footer className="fondo-indigo text-sm text-white/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-14" />
          <p className="mt-5 max-w-md leading-relaxed">
            Afiliada a la Confederación Sindical Internacional (CSI), a la Confederación Sindical de Trabajadores y Trabajadoras de las Américas (CSA) y a la Coordinadora de Centrales Sindicales Andinas (CCSA).
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Image src="/CSI.png" alt="Logo de la CSI" width={56} height={56} loading="eager" className="rounded-xl bg-white p-1" />
            <Image src="/CSA.png" alt="Logo de la CSA" width={56} height={56} loading="eager" className="rounded-xl bg-white p-1" />
          </div>
        </div>

        {columnas.map((columna) => (
          <div key={columna.titulo}>
            <h2 className="text-base font-semibold text-white">{columna.titulo}</h2>
            <ul className="mt-4 space-y-2.5">
              {columna.enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <Link href={enlace.href} className="transition-colors hover:text-white">
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-5 text-xs sm:px-6 md:flex-row">
          <p>© <AnioActual /> Central Unitaria de Trabajadores del Perú. Todos los derechos reservados.</p>
          <p>Registro Oficial Nº 001 – Folio Nº 001 – 98 – MTPE</p>
        </div>
      </div>
    </footer>
  );
}
