import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MyCheckinsCardProps {
  eventName: string;
  checkinDateTime: string | Date;
}

const MyCheckinsCard: React.FC<MyCheckinsCardProps> = ({ eventName, checkinDateTime }) => {
  const date = new Date(checkinDateTime);

  if (isNaN(date.getTime())) {
    return (
      <View className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <Text className="text-lg font-bold text-gray-900">{`Evento: ${eventName}`}</Text>
        <Text className="text-sm text-red-600 mt-2">Data e Hora inválidas</Text>
      </View>
    );
  }

  const formattedDate = date.toLocaleDateString('pt-BR');
  const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <Text className="text-xl font-bold text-gray-800 mb-2">{`Evento: ${eventName}`}</Text>

      <View className="flex-row items-center mb-3">
        <MaterialCommunityIcons name="calendar" size={20} color="#0056D6" />
        <Text className="ml-2 text-sm text-blue-600">Data e Hora do checkin:</Text>
      </View>

      <View className="flex-row items-center gap-2 mb-3">
        <MaterialCommunityIcons name="calendar-today" size={20} color="#0056D6" />
        <Text className="text-sm text-gray-600">{formattedDate}</Text>
        <MaterialCommunityIcons name="clock-outline" size={20} color="#0056D6" />
        <Text className="text-sm text-gray-600">{formattedTime}</Text>
      </View>
    </View>
  );
};

export default MyCheckinsCard;