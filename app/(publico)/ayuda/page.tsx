import type { Metadata } from 'next';
import Asistente from '../../_componentes/Asistente';

export const metadata: Metadata = {
  title: 'Asistente',
  description: 'Responde unas preguntas y encuentra el trámite, curso o ayuda que necesitas.',
};

export default function Ayuda() {
  return (
    <div className="fondo-indigo min-h-[75vh] px-4 py-14 sm:px-6">
      <div className="mx-auto mb-8 max-w-2xl text-center text-white">
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">Te orientamos</h1>
        <p className="mt-3 text-lg text-white/80">Responde unas preguntas y te mostramos qué hacer.</p>
      </div>
      <Asistente />
    </div>
  );
}
