import { proyectar, puntosMapa, regiones } from '../_datos/mapa';

const [limaX, limaY] = proyectar(-77.03, -12.05);
const capitales = regiones.filter((region) => region.nombre !== 'Lima' && region.nombre !== 'Callao').map((region) => proyectar(region.lon, region.lat));

export default function MapaPeru({ conRegiones = false }: { conRegiones?: boolean }) {
  return (
    <svg viewBox="0 0 420 580" aria-hidden="true" className="h-auto w-full">
      {puntosMapa.map((punto) => (
        <circle
          key={punto.id}
          cx={punto.x}
          cy={punto.y}
          r={3.2}
          fill={punto.id % 11 === 0 ? '#ff6b5e' : '#ffffff'}
          className={punto.id % 5 === 0 ? 'punto-luz' : undefined}
          style={{ opacity: 0.32, animationDelay: `${(punto.id * 137) % 5000}ms` }}
        />
      ))}
      {conRegiones &&
        capitales.map(([x, y], indice) => (
          <circle key={indice} cx={x} cy={y} r={4.5} fill="#ffffff" className="punto-luz" style={{ opacity: 0.55, animationDelay: `${indice * 320}ms` }} />
        ))}
      <circle cx={limaX} cy={limaY} r={7} fill="#cf2118" className="pulso-lima" />
      <circle cx={limaX} cy={limaY} r={6} fill="#ffffff" stroke="#cf2118" strokeWidth={3} />
    </svg>
  );
}
