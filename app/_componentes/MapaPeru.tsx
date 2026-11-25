import { proyectar, puntosMapa } from '../_datos/mapa';

const [limaX, limaY] = proyectar(-77.03, -12.05);

export default function MapaPeru() {
  return (
    <svg viewBox="0 0 420 580" aria-hidden="true" className="h-auto w-full max-w-md">
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
      <circle cx={limaX} cy={limaY} r={7} fill="#cf2118" className="pulso-lima" />
      <circle cx={limaX} cy={limaY} r={6} fill="#ffffff" stroke="#cf2118" strokeWidth={3} />
    </svg>
  );
}
