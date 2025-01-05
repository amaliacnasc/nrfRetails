import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Atualizado para FontAwesome5

const HotelInfoCard: React.FC = () => {
  const hotelInfo = {
    hotelName: "Millennium Hotel Broadway Times Square",
    address: "145 W 44th St, New York, NY 10036, United States",
    checkIn: "14h00",
    checkOut: "12h00",
    services: [
      { name: "Academia", icon: "dumbbell" }, // Suportado no FontAwesome5
      { name: "Restaurante e Bar", icon: "utensils" },
      { name: "Equipe Multilíngue", icon: "globe" },
      { name: "Programa Infantil 'Ask Alfred'", icon: "child" },
      { name: "Wi-Fi Cortesia", icon: "wifi" },
      { name: "Instalações para Reuniões e Eventos", icon: "building" },
    ],
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-6 border-b border-gray-300">
        <Text className="text-2xl font-bold text-blue-500">{hotelInfo.hotelName}</Text>
        <Text className="text-gray-700">{hotelInfo.address}</Text>
        <Text className="text-gray-700 mt-2">
          Check-in: <Text className="text-blue-500">{hotelInfo.checkIn}</Text> | Check-out:{" "}
          <Text className="text-blue-500">{hotelInfo.checkOut}</Text>
        </Text>
      </View>
      <View className="p-4 items-center">
        <Text className="text-lg font-semibold text-blue-600 mb-4 text-center">Serviços Incluídos:</Text>
        <View className="flex flex-row flex-wrap justify-center">
          {hotelInfo.services.map((service, index) => (
            <View
              key={index}
              className="w-1/2 p-3"
            >
              <View className="bg-white aspect-square flex justify-center items-center rounded-md shadow-sm border border-gray-200">
                <Icon name={service.icon} size={32} color="#3b82f6" />
                <Text className="text-center text-blue-500 font-medium mt-2">{service.name}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HotelInfoCard;