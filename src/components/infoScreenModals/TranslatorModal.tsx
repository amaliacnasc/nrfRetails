import React from 'react';
import { Modal, View, Text, TouchableOpacity, Linking } from 'react-native';

interface TranslatorModalProps {
  visible: boolean;
  onClose: () => void;
}

const TranslatorModal: React.FC<TranslatorModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-4">Tradutor</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://translate.google.com')} 
            className="mt-4 bg-blue-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Abrir Google Tradutor</Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={onClose}
            className="mt-4 bg-gray-300 p-2 rounded-lg"
          >
            <Text className="text-center">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TranslatorModal;