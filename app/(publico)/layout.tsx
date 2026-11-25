import { ViewTransition } from 'react';
import BarraPublica from '../_componentes/BarraPublica';
import PiePagina from '../_componentes/PiePagina';

export default function LayoutPublico({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:bg-rojo focus:p-3 focus:font-bold focus:text-white">
        Saltar al contenido
      </a>
      <BarraPublica />
      <ViewTransition>
        <main id="contenido" className="grow">
          {children}
        </main>
      </ViewTransition>
      <PiePagina />
    </div>
  );
}
