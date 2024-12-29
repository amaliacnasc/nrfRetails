import React from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { contactInfoData } from '../../mocks/contactsMocks'; 

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
        <View className="bg-white w-11/12 h-5/7 p-6 rounded-lg shadow-lg">
          <Text className="text-xl font-bold mb-4 text-center">Contatos dos Coordenadores</Text>
          <FlatList
            data={contactInfoData} 
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between py-2 border-b border-gray-200">
                <Text className="text-black text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-500 text-lg">{item.phone}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-blue-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center text-lg">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;