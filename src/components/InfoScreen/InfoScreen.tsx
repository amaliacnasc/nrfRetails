import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const InfoScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
            <Text className="text-sm font-bold text-gray-700 mb-1">Nome</Text>
            <TextInput
              placeholder="Nome"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.nome}
              onChangeText={(text) => handleInputChange('nome', text)}
            />

            <Text className="text-sm font-bold text-gray-700 mb-1">E-mail</Text>
            <TextInput
              placeholder="E-mail"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />

            <Text className="text-sm font-bold text-gray-700 mb-1">Empresa</Text>
            <TextInput
              placeholder="Empresa"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.empresa}
              onChangeText={(text) => handleInputChange('empresa', text)}
            />

            <Text className="text-sm font-bold text-gray-700 mb-1">Cargo</Text>
            <TextInput
              placeholder="Cargo"
              className="border border-gray-300 p-2 mb-4 rounded"
              value={formData.cargo}
              onChangeText={(text) => handleInputChange('cargo', text)}
            />

            <Text className="text-sm font-bold text-gray-700 mb-1">Contato</Text>
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

export default InfoScreen;
