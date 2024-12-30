import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AreaOfExpertiseDTO } from '@/interfaces/areaOfExpertiseInterface';

interface AreasModalProps {
  visible: boolean;
  areas: AreaOfExpertiseDTO[];
  selectedAreas: number[];
  onClose: () => void;
  onSave: (selectedAreas: number[]) => void;
}

const AreasModal: React.FC<AreasModalProps> = ({
  visible,
  areas,
  selectedAreas,
  onClose,
  onSave,
}) => {
  const [localSelectedAreas, setLocalSelectedAreas] = useState<number[]>(selectedAreas);

  const toggleAreaSelection = (idArea: number) => {
    if (localSelectedAreas.includes(idArea)) {
      setLocalSelectedAreas(localSelectedAreas.filter((id) => id !== idArea));
    } else {
      setLocalSelectedAreas([...localSelectedAreas, idArea]);
    }
  };

  const handleSave = () => {
    onSave(localSelectedAreas);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-[90%] max-h-[80%] rounded-lg p-5">
          <Text className="text-xl font-bold text-[#04378b] mb-5 text-center">
            Selecionar Áreas de Especialização
          </Text>
          <ScrollView className="mb-5">
            {areas.map((area) => (
              <TouchableOpacity
                key={area.idArea}
                className="flex-row items-center mb-4"
                onPress={() => toggleAreaSelection(area.idArea)}
              >
                <MaterialIcons
                  name={
                    localSelectedAreas.includes(area.idArea)
                      ? 'check-box'
                      : 'check-box-outline-blank'
                  }
                  size={24}
                  color="#0056D6"
                />
                <Text className="ml-2 text-base text-[#333333]">{area.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-gray-300 p-3 rounded-lg flex-1 mr-2"
              onPress={onClose}
            >
              <Text className="text-center text-gray-700 font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#0056D6] p-3 rounded-lg flex-1 ml-2"
              onPress={handleSave}
            >
              <Text className="text-center text-white font-semibold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AreasModal;