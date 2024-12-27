import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Event } from '@/interfaces/eventInterface';
import EventModal from './EventModal';

interface EventCardProps {
  event: Event;
  isFavorite: boolean;
  onFavoriteSuccess?: (event: Event) => void;
  onRemoveFavorite?: () => void;
  onCheckin?: (event: Event) => void;
}

export default function EventCard({
  event,
  isFavorite,
  onFavoriteSuccess,
  onRemoveFavorite,
  onCheckin,
}: EventCardProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const formattedDate = event.date.split('-').reverse().join('/');

  const handleFavorite = () => {
    if (onFavoriteSuccess) {
      onFavoriteSuccess(event);
    }
  };

  const handleRemoveFavorite = () => {
    if (onRemoveFavorite) {
      onRemoveFavorite();
    }
  };

  const handleCheckin = () => {
    if (onCheckin) {
      onCheckin(event);
    }
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className="bg-white rounded-lg p-4 shadow-sm my-2">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">{event.title}</Text>
            {isFavorite ? (
              <TouchableOpacity onPress={handleRemoveFavorite}>
                <MaterialIcons name="bookmark" size={24} color="#0056D6" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleFavorite}>
                <MaterialIcons name="bookmark-border" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-row items-center mb-3">
            <View className="flex-row items-center mr-4">
              <MaterialIcons name="calendar-today" size={20} color="#0056D6" />
              <Text className="ml-2 text-sm text-blue-600">{formattedDate}</Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="access-time" size={20} color="#0056D6" />
              <Text className="ml-2 text-sm text-blue-600">{event.time}</Text>
            </View>
          </View>
          <Text className="text-base font-semibold text-gray-800 mb-2">Sobre</Text>
          <Text className="text-sm text-gray-600 mb-3">{event.description}</Text>
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="place" size={20} color="#666" />
            <Text className="ml-2 text-sm text-gray-600">{event.location}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <EventModal
        event={event}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onCheckin={handleCheckin}
      />
    </>
  );
}