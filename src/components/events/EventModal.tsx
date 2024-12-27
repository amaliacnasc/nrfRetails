import React from 'react';
import { View, Text, Modal, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Event } from '@/interfaces/eventInterface';

interface EventModalProps {
  event: Event;
  isVisible: boolean;
  onClose: () => void;
  onCheckin: () => void;
}

export default function EventModal({ event, isVisible, onClose, onCheckin }: EventModalProps) {
  const formattedDate = event.date.split('-').reverse().join('/');

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <ScrollView className="p-4 bg-white">
        <Text className="text-xl font-bold text-gray-800 mb-4">{event.title}</Text>
        <Text className="text-sm text-gray-600 mb-2">Data: {formattedDate}</Text>
        <Text className="text-sm text-gray-600 mb-2">Hora: {event.time}</Text>
        <Text className="text-base font-semibold text-gray-800 mb-2">Sobre</Text>
        <Text className="text-sm text-gray-600 mb-4">{event.description}</Text>
        <Text className="text-base font-semibold text-gray-800 mb-2">Endereço</Text>
        <Text className="text-sm text-gray-600 mb-4">{event.location}</Text>
        {event.speaker && event.speaker.length > 0 && (
          <>
            <Text className="text-base font-semibold text-gray-800 mb-2">Palestrantes</Text>
            {event.speaker.map((speaker) => (
              <View key={speaker.idSpeaker} className="mb-4">
                <Text className="text-sm font-bold text-gray-800">{speaker.name}</Text>
                <Text className="text-sm text-gray-600">{speaker.description}</Text>
                <Text className="text-sm text-gray-500">
                  {speaker.role} - {speaker.company}
                </Text>
              </View>
            ))}
          </>
        )}
        <View className="mt-4">
          <Button title="Fazer Check-in" onPress={onCheckin} color="#0056D6" />
        </View>
        <TouchableOpacity onPress={onClose} className="mt-6">
          <Text className="text-sm text-blue-600 text-center">Fechar</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}
