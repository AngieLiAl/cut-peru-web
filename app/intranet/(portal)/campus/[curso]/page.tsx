import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import AulaCurso from '../../../../_componentes/AulaCurso';
import { cursos, obtenerCurso } from '../../../../_datos/cursos';

type Props = { params: Promise<{ curso: string }> };

export function generateStaticParams() {
  return cursos.map((curso) => ({ curso: curso.slug }));
}

export const metadata: Metadata = { title: 'Escuela Sindical' };

export default function PaginaCurso({ params }: Props) {
  return (
    <Suspense fallback={<p className="p-10 text-tenue">Cargando curso…</p>}>
      <ContenidoCurso params={params} />
    </Suspense>
  );
}

async function ContenidoCurso({ params }: Props) {
  const { curso: slug } = await params;
  const curso = obtenerCurso(slug);
  if (!curso) notFound();

  return <AulaCurso curso={curso} />;
}
