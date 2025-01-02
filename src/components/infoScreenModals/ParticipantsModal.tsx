import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, ActivityIndicator, Platform, View, Text, TouchableOpacity } from 'react-native';
import { getAllParticipants } from '@/services/participantService';
import useFormatPhone from '@/hooks/useFormatPhone';

interface ParticipantsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ visible, onClose }) => {
  const { formatPhone } = useFormatPhone();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      loadParticipants();
    }
  }, [visible]);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      const data = await getAllParticipants();
      setParticipants(data);
    } catch (error) {
      console.error('Erro ao carregar participantes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
      <View className={`flex-1 bg-white ${Platform.OS === 'ios' ? 'pt-16' : 'pt-6'}`}>
        <View className="p-4 border-b border-gray-300">
          <Text className="text-xl font-bold text-black">Participantes</Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView className="p-4">
            {participants.map((participant, index) => (
              <View
                key={index}
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow"
              >
                <Text className="text-base font-bold text-black">{participant.name}</Text>
                <Text className="text-sm text-gray-600">Contato: {formatPhone(participant.contact)}</Text>
                <Text className="text-sm text-gray-600">Cargo: {participant.position}</Text>
                <Text className="text-sm text-gray-600">Empresa: {participant.companyName}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={onClose}
          className="bg-blue-500 w-full mb-5 p-4"
        >
          <Text className="text-white text-center text-lg font-bold">Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ParticipantsModal;