import React from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity } from 'react-native';

interface ParticipantsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-80">
          <Text className="text-lg font-bold mb-4">Participantes</Text>
          <FlatList
            data={[{ name: 'Ana Beatriz', cargo: 'Líder', contato: '111-222-333' }, { name: 'Carlos Oliveira', cargo: 'Desenvolvedor', contato: '444-555-666' }]} // Static list
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

export default ParticipantsModal;