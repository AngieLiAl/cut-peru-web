'use client';

import { useMontado } from '../../../_datos/almacen';

type Evento = { fecha: Date; titulo: string; texto: string };

const fijos: Evento[] = [
  { fecha: new Date(2026, 10, 30), titulo: 'Entrega de padrones actualizados', texto: 'Comunicado de la Secretaría de Organización.' },
  { fecha: new Date(2026, 11, 29), titulo: 'Vence el mandato inscrito del CEN', texto: 'Según la constancia del MTPE.' },
];

const generarEventos = (hoy: Date) => {
  const eventos = [...fijos];
  for (let mes = 0; mes < 7; mes++) {
    const quincena = new Date(hoy.getFullYear(), hoy.getMonth() + mes, 15);
    eventos.push({ fecha: quincena, titulo: 'Límite de abono de cuotas', texto: 'Primera quincena del mes siguiente a la recaudación (art. 12).' });
    if (quincena.getMonth() === 0 || quincena.getMonth() === 6) {
      eventos.push({ fecha: new Date(quincena.getFullYear(), quincena.getMonth(), 1), titulo: 'Inicio del abono semestral', texto: 'Los abonos semestrales se realizan en enero y julio (art. 12).' });
    }
  }
  const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return eventos.filter((evento) => evento.fecha >= inicio).sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
};

const formatoIcs = (fecha: Date) => `${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(fecha.getDate()).padStart(2, '0')}`;

export default function Calendario() {
  const montado = useMontado();
  const hoy = montado ? new Date() : null;
  const eventos = hoy ? generarEventos(hoy) : [];

  const descargar = () => {
    const lineas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CUT PERU//Calendario Sindical//ES'];
    eventos.forEach((evento, indice) => {
      lineas.push('BEGIN:VEVENT', `UID:cut-${indice}-${formatoIcs(evento.fecha)}@cutperu`, `DTSTAMP:${formatoIcs(new Date())}T000000Z`, `DTSTART;VALUE=DATE:${formatoIcs(evento.fecha)}`, `SUMMARY:${evento.titulo}`, `DESCRIPTION:${evento.texto}`, 'END:VEVENT');
    });
    lineas.push('END:VCALENDAR');
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(new Blob([lineas.join('\r\n')], { type: 'text/calendar' }));
    enlace.download = 'calendario-cut-peru.ics';
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Calendario Sindical</h1>
          <p className="mt-1 text-tenue">Plazos del Estatuto y comunicados de la central. Las fechas del CDN y del Congreso se agregarán al ser convocadas.</p>
        </div>
        <button type="button" onClick={descargar} className="w-fit shrink-0 rounded-full bg-tinta px-5 py-2.5 font-semibold text-white">Agregar a mi calendario</button>
      </div>

      <ol className="mt-8 space-y-3">
        {eventos.map((evento) => (
          <li key={evento.titulo + evento.fecha.getTime()} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-tinta to-violeta text-white">
              <span className="font-titulo text-2xl font-semibold leading-none">{evento.fecha.getDate()}</span>
              <span className="text-xs">{evento.fecha.toLocaleDateString('es-PE', { month: 'short' })}</span>
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-tinta">{evento.titulo}</span>
              <span className="block text-sm text-tenue">{evento.texto}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
