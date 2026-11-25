import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacidad' };

const puntos = [
  { titulo: 'Qué datos se piden', texto: 'Datos de contacto y de la organización, y en la afiliación individual los datos personales necesarios para la ficha. La afiliación sindical es información sensible.' },
  { titulo: 'Para qué se usan', texto: 'Para evaluar la solicitud de afiliación, mantener el padrón y brindar los servicios de la central.' },
  { titulo: 'Quién accede', texto: 'Únicamente las personas autorizadas de la central. Los datos no se venden ni se ceden con fines comerciales.' },
  { titulo: 'Tus derechos', texto: 'Puedes solicitar el acceso, la rectificación o la cancelación de tus datos, conforme a la Ley 29733 de Protección de Datos Personales.' },
];

export default function Privacidad() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold">Política de Privacidad</h1>
      <p className="mt-4 rounded-2xl bg-white p-5 text-sm leading-relaxed text-tenue shadow-sm">
        Borrador pendiente de revisión legal. Debe completarse con el responsable del tratamiento y el canal oficial de contacto antes de publicar el sitio.
      </p>
      <div className="mt-8 space-y-6">
        {puntos.map((punto) => (
          <section key={punto.titulo}>
            <h2 className="text-xl font-semibold">{punto.titulo}</h2>
            <p className="mt-2 leading-relaxed">{punto.texto}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
