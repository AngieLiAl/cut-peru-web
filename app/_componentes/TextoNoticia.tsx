import Image from 'next/image';
import type { ReactNode } from 'react';

// Convierte el Markdown sencillo de las noticias en elementos de React, sin insertar HTML.

function enLinea(texto: string): ReactNode[] {
  const partes: ReactNode[] = [];
  const patron = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let ultimo = 0;
  let coincidencia: RegExpExecArray | null;
  while ((coincidencia = patron.exec(texto))) {
    if (coincidencia.index > ultimo) partes.push(texto.slice(ultimo, coincidencia.index));
    const clave = partes.length;
    if (coincidencia[1]) partes.push(<strong key={clave} className="font-semibold text-tinta">{coincidencia[1]}</strong>);
    else if (coincidencia[2]) partes.push(<em key={clave}>{coincidencia[2]}</em>);
    else {
      const enlace = coincidencia[4];
      const externo = /^https?:\/\//.test(enlace);
      partes.push(
        <a key={clave} href={enlace} target={externo ? '_blank' : undefined} rel={externo ? 'noreferrer' : undefined} className="font-semibold text-rojo-oscuro underline underline-offset-2">
          {coincidencia[3]}
        </a>,
      );
    }
    ultimo = patron.lastIndex;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

export default function TextoNoticia({ cuerpo }: { cuerpo: string }) {
  const bloques = cuerpo.split(/\r?\n\s*\r?\n/).map((bloque) => bloque.trim()).filter(Boolean);

  return (
    <div className="space-y-5 text-lg leading-relaxed">
      {bloques.map((bloque, indice) => {
        const imagen = bloque.match(/^!\[(.*?)\]\((.+?)\)$/);
        if (imagen) {
          return (
            <figure key={indice}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-niebla">
                <Image src={imagen[2]} alt={imagen[1]} fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
              </div>
              {imagen[1] && <figcaption className="mt-2 text-sm text-tenue">{imagen[1]}</figcaption>}
            </figure>
          );
        }
        if (bloque.startsWith('### ')) return <h3 key={indice} className="pt-2 text-xl font-semibold">{enLinea(bloque.slice(4))}</h3>;
        if (bloque.startsWith('## ')) return <h2 key={indice} className="pt-3 text-2xl font-semibold">{enLinea(bloque.slice(3))}</h2>;
        if (bloque.startsWith('> ')) {
          return (
            <blockquote key={indice} className="border-l-4 border-rojo bg-white py-3 pl-5 pr-4 text-xl font-medium italic text-tinta">
              {enLinea(bloque.replace(/^> ?/gm, ''))}
            </blockquote>
          );
        }
        const lineas = bloque.split(/\r?\n/);
        if (lineas.every((linea) => /^[-*] /.test(linea))) {
          return (
            <ul key={indice} className="space-y-2">
              {lineas.map((linea) => (
                <li key={linea} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-rojo" />
                  <span>{enLinea(linea.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={indice}>{enLinea(lineas.join(' '))}</p>;
      })}
    </div>
  );
}
