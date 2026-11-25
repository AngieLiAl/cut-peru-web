import Link from 'next/link';
import Logo from './_componentes/Logo';

export default function NoEncontrado() {
  return (
    <main className="fondo-indigo flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
      <Logo className="h-16" />
      <h1 className="mt-8 text-4xl font-semibold text-white">Esta página no existe</h1>
      <p className="mt-3 max-w-md text-white/80">Puede que el enlace haya cambiado. Vuelve al inicio para seguir navegando.</p>
      <Link href="/" className="mt-8 rounded-full bg-rojo px-7 py-3.5 font-semibold text-white transition-colors hover:bg-rojo-oscuro">
        Ir al inicio
      </Link>
    </main>
  );
}
