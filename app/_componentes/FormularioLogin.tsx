'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sesionInicial, useAlmacen, type Sesion } from '../_datos/almacen';

const campo = 'mt-2 w-full rounded-xl border border-linea bg-niebla/40 p-3 outline-none transition-shadow focus:bg-white focus:ring-2 focus:ring-violeta';

export default function FormularioLogin() {
  const router = useRouter();
  const [, setSesion] = useAlmacen<Sesion>('cut-sesion', sesionInicial);
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const ingresar = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (!usuario.trim() || !clave) {
      setError('Completa tu usuario y contraseña.');
      return;
    }
    setSesion({ usuario: usuario.trim() });
    router.push('/intranet/dashboard');
  };

  return (
    <form noValidate onSubmit={ingresar} className="space-y-5">
      <p className="rounded-xl bg-niebla p-3 text-sm leading-relaxed text-tinta">
        <strong>Modo demostración:</strong> entra con cualquier dato de prueba. No uses contraseñas reales.
      </p>
      <div>
        <label htmlFor="usuario" className="text-sm font-semibold text-tinta">Correo Institucional o RUC</label>
        <input id="usuario" type="text" autoComplete="off" value={usuario} onChange={(evento) => setUsuario(evento.target.value)} className={campo} placeholder="ejemplo@sindicato.org" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="clave" className="text-sm font-semibold text-tinta">Contraseña</label>
          <Link href="/intranet/recuperar" className="text-xs font-semibold text-rojo-oscuro hover:underline">¿Olvidaste tu contraseña?</Link>
        </div>
        <input id="clave" type="password" autoComplete="off" value={clave} onChange={(evento) => setClave(evento.target.value)} className={campo} />
      </div>
      {error && <p role="alert" className="text-sm text-rojo-oscuro">{error}</p>}
      <button type="submit" className="w-full rounded-full bg-tinta py-3.5 font-semibold text-white transition-colors hover:bg-tinta-suave">
        Ingresar a la Intranet
      </button>
    </form>
  );
}
