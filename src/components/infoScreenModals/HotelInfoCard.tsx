import React from 'react';
import { View, Text } from 'react-native';

interface HotelInfoCardProps {
  hotelName: string;
  address: string;
  checkIn: string;
  checkOut: string;
  services: string[];
}

const HotelInfoCard: React.FC<HotelInfoCardProps> = ({ hotelName, address, checkIn, checkOut, services }) => {
  return (
    <View className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
      <Text className="text-lg font-semibold text-gray-800 mb-2">{hotelName}</Text>
      <Text className="text-gray-700 mb-2">{address}</Text>
      <Text className="text-gray-700 mb-2">Check-in: {checkIn} | Check-out: {checkOut}</Text>
      <Text className="text-gray-700 font-semibold">Serviços Incluídos:</Text>
      {services.map((service, index) => (
        <Text key={index} className="text-gray-700">- {service}</Text>
      ))}
    </View>
  );
};

export default HotelInfoCard;