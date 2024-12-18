import React, { useState } from 'react';
import { Text, View, StatusBar, TouchableOpacity, ScrollView, Image, Modal, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import "../global.css";
import HomeScreen from './home';

function TimelineScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-black">Linha do Tempo</Text>
    </View>
  );
}

function InfoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    nome: 'Nome do Usuário',
    email: 'email@exemplo.com',
    empresa: '',
    cargo: '',
    contato: ''
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    // Aqui você pode lidar com o envio de dados
    console.log('Dados do Perfil:', formData);
    setModalVisible(false); // Fecha o modal após salvar
  };

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
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="phone" size={20} color="black" />
          <Text className="text-black ml-2">Contato com os Coordenadores</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="group" size={20} color="black" />
          <Text className="text-black ml-2">Participantes</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="map" size={20} color="black" />
          <Text className="text-black ml-2">Tradutor</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
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

      {/* Modal de Editar Perfil */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4">Editar Perfil</Text>

            {/* Campos do Formulário */}
            <TextInput
              placeholder="Nome"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.nome}
              onChangeText={(text) => handleInputChange('nome', text)}
            />
            <TextInput
              placeholder="Email"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
            <TextInput
              placeholder="Empresa"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.empresa}
              onChangeText={(text) => handleInputChange('empresa', text)}
            />
            <TextInput
              placeholder="Cargo"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.cargo}
              onChangeText={(text) => handleInputChange('cargo', text)}
            />
            <TextInput
              placeholder="Contato"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.contato}
              onChangeText={(text) => handleInputChange('contato', text)}
            />

            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 p-2 rounded-lg mt-4"
            >
              <Text className="text-white text-center">Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-2"
            >
              <Text className="text-center text-blue-500">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}



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
        <Tab.Screen name="Linha do Tempo" component={TimelineScreen} />
        <Tab.Screen name="Informações" component={InfoScreen} />
      </Tab.Navigator>
    </>
  );
}
