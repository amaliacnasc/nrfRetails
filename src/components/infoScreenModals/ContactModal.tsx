import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { getAllParticipants } from '@/services/participantService';
import { Participant } from '@/interfaces/participantInterface';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ visible, onClose }) => {
  const [contacts, setContacts] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      loadContacts();
    }
  }, [visible]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllParticipants();
      const filteredContacts = data.filter((contact) => contact.postPermission === 1);
      setContacts(filteredContacts);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (phone: string): string => {
    if (!phone) return 'N/A';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
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
          <Text className="text-lg font-bold">Contatos dos Coordenadores</Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView className="p-4">
            {contacts.map((contact) => (
              <View
                key={contact.idParticipant}
                className="bg-gray-100 p-4 rounded-lg mb-2 shadow"
              >
                <Text className="text-black font-bold">{contact.name}</Text>
                <Text className="text-gray-500">
                  Contato: {formatPhone(contact.contact)}
                </Text>
                <Text className="text-gray-500">Cargo: {contact.position}</Text>
                <Text className="text-gray-500">Empresa: {contact.companyName}</Text>
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

export default ContactModal;