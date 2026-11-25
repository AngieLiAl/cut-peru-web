'use client';

import Link from 'next/link';
import { sesionInicial, useAlmacen, useMontado, type Sesion } from '../_datos/almacen';

// Simula el acceso en la demostración. La protección real requiere autenticación en el servidor.
export default function GuardiaDemo({ children }: { children: React.ReactNode }) {
  const montado = useMontado();
  const [sesion] = useAlmacen<Sesion>('cut-sesion', sesionInicial);

  if (!montado) return <p className="p-10 text-tenue">Cargando…</p>;

  if (!sesion) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-semibold">Inicia sesión para continuar</h1>
        <p className="mt-2 text-tenue">Esta sección es para organizaciones afiliadas.</p>
        <Link href="/intranet/login" className="mt-6 rounded-full bg-rojo px-6 py-3 font-semibold text-white">Ir al inicio de sesión</Link>
      </div>
    );
  }

  return children;
}
