import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { getAllParticipants } from '@/services/participantService';
import useFormatPhone from '@/hooks/useFormatPhone';

interface ParticipantsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ visible, onClose }) => {
  const { formatPhone } = useFormatPhone(); // Usando o hook customizado
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
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <View className="p-4 border-b border-gray-300">
          <Text className="text-lg font-bold">Participantes</Text>
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
                className="bg-gray-100 p-4 rounded-lg mb-2 shadow"
              >
                <Text className="text-black font-bold">{participant.name}</Text>
                <Text className="text-gray-500">
                  Contato: {formatPhone(participant.contact)}
                </Text>
                <Text className="text-gray-500">Cargo: {participant.position}</Text>
                <Text className="text-gray-500">Empresa: {participant.companyName}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={onClose}
          className="p-4 bg-blue-500"
        >
          <Text className="text-white text-center">Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ParticipantsModal;