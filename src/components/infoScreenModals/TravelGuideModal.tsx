import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface TravelGuideModalProps {
  visible: boolean;
  onClose: () => void;
}

const TravelGuideModal: React.FC<TravelGuideModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      
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

export default TravelGuideModal;