'use client';

import { useRef } from 'react';

export default function LuzCursor({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const contenedor = useRef<HTMLDivElement>(null);

  const seguir = (evento: React.PointerEvent) => {
    const elemento = contenedor.current;
    if (!elemento) return;
    const caja = elemento.getBoundingClientRect();
    elemento.style.setProperty('--luz-x', `${evento.clientX - caja.left}px`);
    elemento.style.setProperty('--luz-y', `${evento.clientY - caja.top}px`);
  };

  return (
    <div ref={contenedor} onPointerMove={seguir} className={`luz-cursor ${className}`}>
      {children}
    </div>
  );
}
