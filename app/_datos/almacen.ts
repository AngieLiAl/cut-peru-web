'use client';

import { useCallback, useSyncExternalStore } from 'react';

// Almacenamiento local del navegador mientras no exista base de datos.
const oyentes = new Set<() => void>();
const lecturas = new Map<string, { crudo: string; valor: unknown }>();

const suscribir = (oyente: () => void) => {
  oyentes.add(oyente);
  window.addEventListener('storage', oyente);
  return () => {
    oyentes.delete(oyente);
    window.removeEventListener('storage', oyente);
  };
};

function leer<T>(clave: string, inicial: T): T {
  try {
    const crudo = window.localStorage.getItem(clave);
    if (crudo === null) return inicial;
    const previa = lecturas.get(clave);
    if (previa?.crudo === crudo) return previa.valor as T;
    const valor = JSON.parse(crudo) as T;
    lecturas.set(clave, { crudo, valor });
    return valor;
  } catch {
    return inicial;
  }
}

export function useAlmacen<T>(clave: string, inicial: T) {
  const valor = useSyncExternalStore(
    suscribir,
    () => leer(clave, inicial),
    () => inicial,
  );

  const guardar = useCallback(
    (nuevo: T | ((actual: T) => T)) => {
      const actual = leer(clave, inicial);
      const siguiente = typeof nuevo === 'function' ? (nuevo as (previo: T) => T)(actual) : nuevo;
      try {
        window.localStorage.setItem(clave, JSON.stringify(siguiente));
      } catch {
        // Sin almacenamiento disponible la página sigue funcionando sin recordar datos.
      }
      oyentes.forEach((oyente) => oyente());
    },
    [clave, inicial],
  );

  return [valor, guardar] as const;
}

const sinCambios = () => () => {};

export const useMontado = () =>
  useSyncExternalStore(
    sinCambios,
    () => true,
    () => false,
  );

export type Sesion = { usuario: string } | null;
export const sesionInicial: Sesion = null;

export type Ticket = {
  id: string;
  asunto: string;
  categoria: string;
  fecha: string;
  estado: 'Recibido' | 'En Revisión' | 'Resuelto';
  detalle: string;
};

export const ticketsIniciales: Ticket[] = [
  { id: 'TK-2026-089', asunto: 'Revisión de Pliego de Reclamos 2027', categoria: 'Negociación Colectiva', fecha: '18 Oct, 2026', estado: 'En Revisión', detalle: 'Solicitamos revisar el proyecto de convención antes de presentarlo a la empresa.' },
  { id: 'TK-2026-045', asunto: 'Asesoría por despido arbitrario a dirigente', categoria: 'Defensa Legal', fecha: '02 Sep, 2026', estado: 'Resuelto', detalle: 'Consulta sobre el fuero sindical de un dirigente de la junta directiva.' },
  { id: 'TK-2026-031', asunto: 'Consulta sobre actualización de junta directiva', categoria: 'Consulta General', fecha: '11 Ago, 2026', estado: 'Resuelto', detalle: 'Consulta sobre la documentación que debe actualizarse ante la central.' },
  { id: 'TK-2026-012', asunto: 'Consulta sobre normativa de SST', categoria: 'Consulta General', fecha: '15 Jul, 2026', estado: 'Resuelto', detalle: 'Consulta sobre la conformación del comité paritario.' },
];

export type Pago = {
  periodo: string;
  fecha: string;
  afiliados: number;
  monto: number;
  estado: 'En validación' | 'Validado';
};

export const pagosIniciales: Pago[] = [
  { periodo: 'Semestral 2026-II', fecha: '10 Jul, 2026', afiliados: 120, monto: 600, estado: 'Validado' },
  { periodo: 'Semestral 2026-I', fecha: '15 Ene, 2026', afiliados: 120, monto: 600, estado: 'Validado' },
  { periodo: 'Anual 2025', fecha: '10 Feb, 2025', afiliados: 120, monto: 1200, estado: 'Validado' },
];

export type Progreso = Record<string, string[]>;
export const progresoInicial: Progreso = {};

export const fechaHoy = () =>
  new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date());

export const calcularDelegados = (afiliados: number) => {
  if (afiliados < 20) return 0;
  if (afiliados <= 100) return 1;
  const adicionales = afiliados - 100;
  return 1 + Math.floor(adicionales / 100) + (adicionales % 100 > 50 ? 1 : 0);
};
