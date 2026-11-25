'use client';

import Link from 'next/link';
import { useState } from 'react';

const regiones = ['Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'];

const documentos = [
  'Solicitud de afiliación, con firma del representante legal',
  'Fotocopia de inscripción ante el Registro Oficial correspondiente',
  'Fotocopia de inscripción actualizada de la Junta Directiva',
  'Fotocopia del padrón actualizado de afiliados',
  'Copia de los Estatutos de la organización',
  'Acta de Congreso o Asamblea General que aprueba la afiliación',
  'Recibo de pago de la primera cuota sindical',
];

type Tipo = 'institucional' | 'individual';
type Datos = Record<string, string>;

const datosIniciales: Datos = {};

const campo = 'mt-1 w-full rounded-xl border border-linea bg-white p-3 outline-none transition-shadow focus:ring-2 focus:ring-violeta aria-invalid:border-rojo';

type DefinicionCampo = {
  id: string;
  etiqueta: string;
  tipo?: string;
  opciones?: string[];
  opcional?: boolean;
  ayuda?: string;
  patron?: RegExp;
  error?: string;
};

const pasos: Record<Tipo, { titulo: string; campos: DefinicionCampo[] }[]> = {
  institucional: [
    {
      titulo: 'Organización',
      campos: [
        { id: 'organizacion', etiqueta: 'Nombre completo de la organización' },
        { id: 'sector', etiqueta: 'Sector', opciones: ['Sector Privado', 'Sector Público', 'Autoempleado'] },
        { id: 'tipoOrganizacion', etiqueta: 'Tipo de organización', opciones: ['Sindicato', 'Federación', 'Confederación', 'Asociación'] },
        { id: 'region', etiqueta: 'Región', opciones: regiones },
        { id: 'direccion', etiqueta: 'Dirección legal' },
      ],
    },
    {
      titulo: 'Contacto y padrón',
      campos: [
        { id: 'correo', etiqueta: 'Correo electrónico', tipo: 'email', patron: /^\S+@\S+\.\S+$/, error: 'Escribe un correo válido.' },
        { id: 'telefono', etiqueta: 'Teléfono o celular', tipo: 'tel', opcional: true },
        { id: 'registro', etiqueta: 'Registro sindical (MTPE)', opcional: true },
        { id: 'vigencia', etiqueta: 'Vigencia de la Junta Directiva', opcional: true, ayuda: 'Ej. 2024 - 2026' },
        { id: 'afiliados', etiqueta: 'Total de afiliados', tipo: 'number', patron: /^[1-9]\d*$/, error: 'Escribe un número mayor que cero.' },
        { id: 'mujeres', etiqueta: 'Afiliadas mujeres', tipo: 'number', opcional: true },
        { id: 'jovenes', etiqueta: 'Jóvenes menores de 35', tipo: 'number', opcional: true },
      ],
    },
  ],
  individual: [
    {
      titulo: 'Tus datos',
      campos: [
        { id: 'nombres', etiqueta: 'Nombres y apellidos' },
        { id: 'documento', etiqueta: 'DNI', patron: /^\d{8}$/, error: 'El DNI debe tener 8 dígitos.' },
        { id: 'region', etiqueta: 'Región', opciones: regiones },
      ],
    },
    {
      titulo: 'Contacto y actividad',
      campos: [
        { id: 'correo', etiqueta: 'Correo electrónico', tipo: 'email', patron: /^\S+@\S+\.\S+$/, error: 'Escribe un correo válido.' },
        { id: 'telefono', etiqueta: 'Celular', tipo: 'tel' },
        { id: 'situacion', etiqueta: 'Tu situación', opciones: ['Empresa privada', 'Administración pública', 'Autoempleo', 'Pensionista o jubilado(a)', 'Joven buscando empleo', 'Sin empleo'] },
        { id: 'actividad', etiqueta: 'Actividad u oficio', opcional: true },
      ],
    },
  ],
};

