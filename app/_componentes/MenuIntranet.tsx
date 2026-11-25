'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { sesionInicial, useAlmacen, type Sesion } from '../_datos/almacen';
import Logo from './Logo';

const enlaces = [
  { href: '/intranet/dashboard', texto: 'Inicio' },
  { href: '/intranet/pagos', texto: 'Pago de Cuotas' },
  { href: '/intranet/tickets', texto: 'Tickets de Asesoría' },
  { href: '/intranet/campus', texto: 'Campus Virtual' },
  { href: '/intranet/calendario', texto: 'Calendario' },
  { href: '/intranet/modelos', texto: 'Modelos' },
  { href: '/intranet/panel', texto: 'Panel de Secretaría' },
];

export default function MenuIntranet() {
  const pathname = usePathname();
  const router = useRouter();
  const [, setSesion] = useAlmacen<Sesion>('cut-sesion', sesionInicial);

  const cerrarSesion = () => {
    setSesion(null);
    router.push('/intranet/login');
  };

  return (
    <aside className="fondo-indigo sticky top-0 z-40 flex shrink-0 flex-col text-white md:h-screen md:w-60">
      <div className="flex items-center justify-between gap-4 p-4 md:block md:p-5">
        <Logo />
        <p className="text-xs font-medium text-white/75 md:mt-3">Portal de Bases</p>
      </div>

      <nav aria-label="Intranet" className="flex gap-1 overflow-x-auto px-3 pb-3 md:grow md:flex-col md:overflow-visible">
        {enlaces.map((enlace) => (
          <Link
            key={enlace.href}
            href={enlace.href}
            aria-current={pathname === enlace.href || pathname.startsWith(`${enlace.href}/`) ? 'page' : undefined}
            className="whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-rojo aria-[current=page]:text-white"
          >
            {enlace.texto}
          </Link>
        ))}
        <button type="button" onClick={cerrarSesion} className="whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 md:hidden">
          Salir
        </button>
      </nav>

      <div className="hidden border-t border-white/15 p-3 md:block">
        <button type="button" onClick={cerrarSesion} className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white">
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
