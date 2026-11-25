import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ className = 'h-11' }: { className?: string }) {
  return (
    <Link href="/" aria-label="CUT PERÚ, ir al inicio" className="inline-block">
      <Image
        src="/logo-cut-horizontal.png"
        alt="Logo de la CUT PERÚ"
        width={900}
        height={526}
        loading="eager"
        className={`w-auto ${className}`}
      />
    </Link>
  );
}
