import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Observatorio Laboral',
  description: 'Cifras públicas sobre el trabajo en el Perú, con su fuente.',
};

const indicadores = [
  { cifra: '70,7%', titulo: 'Empleo informal', texto: 'De la población ocupada del Perú, entre abril de 2024 y marzo de 2025.', fuente: 'INEI, Informe Técnico mayo 2025', url: 'https://www.inei.gob.pe/media/MenuRecursivo/boletines/informe-tecnico_empleonacional_1.pdf' },
  { cifra: '75,9%', titulo: 'Ingreso de las mujeres', texto: 'Proporción del ingreso de las mujeres frente al de los hombres, en el mismo período.', fuente: 'INEI, Informe Técnico mayo 2025', url: 'https://www.inei.gob.pe/media/MenuRecursivo/boletines/informe-tecnico_empleonacional_1.pdf' },
  { cifra: 'S/ 1,230', titulo: 'Remuneración Mínima Vital', texto: 'Vigente desde el 1 de octubre de 2026 para el régimen laboral privado.', fuente: 'D.S. 015-2026-TR, El Peruano', url: 'https://busquedas.elperuano.pe/dispositivo/EX/2559163-1' },
  { cifra: '4,9%', titulo: 'Sindicalización privada', texto: 'Trabajadores del sector privado formal afiliados a un sindicato, dato de 2022.', fuente: 'MTPE, Boletín de Economía Laboral 55', url: 'https://cdn.www.gob.pe/uploads/document/file/5901883/5233379-bel-55-la-sindicalizacion-en-el-sector-privado-formal.pdf' },
];

const seguimiento = [
  { titulo: 'Segundo tramo de la RMV', texto: 'El D.S. 015-2026-TR prevé S/ 70 adicionales, mediante un decreto a emitirse en el primer semestre de 2027.' },
  { titulo: 'Negociación en el sector estatal', texto: 'La Ley 31188 regula la negociación colectiva en el Estado.' },
];

export default function Observatorio() {
  return (
    <>
      <section className="fondo-indigo text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Observatorio Laboral</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/80">Datos públicos para argumentar con evidencia en cada negociación. Cada cifra indica su fuente y período.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {indicadores.map((indicador) => (
            <article key={indicador.titulo} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">{indicador.titulo}</h2>
              <p className="mt-2 font-titulo text-5xl font-semibold text-tinta">{indicador.cifra}</p>
              <p className="mt-3 grow leading-relaxed">{indicador.texto}</p>
              <a href={indicador.url} target="_blank" rel="noreferrer" className="mt-4 text-sm font-semibold text-tenue underline">Fuente: {indicador.fuente}</a>
            </article>
          ))}
        </div>

        <section aria-labelledby="seguimiento" className="mt-8 rounded-3xl bg-tinta p-6 text-white sm:p-8">
          <h2 id="seguimiento" className="text-2xl font-semibold text-white">Normas en seguimiento</h2>
          <ul className="mt-4 space-y-4">
            {seguimiento.map((norma) => (
              <li key={norma.titulo}>
                <p className="font-semibold">{norma.titulo}</p>
                <p className="mt-1 text-white/85">{norma.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-6 text-sm leading-relaxed text-tenue">
          ¿Quieres usar estos datos? Aprende a prepararte para negociar en la <Link href="/intranet/campus/derechos-laborales-pliegos" className="font-semibold text-tinta underline">Escuela Sindical</Link>.
        </p>
      </div>
    </>
  );
}
