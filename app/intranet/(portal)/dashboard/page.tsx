'use client';

import Link from 'next/link';
import { useState } from 'react';
import { calcularDelegados, pagosIniciales, progresoInicial, ticketsIniciales, useAlmacen, type Pago, type Progreso, type Ticket } from '../../../_datos/almacen';
import { cursos } from '../../../_datos/cursos';
import Icono, { type NombreIcono } from '../../../_componentes/Icono';

const afiliadosDemo = 120;

export default function Dashboard() {
  const [pagos] = useAlmacen<Pago[]>('cut-pagos', pagosIniciales);
  const [tickets] = useAlmacen<Ticket[]>('cut-tickets', ticketsIniciales);
  const [progreso] = useAlmacen<Progreso>('cut-progreso', progresoInicial);
  const [afiliados, setAfiliados] = useState(String(afiliadosDemo));

  const ultimoPago = pagos[0];
  const abiertos = tickets.filter((ticket) => ticket.estado !== 'Resuelto');
  const lecciones = cursos.reduce((total, curso) => total + curso.lecciones.length, 0);
  const completadas = Object.values(progreso).reduce((total, lista) => total + lista.length, 0);
  const delegados = calcularDelegados(Number(afiliados) || 0);

  const tarjetas: { titulo: string; valor: string; detalle: string; accion: string; href: string; icono: NombreIcono; estado?: string }[] = [
    { titulo: 'Cuotas Sindicales', valor: 'Al día', detalle: `Última declaración: ${ultimoPago.periodo}. Padrón de ${afiliadosDemo} afiliados.`, accion: 'Declarar nuevo pago', href: '/intranet/pagos', icono: 'moneda', estado: 'Cumplido' },
    { titulo: 'Tickets de Asesoría', valor: `${abiertos.length} en proceso`, detalle: abiertos[0]?.asunto ?? 'No tienes solicitudes abiertas.', accion: 'Ver mis tickets', href: '/intranet/tickets', icono: 'mensaje' },
    { titulo: 'Escuela Sindical', valor: `${completadas} de ${lecciones} lecciones`, detalle: 'Continúa tu formación en el Campus Virtual.', accion: 'Ir al Campus', href: '/intranet/campus', icono: 'libro' },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Bienvenido, Sindicato Base Sur</h1>
          <p className="mt-1 text-tenue">Organización de demostración · Sector Privado</p>
        </div>
        <p className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-tinta shadow-sm">
          <span aria-hidden="true" className="size-3 rounded-full bg-emerald-500" />
          Activo y habilitado
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.titulo} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-niebla text-tinta">
                <Icono nombre={tarjeta.icono} />
              </span>
              {tarjeta.estado && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">{tarjeta.estado}</span>}
            </div>
            <p className="mt-4 text-sm font-medium text-tenue">{tarjeta.titulo}</p>
            <p className="font-titulo text-2xl font-semibold text-tinta">{tarjeta.valor}</p>
            <p className="mt-2 grow text-sm leading-relaxed text-tenue">{tarjeta.detalle}</p>
            <Link href={tarjeta.href} className="group mt-5 flex w-fit items-center gap-1.5 text-sm font-semibold text-rojo-oscuro">
              {tarjeta.accion} <Icono nombre="flecha" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Tu habilitación</h2>
          <p className="mt-1 text-sm text-tenue">Art. 13 del Estatuto: las deudas o documentos desactualizados suspenden los derechos.</p>
          <ul className="mt-4 divide-y divide-linea">
            {['Cuotas al día', 'Junta directiva vigente', 'Padrón actualizado'].map((requisito) => (
              <li key={requisito} className="flex items-center justify-between py-2.5">
                {requisito}
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Cumplido</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Calculadora de delegados</h2>
          <p className="mt-1 text-sm text-tenue">Para organizaciones sectoriales de primer grado (art. 18).</p>
          <label htmlFor="calculo-afiliados" className="mt-4 block text-sm font-semibold text-tinta">Número de afiliados</label>
          <input id="calculo-afiliados" type="number" min={0} value={afiliados} onChange={(evento) => setAfiliados(evento.target.value)} className="mt-1 w-full rounded-xl border border-linea p-3 outline-none focus:ring-2 focus:ring-violeta" />
          <p aria-live="polite" className="mt-4 font-titulo text-3xl font-semibold text-tinta">
            {delegados} {delegados === 1 ? 'delegado pleno' : 'delegados plenos'}
          </p>
          {delegados === 0 && <p className="mt-1 text-sm text-tenue">Se requieren al menos 20 afiliados.</p>}
        </section>
      </div>

      <section className="mt-6 rounded-3xl border-l-4 border-rojo bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Comunicado de la Secretaría de Organización</h2>
        <p className="mt-2 leading-relaxed">
          Se recuerda a todas las bases afiliadas que deben remitir sus padrones actualizados antes del 30 de Noviembre para el cálculo de delegados del próximo Congreso Nacional Ordinario, según lo estipulado en el Estatuto.
        </p>
      </section>
    </div>
  );
}
