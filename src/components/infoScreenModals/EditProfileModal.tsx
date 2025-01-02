import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateParticipant } from "@/services/participantService";
import useFormatPhone from "@/hooks/useFormatPhone";
import MultiSelect from "react-native-multiple-select";
import { getAllAreas } from "@/services/areaService";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose }) => {
  const [formData, setFormData] = useState<any>({});
  const [areas, setAreas] = useState<any[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [areasLoading, setAreasLoading] = useState(true);
  const { formatPhone } = useFormatPhone();

  useEffect(() => {
    const loadUserData = async () => {
      if (visible) {
        try {
          const storedUserData = await AsyncStorage.getItem("participant");
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setFormData(userData);
            const areaIds = userData.AreaOfExpertise?.map((area: any) => area.idArea) || [];
            setSelectedAreas(areaIds);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    const loadAreas = async () => {
      try {
        const areasData = await getAllAreas();
        setAreas(areasData);
      } finally {
        setAreasLoading(false);
      }
    };

    loadUserData();
    loadAreas();
  }, [visible]);

  const handleInputChange = (field: string, value: string) => {
    if (field === "contact") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 11) return;
      setFormData((prev: any) => ({
        ...prev,
        [field]: cleaned,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    const { postPermission, AreaOfExpertise, ...updatedData } = formData;
    updatedData.idArea = selectedAreas; // Adiciona o idArea no payload
  
    await updateParticipant(updatedData);
  
    // Atualiza o AsyncStorage com os dados atualizados e as áreas de especialização
    await AsyncStorage.setItem(
      "participant",
      JSON.stringify({
        ...updatedData,
        AreaOfExpertise: selectedAreas.map((id) =>
          areas.find((area) => area.idArea === id)
        ),
      })
    );
  
    onClose();
  };

  if (loading || areasLoading) {
    return (
      <Modal animationType="slide" transparent={false} visible={visible}>
        <View className="flex-1 justify-center items-center bg-gray-100">
          <ActivityIndicator size="large" color="#0056D6" />
          <Text className="text-gray-700 mt-4">Carregando...</Text>
        </View>
      </Modal>
    );
  }

  const renderField = ({ item }: { item: [string, any] }) => {
    const [key, value] = item;

    if (key === "idParticipant" || key === "postPermission" || key === "email" || key === "AreaOfExpertise" || key === "idArea") {
      return null;
    }

    return (
      <View key={key} className="mb-4 mx-2">
        <Text className="text-sm font-bold text-gray-700 mb-1">
          {key === "name" ? "Nome" :
            key === "position" ? "Cargo" :
            key === "contact" ? "Contato" :
            key === "companyName" ? "Empresa" :
            key}
        </Text>
        <TextInput
          placeholder={`Digite ${
            key === "name" ? "o Nome" :
            key === "position" ? "o Cargo" :
            key === "contact" ? "o Contato" :
            key === "companyName" ? "a Empresa" :
            key}`}
          className="border border-gray-300 p-2 rounded"
          keyboardType={key === "contact" ? "phone-pad" : "default"}
          value={key === "contact" ? formatPhone(value.toString()) : value.toString()}
          onChangeText={(text) => handleInputChange(key, text)}
        />
      </View>
    );
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
      <View className={`flex-1 p-1 bg-white ${Platform.OS === "ios" ? "pt-16" : "pt-6"}`}>
        <View className="p-4 border-b border-gray-300">
          <Text className="text-xl font-bold text-black">Editar Perfil</Text>
        </View>
        <FlatList
          data={Object.entries(formData)}
          renderItem={renderField}
          keyExtractor={(item) => item[0]}
          ListFooterComponent={
            <>
              <View className="mb-4">
                <Text className="text-sm font-bold text-gray-700 mb-1">Áreas de Especialização</Text>
                <MultiSelect
                  items={areas.map((area: any) => ({
                    id: area.idArea.toString(),
                    name: area.name,
                  }))}
                  uniqueKey="id"
                  onSelectedItemsChange={(selected) => setSelectedAreas(selected.map(Number))}
                  selectedItems={selectedAreas.map(String)}
                  searchInputPlaceholderText="Digite para pesquisar"
                  tagRemoveIconColor="#0056D6"
                  tagBorderColor="#0056D6"
                  tagTextColor="#0056D6"
                  selectedItemTextColor="#0056D6"
                  selectedItemIconColor="#0056D6"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: "#0056D6" }}
                  submitButtonColor="#0056D6"
                  submitButtonText="Confirmar"
                  selectText="Selecione as Áreas"
                  noItemsText="Nenhuma área encontrada"
                  selectedText="selecionado(s)"
                  styleDropdownMenuSubsection={{
                    borderWidth: 1,
                    borderColor: "#6e99df",
                    borderRadius: 5,
                    paddingVertical: 12,
                    paddingHorizontal: 15,
                    backgroundColor: "#fff",
                  }}
                />
              </View>
              <View className="mb-4">
                <Text className="text-sm font-bold text-gray-700 mb-1">E-mail</Text>
                <TextInput
                  className="border border-gray-300 p-2 rounded bg-gray-100 text-gray-500"
                  value={formData.email || ""}
                  editable={false}
                />
              </View>
            </>
          }
        />
        <TouchableOpacity onPress={handleSave} className="bg-blue-500 w-full mb-5 p-4">
          <Text className="text-white text-center text-lg font-bold">Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} className="w-full mb-5 p-4">
          <Text className="text-blue-500 text-center text-lg font-bold">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfileModal;