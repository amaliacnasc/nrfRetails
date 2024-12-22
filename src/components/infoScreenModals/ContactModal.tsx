import React from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity } from 'react-native';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
       <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-4">Contato com Coordenadores</Text>
          <FlatList
            data={[{ name: 'João Silva', phone: '123-456-789' }, { name: 'Maria Souza', phone: '987-654-321' }]} // Static list
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-200">
                <Text className="text-black">{item.name}</Text>
                <Text className="text-gray-500">{item.phone}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;