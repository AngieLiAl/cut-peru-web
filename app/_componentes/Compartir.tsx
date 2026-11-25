'use client';

import { useState } from 'react';

export default function Compartir({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  const enlaceActual = () => window.location.href;

  const copiar = async () => {
    await navigator.clipboard.writeText(enlaceActual());
    setCopiado(true);
  };

  const abrir = (destino: 'whatsapp' | 'facebook') => {
    const enlace = encodeURIComponent(enlaceActual());
    const url = destino === 'whatsapp'
      ? `https://wa.me/?text=${encodeURIComponent(`${titulo} `)}${enlace}`
      : `https://www.facebook.com/sharer/sharer.php?u=${enlace}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-tinta">Compartir:</span>
      <button type="button" onClick={() => abrir('whatsapp')} className="rounded-full bg-[#1f8f4e] px-4 py-2 text-sm font-semibold text-white">WhatsApp</button>
      <button type="button" onClick={() => abrir('facebook')} className="rounded-full bg-[#1b5fc2] px-4 py-2 text-sm font-semibold text-white">Facebook</button>
      <button type="button" onClick={copiar} className="rounded-full bg-niebla px-4 py-2 text-sm font-semibold text-tinta">{copiado ? 'Enlace copiado' : 'Copiar enlace'}</button>
    </div>
  );
}
