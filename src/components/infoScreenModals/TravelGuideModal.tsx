import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface TravelGuideModalProps {
  visible: boolean;
  onClose: () => void;
}

const TravelGuideModal: React.FC<TravelGuideModalProps> = ({ visible, onClose }) => {
  const [flightModalVisible, setFlightModalVisible] = useState(false);
  const [hotelModalVisible, setHotelModalVisible] = useState(false);
  const [tourismModalVisible, setTourismModalVisible] = useState(false);

  return (
    <>
      {/* Modal Principal */}
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
              {/* Botão para abrir o submodal de Voo */}
              <TouchableOpacity
                className="items-center"
                onPress={() => setFlightModalVisible(true)}
              >
                <MaterialIcons name="flight" size={30} color="black" />
                <Text className="text-center mt-2">Voo</Text>
              </TouchableOpacity>
              {/* Botão para abrir o submodal de Hospedagem */}
              <TouchableOpacity
                className="items-center"
                onPress={() => setHotelModalVisible(true)}
              >
                <MaterialIcons name="hotel" size={30} color="black" />
                <Text className="text-center mt-2">Hospedagem</Text>
              </TouchableOpacity>
              {/* Botão para abrir o submodal de Turismo */}
              <TouchableOpacity
                className="items-center"
                onPress={() => setTourismModalVisible(true)}
              >
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

      {/* Submodal de Voo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={flightModalVisible}
        onRequestClose={() => setFlightModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4">Informações sobre Voos</Text>
            <ScrollView>
              <Text className="text-gray-700 mb-4">Aqui estão as informações sobre voos.</Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => setFlightModalVisible(false)}
              className="mt-4 bg-blue-500 p-2 rounded-lg"
            >
              <Text className="text-white text-center">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Submodal de Hospedagem */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={hotelModalVisible}
        onRequestClose={() => setHotelModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4">Informações sobre Hospedagem</Text>
            <ScrollView>
              <Text className="text-gray-700 mb-4">Aqui estão as informações sobre hospedagem.</Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => setHotelModalVisible(false)}
              className="mt-4 bg-blue-500 p-2 rounded-lg"
            >
              <Text className="text-white text-center">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Submodal de Turismo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={tourismModalVisible}
        onRequestClose={() => setTourismModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4">Informações sobre Turismo</Text>
            <ScrollView>
              <Text className="text-gray-700 mb-4">Aqui estão as informações sobre turismo.</Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => setTourismModalVisible(false)}
              className="mt-4 bg-blue-500 p-2 rounded-lg"
            >
              <Text className="text-white text-center">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TravelGuideModal;