'use client';

import Link from 'next/link';
import { progresoInicial, useAlmacen, type Progreso } from '../../../_datos/almacen';
import { cursos } from '../../../_datos/cursos';

const biblioteca = [
  { titulo: 'Estatuto de la CUT PERÚ', texto: 'Texto completo en PDF (6.4 MB).', href: '/estatuto.pdf', accion: 'Abrir PDF' },
  { titulo: 'Estatuto explicado', texto: 'Guía en lenguaje sencillo con buscador.', href: '/estatuto', accion: 'Abrir guía' },
  { titulo: 'Modelos de Documentos', texto: 'Actas, convocatorias y cartas listas para completar.', href: '/intranet/modelos', accion: 'Abrir modelos' },
  { titulo: 'Guía de Negociación Colectiva', texto: 'Del pliego al acuerdo, paso a paso.', href: '/intranet/campus/derechos-laborales-pliegos', accion: 'Abrir curso' },
];

export default function CampusVirtual() {
  const [progreso] = useAlmacen<Progreso>('cut-progreso', progresoInicial);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-semibold">Escuela Sindical</h1>
      <p className="mt-1 text-tenue">Formación sociopolítica y técnica, a tu ritmo. Tu avance se guarda en este navegador.</p>

      <h2 className="mt-8 text-xl font-semibold">Cursos disponibles</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {cursos.map((curso) => {
          const hechas = progreso[curso.slug]?.length ?? 0;
          const porcentaje = Math.round((hechas / curso.lecciones.length) * 100);
          const minutos = curso.lecciones.reduce((total, leccion) => total + leccion.minutos, 0);
          return (
            <article key={curso.slug} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className={`bg-linear-to-br p-6 text-white ${curso.fondo}`}>
                <p className="text-xs font-semibold text-white/85">{curso.categoria} · {curso.lecciones.length} lecciones · {minutos} min</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-white">{curso.titulo}</h3>
              </div>
              <div className="flex grow flex-col p-6">
                <p className="grow text-sm leading-relaxed text-tenue">{curso.descripcion}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-niebla" role="progressbar" aria-valuenow={porcentaje} aria-valuemin={0} aria-valuemax={100} aria-label={`Avance de ${curso.titulo}`}>
                  <div className="h-full rounded-full bg-rojo transition-all" style={{ width: `${porcentaje}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-tenue">{porcentaje}% completado</p>
                <Link href={`/intranet/campus/${curso.slug}`} className="mt-4 w-fit rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violeta">
                  {porcentaje === 0 ? 'Iniciar curso' : porcentaje === 100 ? 'Repasar curso' : 'Continuar curso'}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <h2 className="mt-10 text-xl font-semibold">Biblioteca y normativa</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {biblioteca.map((recurso) => (
          <Link key={recurso.titulo} href={recurso.href} className="rounded-2xl bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5">
            <span className="block font-titulo font-semibold text-tinta">{recurso.titulo}</span>
            <span className="mt-1 block text-sm text-tenue">{recurso.texto}</span>
            <span className="mt-3 block text-sm font-semibold text-rojo-oscuro">{recurso.accion} &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
