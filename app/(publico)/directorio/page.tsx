import type { Metadata } from 'next';
import DirectorioCen from '../../_componentes/DirectorioCen';
import { vigenciaMandato } from '../../_datos/cen';

export const metadata: Metadata = { title: 'Directorio CEN' };

export default function Directorio() {
  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6">
          <p className="text-sm font-semibold text-white/75">Estructura Orgánica</p>
          <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">Comité Ejecutivo Nacional</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Órgano de dirección permanente de la central, responsable de cumplir y hacer cumplir las resoluciones del Congreso y del Consejo Directivo Nacional.
          </p>
          <p className="mt-6 inline-block rounded-full bg-white/12 px-4 py-2 text-sm font-medium">
            Mandato inscrito ante el MTPE hasta el {vigenciaMandato}
          </p>
        </div>
      </section>
      <DirectorioCen />
    </>
  );
}
