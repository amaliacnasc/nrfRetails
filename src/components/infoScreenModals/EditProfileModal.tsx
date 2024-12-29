import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

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
  onSave: () => void;
  handleInputChange: (field: keyof EditProfileModalProps['formData'], value: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  formData,
  onClose,
  onSave,
  handleInputChange,
}) => (
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
          onPress={onSave}
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

export default EditProfileModal;