import type { Metadata } from 'next';
import ListaNoticias from '../../_componentes/ListaNoticias';
import { obtenerNoticias } from '../../_datos/noticias';

export const metadata: Metadata = { title: 'Sala de Prensa' };

export default function Noticias() {
  // El cuerpo no se envía al navegador: la lista solo necesita los datos de cada tarjeta.
  const noticias = obtenerNoticias().map((noticia) => ({ ...noticia, cuerpo: '' }));

  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6">
          <p className="text-sm font-semibold text-white/70">Sala de Prensa</p>
          <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">Noticias y comunicados</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">Pronunciamientos oficiales, acción sindical y actualidad de la central.</p>
        </div>
      </section>
      <div className="relative mx-auto -mt-10 max-w-6xl px-4 pb-16 sm:px-6">
        <ListaNoticias noticias={noticias} />
      </div>
    </>
  );
}
