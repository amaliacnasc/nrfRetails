import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SaveActivity } from '@/interfaces/savedEventsInterface';

interface FavoriteEventCardProps {
  favorite: SaveActivity;
  onRemoveFavorite: (favorite: SaveActivity) => void;
  isFavorited: boolean; // Adiciona a prop para indicar se está favoritado
  onToggleFavorite: (favorite: SaveActivity) => void; // Adiciona a ação para alternar o estado
}

export default function FavoriteEventCard({
  favorite,
  onRemoveFavorite,
  isFavorited,
  onToggleFavorite,
}: FavoriteEventCardProps) {
  const { activity } = favorite;

  if (!activity) {
    return null;
  }

  const formattedDate = activity.date?.split('-').reverse().join('/') || 'Data não disponível';
  const formattedTime = activity.time?.split(':').slice(0, 2).join(':') || 'Hora não disponível';
  const description = activity.description || 'Descrição não disponível';
  const location = activity.location || 'Local não especificado';

  const handleToggleFavorite = () => {
    onToggleFavorite(favorite);
  };

  return (
    <View className="bg-white rounded-lg p-4 shadow-sm my-2">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">{activity.title || 'Título não disponível'}</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <MaterialCommunityIcons
            name={isFavorited ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="#0056D6"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center mr-4">
          <MaterialCommunityIcons name="calendar" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">{formattedDate}</Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="clock-outline" size={20} color="#0056D6" />
          <Text className="ml-2 text-sm text-blue-600">{formattedTime}</Text>
        </View>
      </View>

      <Text className="text-base font-semibold text-gray-800 mb-2">Sobre</Text>
      <Text className="text-sm text-gray-600 mb-3">{description}</Text>

      <View className="flex-row items-center mb-3">
        <MaterialCommunityIcons name="map-marker-outline" size={20} color="#666" />
        <Text className="ml-2 text-sm text-gray-600">{location}</Text>
      </View>

      {activity.speaker && activity.speaker.length > 0 ? (
        <>
          <Text className="text-base font-semibold text-gray-800 mb-2">Palestrantes</Text>
          {activity.speaker.map((speaker: any) => (
            <View key={speaker.idSpeaker} className="mb-2">
              <Text className="text-sm text-gray-800 font-bold">{speaker.name || 'Nome não disponível'}</Text>
              <Text className="text-sm text-gray-600">{speaker.description || 'Sem descrição'}</Text>
              <Text className="text-sm text-gray-500">
                {speaker.role || 'Sem cargo'} - {speaker.company || 'Sem empresa'}
              </Text>
            </View>
          ))}
        </>
      ) : (
        <Text className="text-sm text-gray-600">Nenhum palestrante disponível.</Text>
      )}
    </View>
  );
}