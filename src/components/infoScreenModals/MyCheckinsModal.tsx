import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
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
       // Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        return;
      }
      const participant = JSON.parse(storedParticipant);
      const checkinsData = await fetchCheckinsByParticipant(participant.idParticipant);
      setCheckins(checkinsData);
    } catch (error) {
      //Alert.alert('Erro', 'Não foi possível carregar seus check-ins.');
     // console.error('Erro ao carregar check-ins:', error);
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
       //   console.error('Erro ao carregar o nome do evento:', error);
        }
      }
      setEventNames(events);
    };

    loadEventNames();
  }, [checkins]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-gray-100 p-4">
        <Text className="text-2xl font-bold text-black mb-4 text-center">Meus Check-ins</Text>
        {loading ? (
          <Text className="text-center text-lg text-gray-600">Carregando check-ins...</Text>
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
            ListEmptyComponent={<Text className="text-center text-lg text-gray-600">Você não tem check-ins registrados.</Text>}
          />
        )}
        <TouchableOpacity onPress={onClose} className="bg-blue-600 rounded-lg p-4 mt-6">
          <Text className="text-white text-center text-lg font-bold">Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MyCheckinsModal;