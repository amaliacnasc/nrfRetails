import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FlightInfoCard from './FlightInfoCard';
import HotelInfoCard from './HotelInfoCard';
import TourismInfoCard from './TourismInfoCard';


interface TravelGuideModalProps {
  visible: boolean;
  onClose: () => void;
}

const TravelGuideModal: React.FC<TravelGuideModalProps> = ({ visible, onClose }) => {
  const [currentSubModal, setCurrentSubModal] = useState<'flight' | 'hotel' | 'tourism' | null>(null);

  const openSubModal = (modalType: 'flight' | 'hotel' | 'tourism') => {
    setCurrentSubModal(modalType);
  };

  const closeSubModal = () => {
    setCurrentSubModal(null);
  };

  const containerStyle = {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 16,
  };

  return (
    <>
      <Modal animationType="slide" transparent={false} visible={visible && !currentSubModal} onRequestClose={onClose}>
        <View style={containerStyle}>
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold mb-6 text-center">Hospedagem e Transporte</Text>
            <View className="flex-row justify-around w-full">
              <TouchableOpacity className="items-center" onPress={() => openSubModal('flight')}>
                <MaterialIcons name="flight" size={60} color="black" />
                <Text className="text-center mt-2 text-lg">Voo</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center" onPress={() => openSubModal('hotel')}>
                <MaterialIcons name="hotel" size={60} color="black" />
                <Text className="text-center mt-2 text-lg">Hospedagem</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center" onPress={() => openSubModal('tourism')}>
                <MaterialIcons name="directions-car" size={60} color="black" />
                <Text className="text-center mt-2 text-lg">Turismo</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="absolute bottom-5 left-0 right-0 px-0">
            <TouchableOpacity onPress={onClose} className="bg-blue-500 p-4 rounded-none w-full">
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={currentSubModal === 'flight'} onRequestClose={closeSubModal}>
        <View style={containerStyle}>
          <Text className="text-2xl font-bold mb-4 text-center mt-4">Informações sobre Voos</Text>
          <ScrollView className="flex-1 p-4">
            
              <FlightInfoCard />
          
          </ScrollView>
          <View className="absolute bottom-5 left-0 right-0 px-0">
            <TouchableOpacity onPress={closeSubModal} className="bg-blue-500 p-4 rounded-none w-full">
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={currentSubModal === 'hotel'} onRequestClose={closeSubModal}>
        <View style={containerStyle}>
          <Text className="text-2xl font-bold mb-4 text-center mt-4">Informações sobre Hospedagem</Text>
          <ScrollView className="flex-1 p-4">
           
              <HotelInfoCard />
            
          </ScrollView>
          <View className="absolute bottom-5 left-0 right-0 px-0">
            <TouchableOpacity onPress={closeSubModal} className="bg-blue-500 p-4 rounded-none w-full">
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={currentSubModal === 'tourism'} onRequestClose={closeSubModal}>
        <View style={containerStyle}>
          <Text className="text-2xl font-bold mb-4 text-center mt-4">Informações sobre Turismo</Text>
          <ScrollView className="flex-1 p-4">
            
              <TourismInfoCard />
            
          </ScrollView>
          <View className="absolute bottom-5 left-0 right-0 px-0">
            <TouchableOpacity onPress={closeSubModal} className="bg-blue-500 p-4 rounded-none w-full">
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TravelGuideModal;