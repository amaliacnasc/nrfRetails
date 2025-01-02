import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { updateParticipant } from '@/services/participantService';

interface EditProfileModalProps {
  visible: boolean;
  formData: {
    nome: string;
    email: string;
    empresa: string;
    position: string; 
    contact: string; 
  };
  onClose: () => void;
  handleInputChange: (field: keyof EditProfileModalProps['formData'], value: string) => void;
  participantId: number; // ID do participante para identificar na API
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  formData,
  onClose,
  handleInputChange,
  participantId,
}) => {
  const handleSave = async () => {
    if (!formData.nome || !formData.email || !formData.empresa) {
      Alert.alert("Erro", "Preencha os campos obrigatórios (Nome, Email, Empresa).");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert("Erro", "O email inserido é inválido.");
      return;
    }
  
    try {
      const updatedParticipant = {
        idParticipant: participantId,
        name: formData.nome,
        email: formData.email,
        position: formData.position || "Não informado",
        contact: formData.contact || "Não informado",
        companyName: formData.empresa,
        idArea: 1,
      };
  
      await updateParticipant(updatedParticipant);
  
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      onClose();
    } catch (error: any) {
      console.error("Erro ao atualizar o perfil:", error);
  
      if (error.response && error.response.status === 409) {
        Alert.alert(
          "Conflito de Dados",
          "O email informado já está em uso. Por favor, escolha outro."
        );
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível atualizar o perfil. Tente novamente mais tarde."
        );
      }
    }
  };
  
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
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
            value={formData.position}
            onChangeText={(text) => handleInputChange('position', text)}
          />

          <Text className="text-sm font-bold text-gray-700 mb-1">Contato</Text>
          <TextInput
            placeholder="Contato"
            className="border border-gray-300 p-2 mb-4 rounded"
            value={formData.contact}
            onChangeText={(text) => handleInputChange('contact', text)}
          />

          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-500 p-2 rounded-lg mt-4"
          >
            <Text className="text-white text-center">Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            className="mt-2"
          >
            <Text className="text-center text-blue-500">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
