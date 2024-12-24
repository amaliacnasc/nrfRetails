import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import TravelGuideModal from '@/components/infoScreenModals/TravelGuideModal';
import TranslatorModal from '@/components/infoScreenModals/TranslatorModal';
import ParticipantsModal from '@/components/infoScreenModals/ParticipantsModal';
import ContactModal from '@/components/infoScreenModals/ContactModal';
import EditProfileModal from '@/components/infoScreenModals/EditProfileModal';
import { Participant } from '@/interfaces/participantInterface';
import { RootStackParamList } from "@/types/types";

type InfoScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const InfoScreen: React.FC = () => {
  const navigation = useNavigation<InfoScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const [modalParticipantsVisible, setModalParticipantsVisible] = useState(false);
  const [modalTravelGuideVisible, setModalTravelGuideVisible] = useState(false);
  const [modalTranslatorVisible, setModalTranslatorVisible] = useState(false);

  const [formData, setFormData] = useState({
    nome: 'Carregando nome...',
    email: 'Carregando e-mail...',
    empresa: '',
    position: '',
    contact: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedParticipant = await AsyncStorage.getItem('participant');
        if (storedParticipant) {
          const participant: Participant = JSON.parse(storedParticipant);
          setFormData({
            nome: participant.name || 'Nome não disponível',
            email: participant.email || '',
            empresa: participant.companyName || '',
            position: '',
            contact: '',
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
        idParticipant: 0,
        name: formData.nome,
        email: formData.email,
        position: formData.position,
        contact:formData.contact,
        companyName: formData.empresa,
        
        AreaOfExpertise: [],
        postPermission: undefined,
      };

      await AsyncStorage.setItem('participant', JSON.stringify(updatedParticipant));
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      //Alert.alert("Sucesso", "Você saiu da conta.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
      console.error("Erro ao sair da conta:", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      <View className="p-4">
        <Text className="text-2xl font-bold text-black text-center">Informações</Text>
        <View className="border-b border-gray-300 mt-4" />
      </View>

      <View className="items-center mt-4 mb-6">
        <Text className="text-lg font-semibold text-black">{formData.nome}</Text>
        <Text className="text-sm text-gray-500">{formData.email}</Text>
      </View>

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

      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-black mb-2">Central de Atendimento</Text>
        <TouchableOpacity
          onPress={() => setModalContactVisible(true)}
          className="py-2 border-b border-gray-200 flex-row items-center justify-between"
        >
          <MaterialIcons name="phone" size={20} color="black" />
          <Text className="text-black ml-2">Contatos dos Coordenadores</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalParticipantsVisible(true)}
          className="py-2 border-b border-gray-200 flex-row items-center justify-between"
        >
          <MaterialIcons name="group" size={20} color="black" />
          <Text className="text-black ml-2">Participantes</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalTranslatorVisible(true)}
          className="py-2 border-b border-gray-200 flex-row items-center justify-between"
        >
          <MaterialIcons name="translate" size={20} color="black" />
          <Text className="text-black ml-2">Tradutor</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalTravelGuideVisible(true)}
          className="py-2 flex-row items-center justify-between"
        >
          <MaterialIcons name="map" size={20} color="black" />
          <Text className="text-black ml-2">Guia de Viagem</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="border border-red-500 bg-transparent p-4 rounded-lg items-center my-16"
      >
        <Text className="text-red-500 font-bold">Sair da Conta</Text>
      </TouchableOpacity>

      <ContactModal visible={modalContactVisible} onClose={() => setModalContactVisible(false)} />
      <ParticipantsModal
        visible={modalParticipantsVisible}
        onClose={() => setModalParticipantsVisible(false)}
      />
      <TranslatorModal
        visible={modalTranslatorVisible}
        onClose={() => setModalTranslatorVisible(false)}
      />
      <TravelGuideModal
        visible={modalTravelGuideVisible}
        onClose={() => setModalTravelGuideVisible(false)}
      />
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