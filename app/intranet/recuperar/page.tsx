import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '../../_componentes/Logo';

export const metadata: Metadata = { title: 'Recuperar contraseña' };

export default function Recuperar() {
  return (
    <div className="fondo-indigo flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="flex justify-center"><Logo className="h-14" /></div>
        <h1 className="mt-6 text-2xl font-semibold">Recuperar contraseña</h1>
        <p className="mt-3 leading-relaxed text-tenue">
          La recuperación automática se activará con la base de datos. Por ahora, tu organización debe solicitarla a la Secretaría de Organización de la central.
        </p>
        <Link href="/intranet/login" className="mt-6 inline-block rounded-full bg-tinta px-6 py-3 font-semibold text-white">Volver al inicio de sesión</Link>
      </div>
    </div>
  );
}
