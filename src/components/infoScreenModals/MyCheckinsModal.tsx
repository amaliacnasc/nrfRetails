import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkin } from '@/interfaces/checkinInterface';
import { fetchCheckinsByParticipant } from '@/services/checkinService';
import { fetchEventById } from '@/services/eventService';
import MyCheckinsCard from './MyCheckinsCard';

interface MyCheckinsModalProps {
  visible: boolean;
  onClose: () => void;
}

const MyCheckinsModal: React.FC<MyCheckinsModalProps> = ({ visible, onClose }) => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventNames, setEventNames] = useState<{ [key: number]: string }>({});

  const loadCheckins = async () => {
    setLoading(true);
    try {
      const storedParticipant = await AsyncStorage.getItem('participant');
      if (!storedParticipant) {
        return;
      }
      const participant = JSON.parse(storedParticipant);
      const checkinsData = await fetchCheckinsByParticipant(participant.idParticipant);
      setCheckins(checkinsData);
    } catch (error) {
      console.error('Erro ao carregar check-ins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      loadCheckins();
    }
  }, [visible]);

  useEffect(() => {
    const loadEventNames = async () => {
      const events: { [key: number]: string } = {};
      for (const checkin of checkins) {
        try {
          const event = await fetchEventById(checkin.idActivity);
          events[checkin.idActivity] = event.title;
        } catch (error) {
          console.error('Erro ao carregar o nome do evento:', error);
        }
      }
      setEventNames(events);
    };

    if (checkins.length > 0) {
      loadEventNames();
    }
  }, [checkins]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className={`flex-1 bg-gray-100 ${Platform.OS === 'ios' ? 'pt-16' : 'pt-6'} px-4`}>
        <Text className="text-2xl font-bold text-black text-center mb-4">Meus Check-ins</Text>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-2 text-lg text-gray-600">Carregando check-ins...</Text>
          </View>
        ) : (
          <FlatList
            data={checkins}
            renderItem={({ item }) => (
              <MyCheckinsCard
                eventName={eventNames[item.idActivity] || 'Carregando...'}
                checkinDateTime={item.checkinDateTime}
              />
            )}
            keyExtractor={(item) => item.idCheckin.toString()}
            ListEmptyComponent={
              <Text className="text-center text-lg text-gray-600">
                Você não tem check-ins registrados.
              </Text>
            }
          />
        )}
        <View className="absolute bottom-5 left-0 right-0">
          <TouchableOpacity
            onPress={onClose}
            className="bg-blue-500 p-4 rounded-none w-full justify-center items-center"
          >
            <Text className="text-white text-lg font-bold">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyCheckinsModal;