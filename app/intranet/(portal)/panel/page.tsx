'use client';

import { pagosIniciales, ticketsIniciales, useAlmacen, type Pago, type Ticket } from '../../../_datos/almacen';

const soles = (monto: number) => `S/ ${monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
const estados: Ticket['estado'][] = ['Recibido', 'En Revisión', 'Resuelto'];

export default function PanelSecretaria() {
  const [pagos, setPagos] = useAlmacen<Pago[]>('cut-pagos', pagosIniciales);
  const [tickets, setTickets] = useAlmacen<Ticket[]>('cut-tickets', ticketsIniciales);

  const porValidar = pagos.filter((pago) => pago.estado === 'En validación');
  const recaudado = pagos.filter((pago) => pago.estado === 'Validado').reduce((total, pago) => total + pago.monto, 0);

  const resumen = [
    { texto: 'Pagos por validar', valor: String(porValidar.length) },
    { texto: 'Tickets abiertos', valor: String(tickets.filter((ticket) => ticket.estado !== 'Resuelto').length) },
    { texto: 'Total validado', valor: soles(recaudado) },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-semibold">Panel de Secretaría</h1>
      <p className="mt-1 text-tenue">Demostración de la gestión interna. Con base de datos, este panel será solo para personal autorizado.</p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {resumen.map((dato) => (
          <div key={dato.texto} className="flex flex-col-reverse rounded-2xl bg-white p-4 shadow-sm">
            <dt className="text-sm text-tenue">{dato.texto}</dt>
            <dd className="font-titulo text-3xl font-semibold text-tinta">{dato.valor}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="validar" className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 id="validar" className="text-xl font-semibold">Pagos por validar</h2>
        {porValidar.length === 0 && <p className="mt-2 text-tenue">No hay pagos pendientes. Las declaraciones nuevas aparecerán aquí.</p>}
        <ul className="mt-2 divide-y divide-linea">
          {pagos.map((pago, indice) => pago.estado === 'En validación' && (
            <li key={`${pago.periodo}-${indice}`} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span>
                <span className="block font-semibold text-tinta">{pago.periodo}</span>
                <span className="block text-sm text-tenue">{pago.afiliados} afiliados · {soles(pago.monto)} · {pago.fecha}</span>
              </span>
              <button type="button" onClick={() => setPagos(pagos.map((item, numero) => (numero === indice ? { ...item, estado: 'Validado' } : item)))} className="rounded-full bg-tinta px-4 py-2 text-sm font-semibold text-white">Validar</button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="gestion-tickets" className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 id="gestion-tickets" className="text-xl font-semibold">Tickets de asesoría</h2>
        <ul className="mt-2 divide-y divide-linea">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span className="min-w-0">
                <span className="block font-semibold text-tinta">{ticket.asunto}</span>
                <span className="block text-sm text-tenue">{ticket.id} · {ticket.categoria}</span>
              </span>
              <span>
                <label htmlFor={`estado-${ticket.id}`} className="sr-only">Estado de {ticket.asunto}</label>
                <select
                  id={`estado-${ticket.id}`}
                  value={ticket.estado}
                  onChange={(evento) => setTickets(tickets.map((item) => (item.id === ticket.id ? { ...item, estado: evento.target.value as Ticket['estado'] } : item)))}
                  className="rounded-xl border border-linea bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-violeta"
                >
                  {estados.map((estado) => <option key={estado}>{estado}</option>)}
                </select>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
