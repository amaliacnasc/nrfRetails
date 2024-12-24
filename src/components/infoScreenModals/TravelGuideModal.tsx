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
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4">Hospedagem e Transporte</Text>
            <View className="flex-row justify-around mt-4">
              
              <TouchableOpacity
                className="items-center"
                onPress={() => setFlightModalVisible(true)}
              >
                <MaterialIcons name="flight" size={30} color="black" />
                <Text className="text-center mt-2">Voo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="items-center"
                onPress={() => setHotelModalVisible(true)}
              >
                <MaterialIcons name="hotel" size={30} color="black" />
                <Text className="text-center mt-2">Hospedagem</Text>
              </TouchableOpacity>
             
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
              {flightInfoData.map((flight, index) => (
                <FlightInfoCard
                  key={index}
                  date={flight.date}
                  description={flight.description}
                />
              ))}
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
            <TouchableOpacity
              onPress={() => setHotelModalVisible(false)}
              className="mt-4 bg-blue-500 p-2 rounded-lg"
            >
              <Text className="text-white text-center">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              {tourismInfoData.map((tourism, index) => (
                <TourismInfoCard
                  key={index}
                  title={tourism.title}
                  items={tourism.items}
                />
              ))}
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