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

// Dados de Hotéis
export const hotelInfoData = [
  {
    hotelName: "The Lakefront Hotel",
    address: "123 Lakefront Avenue, City, Country",
    checkIn: "14h00",
    checkOut: "12h00",
    services: [
      "Academia",
      "Restaurante e Bar",
      "Equipe Multilíngue",
      "Programa Infantil 'Ask Alfred'",
      "Wi-Fi Cortesia",
      "Instalações para Reuniões e Eventos",
    ],
  },
];

// Dados de Turismo
