import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SaveActivity } from '@/interfaces/savedEventsInterface';

interface FavoriteEventCardProps {
  favorite: SaveActivity;
  onRemoveFavorite: (favorite: SaveActivity) => void; 
}

export default function FavoriteEventCard({ favorite, onRemoveFavorite }: FavoriteEventCardProps) {
  const { activity } = favorite;
  const formattedDate = activity.date.split('-').reverse().join('/');

  const handleRemoveFavorite = () => {
    Alert.alert(
      'Remover Favorito',
      `Deseja remover o evento "${activity.title}" dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => onRemoveFavorite(favorite) },
      ]
    );
  };

  return (
    <View className="bg-white rounded-lg p-4 shadow-sm my-2">
      {/* Título e botão de desfavoritar */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">{activity.title}</Text>
        <TouchableOpacity onPress={handleRemoveFavorite}>
          <MaterialCommunityIcons name="bookmark" size={24} color="#0056D6" /> 
        </TouchableOpacity>
      </View>

      {/* Data e Hora */}
      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center mr-4">
          <MaterialCommunityIcons name="calendar" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">{formattedDate}</Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="clock" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">{activity.time}</Text>
        </View>
      </View>

      {/* Descrição */}
      <Text className="text-base font-semibold text-gray-800 mb-2">Sobre</Text>
      <Text className="text-sm text-gray-600 mb-3">{activity.description}</Text>

      {/* Localização */}
      <View className="flex-row items-center mb-3">
        <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
        <Text className="ml-2 text-sm text-gray-600">{activity.location}</Text>
      </View>

      {/* Palestrantes */}
      {activity.speaker && activity.speaker.length > 0 && (
        <>
          <Text className="text-base font-semibold text-gray-800 mb-2">Palestrantes</Text>
          {activity.speaker.map((speaker) => (
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