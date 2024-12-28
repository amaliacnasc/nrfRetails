import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Event } from '@/interfaces/eventInterface';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCheckin } from '@/services/checkinService';

interface EventDetailsProps {
  event: Event;
  isVisible: boolean;
  onClose: () => void;
  onCheckin: () => void;
  hasCheckedIn: boolean;
  loadEvents: () => Promise<void>;
}

export default function EventDetails({
  event,
  isVisible,
  onClose,
  onCheckin,
  hasCheckedIn,
  loadEvents,
}: EventDetailsProps) {
  const [hasCheckedInState, setHasCheckedInState] = useState(hasCheckedIn);

  const formattedDate = event.date.split('-').reverse().join('/');
  const formattedTime = event.time.split(':').slice(0, 2).join(':');

  const handleCheckin = async () => {
    try {
      const storedParticipant = await AsyncStorage.getItem('participant');
      if (!storedParticipant) {
        Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        return;
      }

      const participant = JSON.parse(storedParticipant);
      const checkinData = {
        idActivity: event.idActivity,
        idParticipant: participant.idParticipant,
      };

      await createCheckin(checkinData);
      Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
      setHasCheckedInState(true);
      onCheckin();
      await loadEvents();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o check-in.');
    }
  };

  useEffect(() => {
    setHasCheckedInState(hasCheckedIn);
  }, [hasCheckedIn]);

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">{event.title}</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="calendar-today" size={24} color="#0056D6" />
            <Text className="ml-3 text-lg text-blue-600">Data: {formattedDate}</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="access-time" size={24} color="#0056D6" />
            <Text className="ml-3 text-lg text-blue-600">Hora: {formattedTime}</Text>
          </View>
          <View className="mb-4">
            <Text className="text-xl font-semibold text-gray-800">Sobre</Text>
            <Text className="text-lg text-gray-600 mt-2">{event.description}</Text>
          </View>
          <View className="mb-4">
            <Text className="text-xl font-semibold text-gray-800">Endereço</Text>
            <Text className="text-lg text-gray-600 mt-2">{event.location}</Text>
          </View>
          {event.speaker && event.speaker.length > 0 && (
            <View className="mb-4">
              <Text className="text-xl font-semibold text-gray-800">Palestrantes</Text>
              {event.speaker.map((speaker) => (
                <View key={speaker.idSpeaker} className="mt-3">
                  <Text className="text-lg font-bold text-gray-800">{speaker.name}</Text>
                  <Text className="text-lg text-gray-600">{speaker.description}</Text>
                  <Text className="text-lg text-gray-500">
                    {speaker.role} - {speaker.company}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <View className="p-4 bg-white">
          {hasCheckedInState ? (
            <TouchableOpacity disabled className="bg-gray-400 rounded-lg p-4 mb-4">
              <Text className="text-white text-center text-lg font-bold">Check-in realizado</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleCheckin} className="bg-blue-600 rounded-lg p-4 mb-4">
              <Text className="text-white text-center text-lg font-bold">Fazer Check-in</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-600 text-center text-lg">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}