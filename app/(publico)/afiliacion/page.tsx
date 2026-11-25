import type { Metadata } from 'next';
import FormularioAfiliacion from '../../_componentes/FormularioAfiliacion';

export const metadata: Metadata = { title: 'Afiliación' };

export default function Afiliacion() {
  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Únete a la central</h1>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Afilia a tu organización o afíliate de forma individual, paso a paso.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <FormularioAfiliacion />
      </div>
    </>
  );
}
