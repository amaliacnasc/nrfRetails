import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TravelGuideModal from '@/components/infoScreenModals/TravelGuideModal';
import TranslatorModal from '@/components/infoScreenModals/TranslatorModal';
import ParticipantsModal from '@/components/infoScreenModals/ParticipantsModal';
import ContactModal from '@/components/infoScreenModals/ContactModal';
import EditProfileModal from '@/components/infoScreenModals/EditProfileModal';
import { getParticipantByEmail, updateParticipant } from '@/services/participantService';
import { Participant } from '@/interfaces/participantInterface';

const InfoScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const [modalParticipantsVisible, setModalParticipantsVisible] = useState(false);
  const [modalTravelGuideVisible, setModalTravelGuideVisible] = useState(false);
  const [modalTranslatorVisible, setModalTranslatorVisible] = useState(false);

  const [formData, setFormData] = useState({
    nome: 'Carregando nome...',
    email: 'Carregando e-mail...',
    empresa: '',
    cargo: '',
    contato: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const email = 'joao.silva@example.com'; 
        const participant: Participant = await getParticipantByEmail(email);

        if (participant) {
          setFormData({
            nome: participant.name || 'Nome não disponível',
            email: participant.email || '',
            empresa: participant.companyName || '',
            cargo: '',
            contato: ''
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const updatedParticipant: Participant = {
        idParticipant: 0, // Use o ID real, se necessário
        name: formData.nome,
        email: formData.email,
        companyName: formData.empresa,
        AreaOfExpertise: [],
        postPermission: undefined,
      };
     // await updateParticipant(updatedParticipant);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      {/* Título */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-black text-center">Informações</Text>
        <View className="border-b border-gray-300 mt-4" />
      </View>

      {/* Informações do Usuário */}
      <View className="items-center mt-4 mb-6">
        <Text className="text-lg font-semibold text-black">{formData.nome}</Text>
        <Text className="text-sm text-gray-500">{formData.email}</Text>
      </View>

      {/* Seção 1: Minha Conta */}
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-black mb-2">Minha Conta</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="py-2 border-b border-gray-200 flex-row items-center justify-between"
        >
          <MaterialIcons name="person" size={20} color="black" />
          <Text className="text-black ml-2">Editar Perfil</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Seção 2: Central de Atendimento */}
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-black mb-2">Central de Atendimento</Text>
        <TouchableOpacity onPress={() => setModalContactVisible(true)} className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="phone" size={20} color="black" />
          <Text className="text-black ml-2">Contatos dos Coordenadores</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalParticipantsVisible(true)} className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="group" size={20} color="black" />
          <Text className="text-black ml-2">Participantes</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalTranslatorVisible(true)} className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="translate" size={20} color="black" />
          <Text className="text-black ml-2">Tradutor</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalTravelGuideVisible(true)} className="py-2 flex-row items-center justify-between">
          <MaterialIcons name="map" size={20} color="black" />
          <Text className="text-black ml-2">Guia de Viagem</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity className="border border-red-500 bg-transparent p-4 rounded-lg items-center my-16">
        <Text className="text-red-500 font-bold">Sair da Conta</Text>
      </TouchableOpacity>

      {/* Modais */}
      <ContactModal visible={modalContactVisible} onClose={() => setModalContactVisible(false)} />
      <ParticipantsModal visible={modalParticipantsVisible} onClose={() => setModalParticipantsVisible(false)} />
      <TranslatorModal visible={modalTranslatorVisible} onClose={() => setModalTranslatorVisible(false)} />
      <TravelGuideModal visible={modalTravelGuideVisible} onClose={() => setModalTravelGuideVisible(false)} />
      <EditProfileModal
        visible={modalVisible}
        formData={formData}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        handleInputChange={handleInputChange}
      />
    </ScrollView>
  );
};

export default InfoScreen;