import type { Metadata } from 'next';
import RedNacional from '../../_componentes/RedNacional';

export const metadata: Metadata = {
  title: 'Red Nacional',
  description: 'La CUT PERÚ en las regiones del país.',
};

export default function PaginaRedNacional() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold sm:text-5xl">Red Nacional</h1>
      <p className="mb-8 mt-3 max-w-2xl text-lg leading-relaxed text-tenue">
        La central tiene jurisdicción nacional. Elige una región para ver la información disponible. Mapa ilustrativo.
      </p>
      <RedNacional />
    </div>
  );
}
