import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Event } from '@/interfaces/eventInterface';

export default function EventCard({ event }: { event: Event }) {
  return (
    <View className="bg-white rounded-lg p-4 shadow-sm my-2">
      {/* Título e Ícone de Favorito */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">{event.title}</Text>
        <Feather name="bookmark" size={24} color="#666" />
      </View>

      {/* Data e Hora */}
      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center mr-4">
          <Feather name="calendar" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">
            {new Date(event.date).toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="clock" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">{event.time}</Text>
        </View>
      </View>

      {/* Sobre */}
      <Text className="text-base font-semibold text-gray-800 mb-2">Sobre</Text>
      <Text className="text-sm text-gray-600 mb-3">{event.description}</Text>

      {/* Endereço */}
      <View className="flex-row items-center mb-3">
        <Feather name="map-pin" size={20} color="#666" />
        <Text className="ml-2 text-sm text-gray-600">{event.location}</Text>
      </View>

      {/* Palestrantes */}
      {event.speaker && event.speaker.length > 0 && (
        <View className="mb-3">
          <Text className="text-base font-semibold text-gray-800">Palestrantes</Text>
          {event.speaker.map((sp, index) => (
            <Text key={index} className="text-sm text-gray-600">
              {sp.name} - {sp.role} ({sp.company})
            </Text>
          ))}
        </View>
      )}

      {/* Áreas de Especialização */}
      {event.areaOfExpertise && event.areaOfExpertise.length > 0 && (
        <View>
          <Text className="text-base font-semibold text-gray-800">Áreas de Especialização</Text>
          {event.areaOfExpertise.map((area, index) => (
            <Text key={index} className="text-sm text-gray-600">
              {area.name}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}