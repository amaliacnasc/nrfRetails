import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
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
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'ios' ? 60 : 20, // Ajuste para iOS e Android
        }}
      >
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#d1d1d1' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>Participantes</Text>
        </View>

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView style={{ padding: 16 }}>
            {participants.map((participant, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#f3f3f3',
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 3,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
                  {participant.name}
                </Text>
                <Text style={{ fontSize: 14, color: '#555' }}>
                  Contato: {formatPhone(participant.contact)}
                </Text>
                <Text style={{ fontSize: 14, color: '#555' }}>
                  Cargo: {participant.position}
                </Text>
                <Text style={{ fontSize: 14, color: '#555' }}>
                  Empresa: {participant.companyName}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={onClose}
          style={{
            padding: 16,
            backgroundColor: '#0056D6',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ParticipantsModal;