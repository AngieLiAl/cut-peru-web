'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { sesionInicial, useAlmacen, type Sesion } from '../_datos/almacen';
import Icono, { type NombreIcono } from './Icono';
import Logo from './Logo';

const grupos: { titulo: string; enlaces: { href: string; texto: string; icono: NombreIcono }[] }[] = [
  {
    titulo: 'Mi organización',
    enlaces: [
      { href: '/intranet/dashboard', texto: 'Inicio', icono: 'casa' },
      { href: '/intranet/pagos', texto: 'Pago de Cuotas', icono: 'moneda' },
      { href: '/intranet/tickets', texto: 'Tickets de Asesoría', icono: 'mensaje' },
    ],
  },
  {
    titulo: 'Formación y recursos',
    enlaces: [
      { href: '/intranet/campus', texto: 'Campus Virtual', icono: 'libro' },
      { href: '/intranet/calendario', texto: 'Calendario', icono: 'calendario' },
      { href: '/intranet/modelos', texto: 'Modelos', icono: 'documento' },
    ],
  },
  {
    titulo: 'Gestión',
    enlaces: [{ href: '/intranet/panel', texto: 'Panel de Secretaría', icono: 'panel' }],
  },
];

export default function MenuIntranet() {
  const pathname = usePathname();
  const router = useRouter();
  const [sesion, setSesion] = useAlmacen<Sesion>('cut-sesion', sesionInicial);

  const cerrarSesion = () => {
    setSesion(null);
    router.push('/intranet/login');
  };

  const activo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="sticky top-0 z-40 flex shrink-0 flex-col bg-tinta-profunda text-white md:h-screen md:w-64">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4 md:block md:p-5">
        <Logo />
        <p className="text-xs font-medium text-white/60 md:mt-3">Intranet de Bases</p>
      </div>

      <nav aria-label="Intranet" className="flex gap-1 overflow-x-auto px-3 py-3 md:grow md:flex-col md:gap-5 md:overflow-y-auto md:py-5">
        {grupos.map((grupo) => (
          <div key={grupo.titulo} className="flex gap-1 md:flex-col">
            <p className="hidden px-3 pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white/45 md:block">{grupo.titulo}</p>
            {grupo.enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                aria-current={activo(enlace.href) ? 'page' : undefined}
                className="relative flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white aria-[current=page]:bg-white/12 aria-[current=page]:text-white md:aria-[current=page]:before:absolute md:aria-[current=page]:before:inset-y-2 md:aria-[current=page]:before:-left-3 md:aria-[current=page]:before:w-1 md:aria-[current=page]:before:rounded-r-full md:aria-[current=page]:before:bg-rojo"
              >
                <Icono nombre={enlace.icono} className="size-5 opacity-80" />
                {enlace.texto}
              </Link>
            ))}
          </div>
        ))}
        <button type="button" onClick={cerrarSesion} className="flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 md:hidden">
          <Icono nombre="salir" /> Salir
        </button>
      </nav>

      <div className="hidden border-t border-white/10 p-3 md:block">
        {sesion && <p className="truncate px-3 pb-2 text-xs text-white/50">Sesión: {sesion.usuario}</p>}
        <button type="button" onClick={cerrarSesion} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white">
          <Icono nombre="salir" /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
