import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FlightInfoCard: React.FC = () => {
  const flightInfoData = [
    {
      date: "9 de janeiro – Quinta-feira",
      departure: "9h25 - Recife",
      stops: [
        { location: "Fort Lauderdale", time: "15h30" },
        { location: "New York", time: "23h01" },
      ],
    },
    {
      date: "17 de janeiro - Sexta-feira",
      departure: "9h00 - New York",
      stops: [
        { location: "Fort Lauderdale", time: "14h18" },
        { location: "Recife", time: "6h25 (18/01)" },
      ],
    },
  ];

  return (
    <View className="p-6 bg-white">
      <Text className="text-2xl font-bold text-blue-500 mb-6">Informações de Voo</Text>
      {flightInfoData.map((flight, index) => (
        <View
          key={index}
          className="bg-gray-100 p-6 rounded-lg mb-6 shadow-lg"
        >
          <Text className="text-xl font-bold text-blue-500 mb-4">{flight.date}</Text>

          {/* Ícone e Partida */}
          <View className="flex flex-row items-center mb-4">
            <Icon name="plane" size={28} color="#3b82f6" className="mr-3" />
            <Text className="text-lg text-gray-800">Partida: {flight.departure}</Text>
          </View>

          {/* Escalas */}
          {flight.stops.map((stop, stopIndex) => (
            <View key={stopIndex} className="flex flex-row items-center mb-3">
              <Icon name="plane" size={24} color="#6b7280" className="mr-3" />
              <Text className="text-lg text-gray-600">
                Escala: {stop.location} às {stop.time}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default FlightInfoCard;