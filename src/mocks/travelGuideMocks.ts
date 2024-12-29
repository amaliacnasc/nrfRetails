// Tipos para informações de voo, hotel e turismo
export interface FlightInfo {
  date: string;
  description: string;
}

export interface HotelInfo {
  hotelName: string;
  address: string;
  checkIn: string;
  checkOut: string;
  services: string[];
}

export interface TourismInfo {
  title: string;
  items: string[];
}

// Dados de Voos
export const flightInfoData: FlightInfo[] = [
  {
    date: "9 de janeiro – Quinta-feira",
    description: `
      9h25 - Embarque para New York 
      (Voos: Azul 8712 – Trecho: Recife/Fort Lauderdale – Hora: 9h25/15h30 
      + Voo: Delta 1419 – Trecho: Fort Lauderdale/New York – Hora: 18h00/21h00).
    `,
  },
  {
    date: "17 de janeiro - Sexta-feira",
    description: `
      9h - Retorno ao Brasil 
      (Voos: Delta 305 – Trecho: New York/Fort Lauderdale – Hora: 11h05/14h18 
      + Voo Azul 8713 – Trecho Fort Lauderdale/Recife – Hora: 20h30/6h25 - 18/01).
    `,
  },
];

// Dados de Hotéis
export const hotelInfoData: HotelInfo[] = [
  {
    hotelName: "Hotel XYZ",
    address: "Rua Exemplo, 123, Cidade, País",
    checkIn: "14h00",
    checkOut: "12h00",
    services: [
      "Café da manhã incluso",
      "Wi-Fi gratuito",
      "Piscina e academia",
      "Estacionamento gratuito",
    ],
  },
  {
    hotelName: "Hotel ABC",
    address: "Avenida Principal, 456, Cidade, País",
    checkIn: "15h00",
    checkOut: "11h00",
    services: [
      "Recepção 24 horas",
      "Transfer aeroporto/hotel",
      "Spa e sauna",
    ],
  },
];

// Dados de Turismo
export const tourismInfoData: TourismInfo[] = [
  {
    title: "Passeios Disponíveis",
    items: [
      "City Tour com guia local",
      "Visita a museus renomados",
      "Excursão gastronômica com degustação",
    ],
  },
  {
    title: "Dicas Úteis",
    items: [
      "Leve roupas confortáveis e adequadas ao clima",
      "Tenha sempre uma garrafa de água para hidratação",
      "Respeite a cultura e as tradições locais",
      "Verifique as condições climáticas antes de passeios ao ar livre",
    ],
  },
];