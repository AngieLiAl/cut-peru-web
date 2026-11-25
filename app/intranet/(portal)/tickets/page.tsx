'use client';

import { useState } from 'react';
import { fechaHoy, ticketsIniciales, useAlmacen, type Ticket } from '../../../_datos/almacen';

const categorias = ['Negociación Colectiva', 'Defensa Legal', 'Seguridad y Salud', 'Consulta General'];
const campo = 'mt-1 w-full rounded-xl border border-linea bg-white p-3 outline-none focus:ring-2 focus:ring-violeta aria-invalid:border-rojo';

const estilos: Record<Ticket['estado'], string> = {
  Recibido: 'bg-blue-100 text-blue-900',
  'En Revisión': 'bg-amber-100 text-amber-900',
  Resuelto: 'bg-emerald-100 text-emerald-800',
};

const etapas: Ticket['estado'][] = ['Recibido', 'En Revisión', 'Resuelto'];

export default function TicketsAsesoria() {
  const [tickets, setTickets] = useAlmacen<Ticket[]>('cut-tickets', ticketsIniciales);
  const [creando, setCreando] = useState(false);
  const [abierto, setAbierto] = useState('');
  const [asunto, setAsunto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [detalle, setDetalle] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});

  const seleccionado = tickets.find((ticket) => ticket.id === abierto);
  const estadisticas = [
    { texto: 'Total', valor: tickets.length },
    { texto: 'En proceso', valor: tickets.filter((ticket) => ticket.estado !== 'Resuelto').length },
    { texto: 'Resueltos', valor: tickets.filter((ticket) => ticket.estado === 'Resuelto').length },
  ];

  const crear = (evento: React.FormEvent) => {
    evento.preventDefault();
    const nuevos: Record<string, string> = {};
    if (!asunto.trim()) nuevos.asunto = 'Escribe el asunto.';
    if (!categoria) nuevos.categoria = 'Selecciona una categoría.';
    if (detalle.trim().length < 10) nuevos.detalle = 'Describe tu caso con un poco más de detalle.';
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const id = `TK-2026-${String(tickets.length + 90).padStart(3, '0')}`;
    setTickets([{ id, asunto: asunto.trim(), categoria, fecha: fechaHoy(), estado: 'Recibido', detalle: detalle.trim() }, ...tickets]);
    setAsunto('');
    setCategoria('');
    setDetalle('');
    setCreando(false);
    setAbierto(id);
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Mesa de Ayuda y Defensa</h1>
          <p className="mt-1 text-tenue">Gestiona tus consultas legales y solicitudes de acompañamiento.</p>
        </div>
        <button type="button" aria-expanded={creando} onClick={() => setCreando(!creando)} className="w-fit rounded-full bg-rojo px-6 py-3 font-semibold text-white transition-colors hover:bg-rojo-oscuro">
          {creando ? 'Cancelar' : 'Nuevo Ticket'}
        </button>
      </div>

      {creando && (
        <form noValidate onSubmit={crear} className="aparece mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Nueva solicitud</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="asunto" className="text-sm font-semibold text-tinta">Asunto</label>
              <input id="asunto" value={asunto} aria-invalid={Boolean(errores.asunto)} onChange={(evento) => setAsunto(evento.target.value)} className={campo} />
              {errores.asunto && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores.asunto}</p>}
            </div>
            <div>
              <label htmlFor="categoria" className="text-sm font-semibold text-tinta">Categoría</label>
              <select id="categoria" value={categoria} aria-invalid={Boolean(errores.categoria)} onChange={(evento) => setCategoria(evento.target.value)} className={campo}>
                <option value="">Selecciona</option>
                {categorias.map((opcion) => <option key={opcion}>{opcion}</option>)}
              </select>
              {errores.categoria && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores.categoria}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="detalle" className="text-sm font-semibold text-tinta">Describe tu caso</label>
              <textarea id="detalle" rows={4} value={detalle} aria-invalid={Boolean(errores.detalle)} onChange={(evento) => setDetalle(evento.target.value)} className={campo} />
              {errores.detalle && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores.detalle}</p>}
            </div>
          </div>
          <button type="submit" className="mt-4 rounded-full bg-tinta px-6 py-3 font-semibold text-white">Crear ticket</button>
        </form>
      )}

      <dl className="mt-6 grid grid-cols-3 gap-3">
        {estadisticas.map((dato) => (
          <div key={dato.texto} className="flex flex-col-reverse rounded-2xl bg-white p-4 shadow-sm">
            <dt className="text-sm text-tenue">{dato.texto}</dt>
            <dd className="font-titulo text-3xl font-semibold text-tinta">{dato.valor}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-label="Historial de solicitudes" className="space-y-3">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              aria-pressed={ticket.id === abierto}
              onClick={() => setAbierto(ticket.id)}
              className="flex w-full flex-col gap-2 rounded-2xl bg-white p-4 text-left shadow-sm transition-transform hover:-translate-y-0.5 aria-pressed:ring-2 aria-pressed:ring-violeta sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-tenue">{ticket.id} · {ticket.fecha}</span>
                <span className="mt-0.5 block font-semibold text-tinta">{ticket.asunto}</span>
                <span className="block text-sm text-tenue">{ticket.categoria}</span>
              </span>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${estilos[ticket.estado]}`}>{ticket.estado}</span>
            </button>
          ))}
        </section>

        <aside aria-label="Detalle del ticket" className="rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
          {seleccionado ? (
            <div key={seleccionado.id} className="aparece">
              <p className="text-xs font-semibold text-tenue">{seleccionado.id}</p>
              <h2 className="mt-1 text-xl font-semibold leading-snug">{seleccionado.asunto}</h2>
              <p className="mt-3 text-sm leading-relaxed">{seleccionado.detalle}</p>
              <ol className="mt-5 space-y-3">
                {etapas.map((etapa, indice) => (
                  <li key={etapa} className="flex items-center gap-3 text-sm">
                    <span aria-hidden="true" className={`size-3 rounded-full ${indice <= etapas.indexOf(seleccionado.estado) ? 'bg-rojo' : 'bg-linea'}`} />
                    <span className={indice <= etapas.indexOf(seleccionado.estado) ? 'font-semibold text-tinta' : 'text-tenue'}>{etapa}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p className="text-sm text-tenue">Elige una solicitud para ver su estado y detalle.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
