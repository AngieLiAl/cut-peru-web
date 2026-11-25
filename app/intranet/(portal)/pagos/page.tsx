'use client';

import { useState } from 'react';
import { fechaHoy, pagosIniciales, useAlmacen, type Pago } from '../../../_datos/almacen';

const periodos = [
  { valor: 'Anual 2027', tarifa: 10 },
  { valor: 'Semestral 2027-I', tarifa: 5 },
  { valor: 'Mensual Noviembre 2026', tarifa: 1 },
  { valor: 'Mensual Diciembre 2026', tarifa: 1 },
];

const aportes = [
  { texto: 'Anual (por afiliado)', monto: 'S/ 10.00' },
  { texto: 'Semestral, enero y julio (por afiliado)', monto: 'S/ 5.00' },
  { texto: 'Mensual (por afiliado)', monto: 'S/ 1.00' },
];

const soles = (monto: number) => `S/ ${monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
const campo = 'mt-1 w-full rounded-xl border border-linea bg-white p-3 outline-none focus:ring-2 focus:ring-violeta aria-invalid:border-rojo';

export default function PagoCuotas() {
  const [pagos, setPagos] = useAlmacen<Pago[]>('cut-pagos', pagosIniciales);
  const [periodo, setPeriodo] = useState('');
  const [afiliados, setAfiliados] = useState('');
  const [voucher, setVoucher] = useState('');
  const [nomina, setNomina] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [exito, setExito] = useState('');

  const tarifa = periodos.find((opcion) => opcion.valor === periodo)?.tarifa ?? 0;
  const cantidad = Number(afiliados) > 0 ? Math.floor(Number(afiliados)) : 0;
  const total = tarifa * cantidad;

  const declarar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevos: Record<string, string> = {};
    if (!periodo) nuevos.periodo = 'Selecciona un período.';
    if (cantidad === 0) nuevos.afiliados = 'Escribe el número de cotizantes.';
    if (!voucher) nuevos.voucher = 'Adjunta el voucher.';
    if (!nomina) nuevos.nomina = 'Adjunta la nómina de cotizantes (art. 12).';
    setErrores(nuevos);
    setExito('');
    if (Object.keys(nuevos).length > 0) return;

    setPagos([{ periodo, fecha: fechaHoy(), afiliados: cantidad, monto: total, estado: 'En validación' }, ...pagos]);
    setExito(`Declaración de ${periodo} registrada en esta demostración.`);
    setPeriodo('');
    setAfiliados('');
    setVoucher('');
    setNomina('');
    evento.currentTarget.reset();
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-semibold">Declaración de Cuotas Sindicales</h1>
      <p className="mt-1 text-tenue">Reporta los pagos de tu organización y mantén activa tu afiliación.</p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <form noValidate onSubmit={declarar} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Nuevo reporte de pago</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="periodo" className="text-sm font-semibold text-tinta">Período a declarar</label>
                <select id="periodo" value={periodo} aria-invalid={Boolean(errores.periodo)} onChange={(evento) => setPeriodo(evento.target.value)} className={campo}>
                  <option value="">Selecciona</option>
                  {periodos.map((opcion) => <option key={opcion.valor}>{opcion.valor}</option>)}
                </select>
                {errores.periodo && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores.periodo}</p>}
              </div>
              <div>
                <label htmlFor="cotizantes" className="text-sm font-semibold text-tinta">Nº de afiliados cotizantes</label>
                <input id="cotizantes" type="number" min={1} value={afiliados} aria-invalid={Boolean(errores.afiliados)} onChange={(evento) => setAfiliados(evento.target.value)} className={campo} />
                {errores.afiliados && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores.afiliados}</p>}
              </div>
            </div>

            <div aria-live="polite" className="mt-4 grid gap-3 rounded-2xl bg-niebla p-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-tenue">Total a abonar</p>
                <p className="font-titulo text-2xl font-semibold text-tinta">{soles(total)}</p>
              </div>
              <div>
                <p className="text-sm text-tenue">Reserva CUT Regional (50%)</p>
                <p className="font-titulo text-2xl font-semibold text-tinta">{soles(total / 2)}</p>
              </div>
              <div>
                <p className="text-sm text-tenue">Central (50%)</p>
                <p className="font-titulo text-2xl font-semibold text-tinta">{soles(total / 2)}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="voucher" className="text-sm font-semibold text-tinta">Voucher o transferencia (PDF/JPG)</label>
                <input id="voucher" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(evento) => setVoucher(evento.target.files?.[0]?.name ?? '')} className="mt-2 w-full text-sm text-tenue file:mr-3 file:rounded-full file:border-0 file:bg-tinta file:px-4 file:py-2 file:font-semibold file:text-white" />
                {errores.voucher && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores.voucher}</p>}
              </div>
              <div>
                <label htmlFor="nomina" className="text-sm font-semibold text-tinta">Nómina de cotizantes (Excel/PDF)</label>
                <input id="nomina" type="file" accept=".pdf,.xls,.xlsx" onChange={(evento) => setNomina(evento.target.files?.[0]?.name ?? '')} className="mt-2 w-full text-sm text-tenue file:mr-3 file:rounded-full file:border-0 file:bg-tinta file:px-4 file:py-2 file:font-semibold file:text-white" />
                {errores.nomina && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores.nomina}</p>}
              </div>
            </div>

            {exito && <p role="status" className="mt-4 rounded-xl bg-emerald-100 p-3 text-sm font-medium text-emerald-900">{exito}</p>}
            <button type="submit" className="mt-5 rounded-full bg-rojo px-7 py-3 font-semibold text-white transition-colors hover:bg-rojo-oscuro">Enviar declaración</button>
          </form>

          <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <h2 className="p-6 pb-3 text-xl font-semibold">Historial de declaraciones</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-lg text-left">
                <thead>
                  <tr className="border-b border-linea text-sm text-tenue">
                    <th className="p-4 font-semibold">Período</th>
                    <th className="p-4 font-semibold">Fecha</th>
                    <th className="p-4 font-semibold">Afiliados</th>
                    <th className="p-4 font-semibold">Monto</th>
                    <th className="p-4 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-linea">
                  {pagos.map((pago, indice) => (
                    <tr key={`${pago.periodo}-${pago.fecha}-${indice}`}>
                      <td className="p-4 font-medium text-tinta">{pago.periodo}</td>
                      <td className="p-4 text-sm text-tenue">{pago.fecha}</td>
                      <td className="p-4 text-sm">{pago.afiliados}</td>
                      <td className="p-4 font-semibold">{soles(pago.monto)}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pago.estado === 'Validado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{pago.estado}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Cuadro de aportes</h2>
            <p className="mt-1 text-sm text-tenue">Art. 12 del Estatuto. El abono se realiza en la primera quincena del mes siguiente a la recaudación.</p>
            <ul className="mt-3 divide-y divide-linea text-sm">
              {aportes.map((aporte) => (
                <li key={aporte.texto} className="flex justify-between gap-4 py-2.5">
                  {aporte.texto}
                  <span className="shrink-0 font-semibold text-tinta">{aporte.monto}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl bg-tinta p-6 text-white">
            <h2 className="text-xl font-semibold text-white">Cuentas bancarias oficiales</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/85">
              Pendientes de confirmación por la Secretaría de Economía y Finanzas. No realices depósitos desde esta demostración.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
