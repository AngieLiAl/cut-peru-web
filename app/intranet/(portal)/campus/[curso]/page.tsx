import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AulaCurso from '../../../../_componentes/AulaCurso';
import { cursos, obtenerCurso } from '../../../../_datos/cursos';

type Props = { params: Promise<{ curso: string }> };

export function generateStaticParams() {
  return cursos.map((curso) => ({ curso: curso.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { curso } = await params;
  return { title: obtenerCurso(curso)?.titulo ?? 'Curso' };
}

export default async function PaginaCurso({ params }: Props) {
  const { curso: slug } = await params;
  const curso = obtenerCurso(slug);
  if (!curso) notFound();

  return <AulaCurso curso={curso} />;
}
