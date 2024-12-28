import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '@/interfaces/eventInterface';
import EventDetails from './EventDetailsModal';

interface EventCardProps {
  event: Event;
  isFavorite: boolean;
  onFavoriteSuccess?: (event: Event) => void;
  onRemoveFavorite?: () => void;
  onCheckin?: (event: Event) => void;
  loadEvents: () => Promise<void>;
}

export default function EventCard({
  event,
  isFavorite,
  onFavoriteSuccess,
  onRemoveFavorite,
  onCheckin,
  loadEvents,
}: EventCardProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const formattedDate = event.date.split('-').reverse().join('/');
  const formattedTime = event.time.split(':').slice(0, 2).join(':');

  useEffect(() => {
    const checkIfCheckedIn = async () => {
      try {
        const storedParticipant = await AsyncStorage.getItem('participant');
        if (!storedParticipant) {
          setHasCheckedIn(false);
          return;
        }

        const participant = JSON.parse(storedParticipant);
        const isCheckedIn = event.checkins?.some(
          (checkin) => checkin.participant?.idParticipant === participant.idParticipant
        );

        setHasCheckedIn(!!isCheckedIn);
      } catch {
        setHasCheckedIn(false);
      }
    };

    checkIfCheckedIn();
  }, [event.checkins]);

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
              <Text className="ml-2 text-sm text-blue-600">{formattedTime}</Text>
            </View>
          </View>
          <Text className="text-base font-semibold text-gray-800 mb-2">Sobre</Text>
          <Text className="text-sm text-gray-600 mb-3">{event.description}</Text>
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="place" size={20} color="#666" />
            <Text className="ml-2 text-sm text-gray-600">{event.location}</Text>
          </View>
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
      </TouchableOpacity>

      <EventDetails
        event={event}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onCheckin={handleCheckin}
        hasCheckedIn={hasCheckedIn}
        loadEvents={loadEvents}
      />
    </>
  );
}