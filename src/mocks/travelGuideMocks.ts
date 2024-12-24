// src/mocks/travelGuideMocks.ts

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
  
  export const flightInfoData: FlightInfo[] = [
    {
      date: "9 de janeiro – Quinta-feira",
      description: "9h25 - Embarque para New York (Voos: Azul 8712 – Trecho: Recife/Fort Lauderdale – Hora: 9h25/15h30 + Voo: Delta 1419 – ...)",
    },
    {
      date: "17 de janeiro - Sexta-feira",
      description: "9h - Retorno ao Brasil (Voos: Delta 305 – Trecho: New York/Fort Lauderdale – Hora: 11h05/14h18 + Voo Azul 8713 – Trecho Fort Lauderdale/Recife – Hora: 20h30/6h25 - 18/01)",
    },
  ];
  
  export const hotelInfoData: HotelInfo[] = [
    {
      hotelName: "Hotel XYZ",
      address: "Rua Exemplo, 123, Cidade, País",
      checkIn: "14h00",
      checkOut: "12h00",
      services: ["Café da manhã incluso", "Wi-Fi gratuito", "Piscina e academia"],
    },

  ];
  
  export const tourismInfoData: TourismInfo[] = [
    {
      title: "Passeios Disponíveis",
      items: [
        "City Tour",
        "Visita a museus",
        "Excursão gastronômica",
      ],
    },
    {
      title: "Dicas Úteis",
      items: [
        "Leve roupas confortáveis",
        "Tenha sempre uma garrafa de água",
        "Respeite a cultura local",
      ],
    },
  ];