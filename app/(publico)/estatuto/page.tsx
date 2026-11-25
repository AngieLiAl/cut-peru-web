import type { Metadata } from 'next';
import GuiaEstatuto from '../../_componentes/GuiaEstatuto';

export const metadata: Metadata = {
  title: 'Estatuto',
  description: 'Guía del Estatuto de la CUT PERÚ en lenguaje sencillo.',
};

export default function Estatuto() {
  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-sm font-semibold text-white/75">Marco normativo</p>
          <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">El Estatuto, explicado</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Una guía en lenguaje sencillo de los 55 artículos que organizan la central. El texto oficial es el documento registrado ante el MTPE.
          </p>
          <a href="/estatuto.pdf" target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-tinta transition-colors hover:bg-niebla">
            Ver Estatuto completo (PDF, 6.4 MB)
          </a>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <GuiaEstatuto />
      </div>
    </>
  );
}
