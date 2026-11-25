import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Las noticias son archivos Markdown en contenido/noticias. Instrucciones: contenido/COMO-PUBLICAR-NOTICIAS.md

export type Noticia = {
  slug: string;
  titulo: string;
  fecha: string;
  fechaTexto: string;
  categoria: string;
  autor: string;
  resumen: string;
  portada?: string;
  pieDeFoto?: string;
  destacada: boolean;
  cuerpo: string;
};

const carpeta = join(process.cwd(), 'contenido', 'noticias');
const obligatorios = ['titulo', 'fecha', 'categoria', 'resumen'];

const formatoFecha = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function leerArchivo(archivo: string): Noticia {
  const texto = readFileSync(join(carpeta, archivo), 'utf8').replace(/^﻿/, '');
  const partes = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!partes) {
    throw new Error(`La noticia "${archivo}" debe empezar con sus datos entre dos líneas "---". Copia el formato de _plantilla.md.`);
  }

  const datos: Record<string, string> = {};
  for (const linea of partes[1].split(/\r?\n/)) {
    const par = linea.match(/^\s*([a-z_]+)\s*:\s*(.*)$/i);
    if (par) datos[par[1].toLowerCase()] = par[2].trim().replace(/^["'](.*)["']$/, '$1');
  }

  const faltan = obligatorios.filter((campo) => !datos[campo]);
  if (faltan.length > 0) {
    throw new Error(`A la noticia "${archivo}" le falta: ${faltan.join(', ')}.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha) || Number.isNaN(Date.parse(datos.fecha))) {
    throw new Error(`La fecha de "${archivo}" debe tener el formato AAAA-MM-DD, por ejemplo 2026-11-25.`);
  }
  if (datos.portada && !existsSync(join(process.cwd(), 'public', datos.portada))) {
    throw new Error(`No encuentro la imagen "${datos.portada}" de la noticia "${archivo}". Debe estar dentro de la carpeta public, por ejemplo public/noticias/foto.jpg.`);
  }

  return {
    slug: archivo.replace(/\.md$/, ''),
    titulo: datos.titulo,
    fecha: datos.fecha,
    fechaTexto: formatoFecha.format(new Date(`${datos.fecha}T00:00:00Z`)),
    categoria: datos.categoria,
    autor: datos.autor || 'CUT PERÚ',
    resumen: datos.resumen,
    portada: datos.portada || undefined,
    pieDeFoto: datos.pie_de_foto || undefined,
    destacada: datos.destacada === 'si' || datos.destacada === 'sí' || datos.destacada === 'true',
    cuerpo: partes[2].trim(),
  };
}

export function obtenerNoticias(): Noticia[] {
  return readdirSync(carpeta)
    .filter((archivo) => archivo.endsWith('.md') && !archivo.startsWith('_'))
    .map(leerArchivo)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function obtenerNoticia(slug: string) {
  return obtenerNoticias().find((noticia) => noticia.slug === slug);
}
