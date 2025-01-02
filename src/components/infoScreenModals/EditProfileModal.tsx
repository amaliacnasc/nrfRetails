import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateParticipant } from "@/services/participantService";
import useFormatPhone from "@/hooks/useFormatPhone";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose }) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { formatPhone } = useFormatPhone();

  useEffect(() => {
    const loadUserData = async () => {
      if (visible) {
        try {
          const storedUserData = await AsyncStorage.getItem("participant");
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setFormData(userData);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
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
    const { postPermission, ...updatedData } = formData;
    await updateParticipant(updatedData);
    await AsyncStorage.setItem("participant", JSON.stringify(updatedData));
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
      <View className={`flex-1 bg-white ${Platform.OS === "ios" ? "pt-16" : "pt-6"}`}>
        <View className="p-4 border-b border-gray-300">
          <Text className="text-xl font-bold text-black">Editar Perfil</Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg">Carregando...</Text>
          </View>
        ) : (
          <ScrollView className="p-4">
            {Object.entries(formData).map(([key, value]) => (
              key !== "idParticipant" && key !== "postPermission" && key !== "email" && (
                typeof value === "string" || typeof value === "number" ? (
                  <View key={key} className="mb-4">
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
                ) : null
              )
            ))}

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">E-mail</Text>
              <TextInput
                className="border border-gray-300 p-2 rounded bg-gray-100 text-gray-500"
                value={formData.email || ""}
                editable={false}
              />
            </View>
          </ScrollView>
        )}

        <TouchableOpacity onPress={handleSave} className="bg-blue-500 w-full mb-5 p-4">
          <Text className="text-white text-center text-lg font-bold">Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} className="bg-gray-300 w-full mb-5 p-4">
          <Text className="text-gray-700 text-center text-lg font-bold">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfileModal;