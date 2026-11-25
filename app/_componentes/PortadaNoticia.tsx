import Image from 'next/image';
import Icono, { type NombreIcono } from './Icono';

const estilos: Record<string, { fondo: string; icono: NombreIcono }> = {
  Comunicado: { fondo: 'from-rojo to-rojo-oscuro', icono: 'megafono' },
  'Acción Sindical': { fondo: 'from-tinta to-violeta', icono: 'personas' },
  Educación: { fondo: 'from-violeta to-tinta', icono: 'libro' },
  'Mujer Trabajadora': { fondo: 'from-fuchsia-700 to-violeta', icono: 'afiliar' },
  Internacional: { fondo: 'from-tinta-profunda to-tinta', icono: 'globo' },
  Juventud: { fondo: 'from-violeta to-fuchsia-700', icono: 'ayuda' },
};

const estiloPorDefecto = { fondo: 'from-tinta to-tinta-profunda', icono: 'noticias' as NombreIcono };

type Props = {
  titulo: string;
  categoria: string;
  portada?: string;
  className?: string;
  tamanos?: string;
  prioridad?: boolean;
};

// Muestra la foto de la noticia o, si no tiene, una portada automática con los colores de la CUT.
export default function PortadaNoticia({ titulo, categoria, portada, className = 'aspect-[16/9]', tamanos = '(min-width: 1024px) 50vw, 100vw', prioridad = false }: Props) {
  if (portada) {
    return (
      <div className={`relative overflow-hidden bg-niebla ${className}`}>
        <Image src={portada} alt={titulo} fill sizes={tamanos} loading={prioridad ? 'eager' : 'lazy'} className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
    );
  }

  const estilo = estilos[categoria] ?? estiloPorDefecto;
  return (
    <div aria-hidden="true" className={`portada-automatica relative flex items-end overflow-hidden bg-linear-to-br p-5 ${estilo.fondo} ${className}`}>
      <Icono nombre={estilo.icono} className="absolute -right-6 -top-6 size-40 text-white/10 transition-transform duration-500 group-hover:scale-110" />
      <span className="relative flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
        <Icono nombre={estilo.icono} className="size-4" />
        {categoria}
      </span>
    </div>
  );
}