export default function FormularioAfiliacion() {
  const [tipo, setTipo] = useState<Tipo>('institucional');
  const [paso, setPaso] = useState(0);
  // Los datos son sensibles: quedan solo en memoria y no se guardan en el navegador.
  const [datos, setDatos] = useState<Datos>(datosIniciales);
  const [archivos, setArchivos] = useState<Record<string, string>>({});
  const [declaracion, setDeclaracion] = useState(false);
  const [privacidad, setPrivacidad] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [codigo, setCodigo] = useState('');

  const etapas = pasos[tipo];
  const etapasFinales = tipo === 'institucional' ? [...etapas.map((e) => e.titulo), 'Documentos', 'Confirmación'] : [...etapas.map((e) => e.titulo), 'Confirmación'];
  const indiceDocumentos = tipo === 'institucional' ? etapas.length : -1;
  const indiceConfirmacion = etapasFinales.length - 1;

  const cambiarTipo = (nuevo: Tipo) => {
    setTipo(nuevo);
    setPaso(0);
    setErrores({});
  };

  const validar = () => {
    const nuevos: Record<string, string> = {};
    if (paso < etapas.length) {
      for (const definicion of etapas[paso].campos) {
        const valor = (datos[definicion.id] ?? '').trim();
        if (!valor && !definicion.opcional) nuevos[definicion.id] = 'Este dato es obligatorio.';
        else if (valor && definicion.patron && !definicion.patron.test(valor)) nuevos[definicion.id] = definicion.error ?? 'Revisa este dato.';
      }
    }
    if (paso === indiceDocumentos) {
      documentos.forEach((documento, indice) => {
        if (!archivos[indice]) nuevos[`documento-${indice}`] = `Falta: ${documento}`;
      });
    }
    if (paso === indiceConfirmacion) {
      if (tipo === 'institucional' && !declaracion) nuevos.declaracion = 'Debes aceptar la declaración jurada.';
      if (!privacidad) nuevos.privacidad = 'Debes aceptar el uso de tus datos.';
    }
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const avanzar = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (!validar()) return;
    if (paso < indiceConfirmacion) {
      setPaso(paso + 1);
      return;
    }
    setCodigo(`CUT-${String(Date.now()).slice(-6)}`);
    setDatos(datosIniciales);
  };

  if (codigo) {
    return (
      <div className="aparece rounded-3xl bg-white p-8 text-center shadow-lg">
        <h2 className="text-3xl font-semibold">Solicitud lista</h2>
        <p className="mt-3 leading-relaxed text-tenue">Código de referencia de la demostración: <strong className="text-tinta">{codigo}</strong></p>
        <p className="mt-4 rounded-2xl bg-niebla p-4 text-sm leading-relaxed">
          Esta versión todavía no envía datos a la central. El envío real se activará cuando el sitio tenga base de datos.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-tinta px-6 py-3 font-semibold text-white">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={avanzar}>
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Tipo de afiliación">
        {([['institucional', 'Afiliación Institucional', 'Para sindicatos, federaciones y asociaciones (art. 10).'], ['individual', 'Afiliación Individual', 'Personal y voluntaria, mediante ficha (art. 11).']] as const).map(([valor, titulo, texto]) => (
          <button
            key={valor}
            type="button"
            aria-pressed={tipo === valor}
            onClick={() => cambiarTipo(valor)}
            className="rounded-2xl bg-white p-4 text-left shadow-sm transition-colors aria-pressed:bg-tinta aria-pressed:text-white"
          >
            <span className="block font-titulo font-semibold">{titulo}</span>
            <span className="mt-1 block text-sm opacity-80">{texto}</span>
          </button>
        ))}
      </div>

      <ol className="mt-6 flex gap-2" aria-label="Pasos">
        {etapasFinales.map((titulo, indice) => (
          <li key={titulo} aria-current={indice === paso ? 'step' : undefined} className="min-w-0 flex-1">
            <span className={`block h-1.5 rounded-full ${indice <= paso ? 'bg-rojo' : 'bg-linea'}`} />
            <span className={`mt-1.5 hidden truncate text-xs font-medium sm:block ${indice === paso ? 'text-tinta' : 'text-tenue'}`}>{titulo}</span>
          </li>
        ))}
      </ol>

      <div key={`${tipo}-${paso}`} className="aparece mt-5 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold">{etapasFinales[paso]}</h2>
        <p className="mt-1 text-sm text-tenue">Paso {paso + 1} de {etapasFinales.length}</p>

        {paso < etapas.length && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {etapas[paso].campos.map((definicion) => (
              <div key={definicion.id} className={definicion.id === 'organizacion' || definicion.id === 'nombres' ? 'sm:col-span-2' : ''}>
                <label htmlFor={definicion.id} className="text-sm font-semibold text-tinta">
                  {definicion.etiqueta}{definicion.opcional ? ' (opcional)' : ''}
                </label>
                {definicion.opciones ? (
                  <select
                    id={definicion.id}
                    value={datos[definicion.id] ?? ''}
                    aria-invalid={Boolean(errores[definicion.id])}
                    onChange={(evento) => setDatos({ ...datos, [definicion.id]: evento.target.value })}
                    className={campo}
                  >
                    <option value="">Selecciona</option>
                    {definicion.opciones.map((opcion) => <option key={opcion}>{opcion}</option>)}
                  </select>
                ) : (
                  <input
                    id={definicion.id}
                    type={definicion.tipo ?? 'text'}
                    min={definicion.tipo === 'number' ? 0 : undefined}
                    value={datos[definicion.id] ?? ''}
                    placeholder={definicion.ayuda}
                    aria-invalid={Boolean(errores[definicion.id])}
                    onChange={(evento) => setDatos({ ...datos, [definicion.id]: evento.target.value })}
                    className={campo}
                  />
                )}
                {errores[definicion.id] && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">{errores[definicion.id]}</p>}
              </div>
            ))}
          </div>
        )}

        {paso === indiceDocumentos && (
          <div className="mt-5 space-y-3">
            <p className="text-sm leading-relaxed text-tenue">Sube cada documento en PDF. La declaración jurada, que completa los 8 requisitos del art. 10, se acepta en el paso final.</p>
            {documentos.map((documento, indice) => (
              <div key={documento} className="rounded-2xl bg-niebla p-4">
                <label htmlFor={`documento-${indice}`} className="block text-sm font-semibold text-tinta">{indice + 1}. {documento}</label>
                <input
                  id={`documento-${indice}`}
                  type="file"
                  accept=".pdf"
                  aria-invalid={Boolean(errores[`documento-${indice}`])}
                  onChange={(evento) => setArchivos({ ...archivos, [indice]: evento.target.files?.[0]?.name ?? '' })}
                  className="mt-2 w-full text-sm text-tenue file:mr-3 file:rounded-full file:border-0 file:bg-tinta file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
                {archivos[indice] && <p className="mt-1 text-xs font-medium text-tinta">Elegido: {archivos[indice]}</p>}
                {errores[`documento-${indice}`] && <p role="alert" className="mt-1 text-sm text-rojo-oscuro">Este documento es obligatorio.</p>}
              </div>
            ))}
          </div>
        )}

        {paso === indiceConfirmacion && (
          <div className="mt-5 space-y-4">
            {tipo === 'institucional' && (
              <label className="flex items-start gap-3 rounded-2xl bg-niebla p-4">
                <input type="checkbox" checked={declaracion} onChange={(evento) => setDeclaracion(evento.target.checked)} className="mt-1 size-5 accent-rojo" />
                <span className="text-sm leading-relaxed"><strong>Declaración Jurada:</strong> declaramos conocer, aceptar y respetar el Estatuto de la CUT PERÚ, sus principios sociopolíticos y obligaciones sindicales.</span>
              </label>
            )}
            {errores.declaracion && <p role="alert" className="text-sm text-rojo-oscuro">{errores.declaracion}</p>}
            <label className="flex items-start gap-3 rounded-2xl bg-niebla p-4">
              <input type="checkbox" checked={privacidad} onChange={(evento) => setPrivacidad(evento.target.checked)} className="mt-1 size-5 accent-rojo" />
              <span className="text-sm leading-relaxed">Autorizo el tratamiento de mis datos, incluida la afiliación sindical, según la <Link href="/privacidad" className="font-semibold underline">Política de Privacidad</Link>.</span>
            </label>
            {errores.privacidad && <p role="alert" className="text-sm text-rojo-oscuro">{errores.privacidad}</p>}
          </div>
        )}

        <div className="mt-8 flex justify-between gap-3">
          {paso > 0 ? (
            <button type="button" onClick={() => { setPaso(paso - 1); setErrores({}); }} className="rounded-full bg-niebla px-6 py-3 font-semibold text-tinta">Atrás</button>
          ) : <span />}
          <button type="submit" className="rounded-full bg-rojo px-7 py-3 font-semibold text-white transition-colors hover:bg-rojo-oscuro">
            {paso === indiceConfirmacion ? 'Enviar solicitud' : 'Continuar'}
          </button>
        </div>
      </div>
    </form>
  );
}
