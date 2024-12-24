import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Event } from '@/interfaces/eventInterface';

interface EventCardProps {
  event: Event;
  onFavorite: (event: Event) => void;
}

export default function EventCard({ event, onFavorite }: EventCardProps) {
  const formattedDate = event.date.split('-').reverse().join('/');

  return (
    <View className="bg-white rounded-lg p-4 shadow-sm my-2">
      {/* Título e botão de favoritar */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">{event.title}</Text>
        <TouchableOpacity onPress={() => onFavorite(event)}>
          <Feather name="bookmark" size={24} color="#0056D6" />
        </TouchableOpacity>
      </View>

      {/* Data e Hora */}
      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center mr-4">
          <Feather name="calendar" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">{formattedDate}</Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="clock" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">{event.time}</Text>
        </View>
      </View>

      {/* Descrição */}
      <Text className="text-base font-semibold text-gray-800 mb-2">Sobre</Text>
      <Text className="text-sm text-gray-600 mb-3">{event.description}</Text>

      {/* Localização */}
      <View className="flex-row items-center mb-3">
        <Feather name="map-pin" size={20} color="#666" />
        <Text className="ml-2 text-sm text-gray-600">{event.location}</Text>
      </View>

      {/* Palestrantes */}
      {event.speaker && event.speaker.length > 0 && (
        <>
          <Text className="text-base font-semibold text-gray-800 mb-2">Palestrantes</Text>
          {event.speaker.map((speaker) => (
            <View key={speaker.idSpeaker} className="mb-2">
              <Text className="text-sm text-gray-800 font-bold">{speaker.name}</Text>
              <Text className="text-sm text-gray-600">{speaker.description}</Text>
              <Text className="text-sm text-gray-500">
                {speaker.role} - {speaker.company}
              </Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}