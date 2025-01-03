  import React, { useEffect, useState } from 'react';
  import { Modal, ScrollView, ActivityIndicator, Platform, View, Text, TouchableOpacity } from 'react-native';
  import { getAllParticipants } from '@/services/participantService';
  import { Participant } from '@/interfaces/participantInterface';
  import useFormatPhone from '@/hooks/useFormatPhone';

  interface ContactModalProps {
    visible: boolean;
    onClose: () => void;
  }

  const ContactModal: React.FC<ContactModalProps> = ({ visible, onClose }) => {
    const { formatPhone } = useFormatPhone();
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

    return (
      <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
        <View className={`flex-1 bg-white ${Platform.OS === 'ios' ? 'pt-16' : 'pt-6'}`}>
          <View className="p-4 border-b border-gray-300">
            <Text className="text-xl font-bold text-black">Contatos dos Coordenadores</Text>
          </View>

          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <ScrollView className="p-4">
              {contacts.map((contact) => (
                <View key={contact.idParticipant} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
                  <Text className="text-base font-bold text-black">{contact.name}</Text>
                  <Text className="text-sm text-gray-600">Contato: {formatPhone(contact.contact)}</Text>
                  <Text className="text-sm text-gray-600">Cargo: {contact.position}</Text>
                  <Text className="text-sm text-gray-600">Empresa: {contact.companyName}</Text>
                </View>
              ))}
            </ScrollView>
          )}

          <TouchableOpacity onPress={onClose} className="bg-blue-500 w-full mb-5 p-4">
            <Text className="text-white text-center text-lg font-bold">Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  export default ContactModal;