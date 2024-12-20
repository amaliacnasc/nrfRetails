import {  View, StatusBar, Image, Modal, ScrollView, TextInput, TouchableOpacity, Text, FlatList, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PostCard from '../../linha do tempo/postcard'; // Importa o componente

import "../global.css";
import HomeScreen from './home';
import axios from 'axios';

const InfoScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const [modalParticipantsVisible, setModalParticipantsVisible] = useState(false);
  const [modalTranslatorVisible, setModalTranslatorVisible] = useState(false);
  const [modalTravelGuideVisible, setModalTravelGuideVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: 'Carregando nome...',
    email: 'Carregando e-mail...',
    empresa: '',
    cargo: '',
    contato: ''
  });

  // Função para buscar os dados do usuário
  const fetchUserData = async () => {
    try {
      const response = await axios.get('<URL_DO_BACKEND>/usuario'); // Substitua pela URL da API
      const { nome, email } = response.data;
      setFormData((prevData) => ({ ...prevData, nome, email }));
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  // UseEffect para carregar os dados quando a tela abrir
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put('<URL_DO_BACKEND>/usuario', formData); // Substitua pela URL da API
      console.log('Dados do Perfil atualizados:', formData);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  };

  // Modal de Contato com Coordenadores
  const ContactModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalContactVisible}
      onRequestClose={() => setModalContactVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-4">Contato com Coordenadores</Text>
          <FlatList
            data={[{ name: 'João Silva', phone: '123-456-789' }, { name: 'Maria Souza', phone: '987-654-321' }]} // Lista estática
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-200">
                <Text className="text-black">{item.name}</Text>
                <Text className="text-gray-500">{item.phone}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalContactVisible(false)}
            className="mt-4 bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Modal de Participantes
  const ParticipantsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalParticipantsVisible}
      onRequestClose={() => setModalParticipantsVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-4">Participantes</Text>
          <FlatList
            data={[{ name: 'Ana Beatriz', cargo: 'Líder', contato: '111-222-333' }, { name: 'Carlos Oliveira', cargo: 'Desenvolvedor', contato: '444-555-666' }]} // Lista estática
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-200">
                <View>
                  <Text className="text-black">{item.name}</Text>
                  <Text className="text-gray-500">{item.cargo}</Text>
                </View>
                <Text className="text-gray-500">{item.contato}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalParticipantsVisible(false)}
            className="mt-4 bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Modal de Tradutor
  const TranslatorModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalTranslatorVisible}
      onRequestClose={() => setModalTranslatorVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-4">Tradutor</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://translate.google.com')} // Link para abrir o Google Tradutor
            className="mt-4 bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Abrir Google Tradutor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalTranslatorVisible(false)}
            className="mt-4 bg-gray-300 p-2 rounded-lg"
          >
            <Text className="text-center">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Modal de Hospedagem e Transporte
  const TravelGuideModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalTravelGuideVisible}
      onRequestClose={() => setModalTravelGuideVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
      <View className="bg-white p-6 rounded-lg w-80">
        <Text className="text-lg font-bold mb-4">Hospedagem e Transporte</Text>
        <View className="flex-row justify-around mt-4">
          <TouchableOpacity className="items-center">
            <MaterialIcons name="flight" size={30} color="black" />
            <Text className="text-center mt-2">Voo</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <MaterialIcons name="hotel" size={30} color="black" />
            <Text className="text-center mt-2">Hospedagem</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <MaterialIcons name="directions-car" size={30} color="black" />
            <Text className="text-center mt-2">Turismo</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setModalTravelGuideVisible(false)}
          className="mt-4 bg-blue-500 p-2 rounded-lg"
        >
          <Text className="text-white text-center">Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Modal>
  );

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      {/* Título Informações */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-black text-center">Informações</Text>
        <View className="border-b border-gray-300 mt-4" />
      </View>

      {/* Top Section: User Info */}
      <View className="items-center mt-4 mb-6">
        <Text className="text-lg font-semibold text-black">{formData.nome}</Text>
        <Text className="text-sm text-gray-500">{formData.email}</Text>
      </View>

      {/* Sessão 1: Minha Conta */}
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-black mb-2">Minha Conta</Text>
        {/* Informações editáveis via modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)} className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="person" size={20} color="black" />
          <Text className="text-black ml-2">Editar Perfil</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Sessão 2: Serviços */}
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-black mb-2">Central de Atendimento</Text>
        <TouchableOpacity onPress={() => setModalContactVisible(true)} className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="phone" size={20} color="black" />
          <Text className="text-black ml-2">Contato com os Coordenadores</Text>
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
        <TouchableOpacity onPress={() => setModalTravelGuideVisible(true)} className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="hotel" size={20} color="black" />
          <Text className="text-black ml-2">Hospedagem e Transporte</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 flex-row items-center justify-between">
          <MaterialIcons name="book" size={20} color="black" />
          <Text className="text-black ml-2">Cartilha do Viajante</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Sessão 4: Sair */}
      <TouchableOpacity className="border border-red-500 bg-transparent p-4 rounded-lg items-center my-16">
        <Text className="text-red-500 font-bold">Sair da Conta</Text>
      </TouchableOpacity>

      <ContactModal />
      <ParticipantsModal />
      <TranslatorModal />
      <TravelGuideModal />
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      {/* Configuração da StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Definindo ícones para cada tela
            if (route.name === 'Início') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Linha do Tempo') {
              iconName = focused ? 'git-network' : 'git-network-outline';
            } else if (route.name === 'Informações') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            // Retorna o ícone correspondente
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#04378b',
          tabBarInactiveTintColor: '#6e99df',
          headerShown: false
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Linha do Tempo" component={PostCard} />
        <Tab.Screen name="Informações" component={InfoScreen} />
      </Tab.Navigator>
    </>
  );
}
