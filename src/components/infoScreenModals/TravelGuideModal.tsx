import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FlightInfoCard from './FlightInfoCard';
import HotelInfoCard from './HotelInfoCard';
import TourismInfoCard from './TourismInfoCard';
import {
  flightInfoData,
  hotelInfoData,
  tourismInfoData,
} from '../../mocks/travelGuideMocks'; 

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
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 bg-white">
          {/* Centralizar os Ícones */}
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold mb-6 text-center">Hospedagem e Transporte</Text>
            <View className="flex-row justify-around w-full">
              <TouchableOpacity
                className="items-center"
                onPress={() => setFlightModalVisible(true)}
              >
                <MaterialIcons name="flight" size={60} color="black" />
                <Text className="text-center mt-2 text-lg">Voo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center"
                onPress={() => setHotelModalVisible(true)}
              >
                <MaterialIcons name="hotel" size={60} color="black" />
                <Text className="text-center mt-2 text-lg">Hospedagem</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center"
                onPress={() => setTourismModalVisible(true)}
              >
                <MaterialIcons name="directions-car" size={60} color="black" />
                <Text className="text-center mt-2 text-lg">Turismo</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão de Fechar na Parte Inferior */}
          <View className="absolute bottom-4 w-full px-4">
            <TouchableOpacity
              onPress={onClose}
              className="bg-blue-500 p-4 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Submodais (mantidos como estão) */}
      {/* Submodal de Voo */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={flightModalVisible}
        onRequestClose={() => setFlightModalVisible(false)}
      >
        <View className="flex-1 bg-white">
          <Text className="text-2xl font-bold mb-4 text-center mt-4">Informações sobre Voos</Text>
          <ScrollView className="flex-1 p-4">
            {flightInfoData.map((flight, index) => (
              <FlightInfoCard
                key={index}
                date={flight.date}
                description={flight.description}
              />
            ))}
          </ScrollView>
          <View className="absolute bottom-4 w-full px-4">
            <TouchableOpacity
              onPress={() => setFlightModalVisible(false)}
              className="bg-blue-500 p-4 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Submodal de Hospedagem */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={hotelModalVisible}
        onRequestClose={() => setHotelModalVisible(false)}
      >
        <View className="flex-1 bg-white">
          <Text className="text-2xl font-bold mb-4 text-center mt-4">Informações sobre Hospedagem</Text>
          <ScrollView className="flex-1 p-4">
            {hotelInfoData.map((hotel, index) => (
              <HotelInfoCard
                key={index}
                hotelName={hotel.hotelName}
                address={hotel.address}
                checkIn={hotel.checkIn}
                checkOut={hotel.checkOut}
                services={hotel.services}
              />
            ))}
          </ScrollView>
          <View className="absolute bottom-4 w-full px-4">
            <TouchableOpacity
              onPress={() => setHotelModalVisible(false)}
              className="bg-blue-500 p-4 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Submodal de Turismo */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={tourismModalVisible}
        onRequestClose={() => setTourismModalVisible(false)}
      >
        <View className="flex-1 bg-white">
          <Text className="text-2xl font-bold mb-4 text-center mt-4">Informações sobre Turismo</Text>
          <ScrollView className="flex-1 p-4">
            {tourismInfoData.map((tourism, index) => (
              <TourismInfoCard
                key={index}
                title={tourism.title}
                items={tourism.items}
              />
            ))}
          </ScrollView>
          <View className="absolute bottom-4 w-full px-4">
            <TouchableOpacity
              onPress={() => setTourismModalVisible(false)}
              className="bg-blue-500 p-4 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TravelGuideModal;