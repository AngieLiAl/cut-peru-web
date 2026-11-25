// Contorno simplificado del Perú (longitud, latitud), solo con fines ilustrativos.
const contorno: [number, number][] = [
  [-81.3, -4.7], [-80.3, -3.4], [-79, -5], [-78.2, -3.4], [-77.8, -3], [-76.6, -2.6], [-75.5, -1.6],
  [-75.2, -0.1], [-74.3, -1], [-73.6, -1.3], [-72.9, -2.4], [-71.7, -2.2], [-70.1, -2.7], [-69.9, -4.2],
  [-71, -4.4], [-72.9, -5.3], [-73.9, -7.3], [-72.7, -9.4], [-70.6, -9.5], [-70.5, -11], [-69.6, -11],
  [-68.7, -12.5], [-69.2, -15], [-69.5, -17.3], [-70.4, -18.35], [-71.4, -17.7], [-73.4, -16.4],
  [-75.2, -15.3], [-76.3, -13.9], [-77.2, -12.1], [-78.2, -10.1], [-79, -8.1], [-79.9, -6.9], [-81.2, -6.1],
];

const dentro = (x: number, y: number) => {
  let adentro = false;
  for (let i = 0, j = contorno.length - 1; i < contorno.length; j = i++) {
    const [xi, yi] = contorno[i];
    const [xj, yj] = contorno[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) adentro = !adentro;
  }
  return adentro;
};

const paso = 0.36;

export const proyectar = (lon: number, lat: number): [number, number] => [(lon + 82) * 30, -lat * 30 + 8];

export const puntosMapa: { x: number; y: number; id: number }[] = [];
for (let lat = 0.2; lat > -18.6; lat -= paso) {
  for (let lon = -81.6; lon < -68.4; lon += paso) {
    if (dentro(lon, lat)) {
      const [x, y] = proyectar(lon, lat);
      puntosMapa.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, id: puntosMapa.length });
    }
  }
}

// Sustituir `cut` y `contacto` cuando la Secretaría de Organización confirme la información.
export type Region = { nombre: string; capital: string; lon: number; lat: number; cut?: string; contacto?: string };

export const regiones: Region[] = [
  { nombre: 'Amazonas', capital: 'Chachapoyas', lon: -77.87, lat: -6.23 },
  { nombre: 'Áncash', capital: 'Huaraz', lon: -77.53, lat: -9.53 },
  { nombre: 'Apurímac', capital: 'Abancay', lon: -72.88, lat: -13.63 },
  { nombre: 'Arequipa', capital: 'Arequipa', lon: -71.54, lat: -16.41 },
  { nombre: 'Ayacucho', capital: 'Ayacucho', lon: -74.22, lat: -13.16 },
  { nombre: 'Cajamarca', capital: 'Cajamarca', lon: -78.5, lat: -7.16 },
  { nombre: 'Callao', capital: 'Callao', lon: -77.13, lat: -12.06 },
  { nombre: 'Cusco', capital: 'Cusco', lon: -71.97, lat: -13.53 },
  { nombre: 'Huancavelica', capital: 'Huancavelica', lon: -74.98, lat: -12.79 },
  { nombre: 'Huánuco', capital: 'Huánuco', lon: -76.24, lat: -9.93 },
  { nombre: 'Ica', capital: 'Ica', lon: -75.73, lat: -14.07 },
  { nombre: 'Junín', capital: 'Huancayo', lon: -75.21, lat: -12.07 },
  { nombre: 'La Libertad', capital: 'Trujillo', lon: -79.03, lat: -8.11 },
  { nombre: 'Lambayeque', capital: 'Chiclayo', lon: -79.84, lat: -6.77 },
  { nombre: 'Lima', capital: 'Lima', lon: -77.03, lat: -12.05, cut: 'Sede principal de la central (art. 4 del Estatuto)' },
  { nombre: 'Loreto', capital: 'Iquitos', lon: -73.25, lat: -3.75 },
  { nombre: 'Madre de Dios', capital: 'Puerto Maldonado', lon: -69.19, lat: -12.59 },
  { nombre: 'Moquegua', capital: 'Moquegua', lon: -70.94, lat: -17.19 },
  { nombre: 'Pasco', capital: 'Cerro de Pasco', lon: -76.26, lat: -10.68 },
  { nombre: 'Piura', capital: 'Piura', lon: -80.63, lat: -5.19 },
  { nombre: 'Puno', capital: 'Puno', lon: -70.02, lat: -15.84 },
  { nombre: 'San Martín', capital: 'Moyobamba', lon: -76.97, lat: -6.03 },
  { nombre: 'Tacna', capital: 'Tacna', lon: -70.25, lat: -18.01 },
  { nombre: 'Tumbes', capital: 'Tumbes', lon: -80.45, lat: -3.57 },
  { nombre: 'Ucayali', capital: 'Pucallpa', lon: -74.55, lat: -8.38 },
];
