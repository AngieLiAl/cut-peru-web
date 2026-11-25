import type { Metadata } from 'next';
import ListaNoticias from '../../_componentes/ListaNoticias';

export const metadata: Metadata = { title: 'Sala de Prensa' };

export default function Noticias() {
  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Sala de Prensa</h1>
          <p className="mt-3 text-lg text-white/80">Comunicados oficiales, pronunciamientos y actualidad sindical.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ListaNoticias />
      </div>
    </>
  );
}
