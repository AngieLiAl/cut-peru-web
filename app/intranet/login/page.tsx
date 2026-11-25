import type { Metadata } from 'next';
import Link from 'next/link';
import FormularioLogin from '../../_componentes/FormularioLogin';
import Logo from '../../_componentes/Logo';

export const metadata: Metadata = { title: 'Intranet' };

export default function LoginIntranet() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl md:flex-row">
        <div className="fondo-indigo flex flex-col justify-between gap-10 p-8 md:w-1/2 md:p-10">
          <div>
            <Logo className="h-16" />
            <h1 className="mt-10 text-3xl font-semibold leading-tight text-white">Acceso Exclusivo para Bases Afiliadas</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Declara cuotas sindicales, actualiza padrones, solicita asesoría legal y fórmate en la Escuela Sindical.
            </p>
          </div>
          <p className="rounded-2xl bg-white/10 p-4 text-xs leading-relaxed text-white/85">
            El acceso está restringido a los representantes legales y tesoreros de las organizaciones de primer y segundo grado registradas ante la CUT-PERÚ.
          </p>
        </div>

        <div className="p-8 md:w-1/2 md:p-10">
          <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
          <p className="mb-5 mt-1 text-sm text-tenue">Ingresa las credenciales de tu organización.</p>
          <FormularioLogin />
          <p className="mt-6 border-t border-linea pt-5 text-center text-sm text-tenue">
            ¿Tu organización aún no está afiliada?{' '}
            <Link href="/afiliacion" className="font-semibold text-rojo-oscuro hover:underline">Iniciar proceso de afiliación</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
