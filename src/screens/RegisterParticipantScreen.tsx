import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Platform,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import { TextInputMask } from "react-native-masked-text";
import { AreaOfExpertiseDTO } from "../interfaces/areaOfExpertiseInterface";
import { CreateParticipant } from "../interfaces/participantInterface";
import { createParticipant } from "../services/participantService";
import { getAllAreas } from "@/services/areaService";

interface RegisterParticipantScreenProps {
  onClose: () => void;
  onRegisterSuccess: (email: string) => void;
}

const RegisterParticipantScreen: React.FC<RegisterParticipantScreenProps> = ({
  onClose,
  onRegisterSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [contact, setContact] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [areas, setAreas] = useState<AreaOfExpertiseDTO[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [areasLoading, setAreasLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchAreasOfExpertise();
  }, []);

  const fetchAreasOfExpertise = async () => {
    try {
      const data = await getAllAreas();
      setAreas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAreasLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPosition("");
    setContact("");
    setCompanyName("");
    setSelectedAreas([]);
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!position.trim()) newErrors.position = true;
    if (!contact.trim()) newErrors.contact = true;
    if (selectedAreas.length === 0) newErrors.selectedAreas = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const sanitizedContact = contact.replace(/[^0-9]/g, "");

    const participantData: CreateParticipant = {
      name,
      email,
      position,
      contact: sanitizedContact,
      companyName: companyName || undefined,
      idArea: selectedAreas,
      postPermission: 0,
    };

    setLoading(true);
    try {
      await createParticipant(participantData);
      handleClose();
      onRegisterSuccess(email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (areasLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <ActivityIndicator size="large" color="#0056D6" />
        <Text style={{ marginTop: 8, fontSize: 16, color: "#555555" }}>
          Carregando áreas de especialização...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <View
          style={{
            backgroundColor: "#f0f0f0",
            padding: 16,
            marginTop: Platform.OS === "ios" ? 60 : 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#04378b",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Cadastro de Participante
          </Text>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.name ? "red" : "#6e99df",
                fontSize: 16,
                color: "#000",
              }}
              placeholder="Nome*"
              placeholderTextColor="#a3a3a3"
              value={name}
              onChangeText={setName}
            />
            {errors.name && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                Nome é obrigatório.
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.email ? "red" : "#6e99df",
                fontSize: 16,
                color: "#000",
              }}
              placeholder="Email*"
              placeholderTextColor="#a3a3a3"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                Email é obrigatório.
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.position ? "red" : "#6e99df",
                fontSize: 16,
                color: "#000",
              }}
              placeholder="Cargo*"
              placeholderTextColor="#a3a3a3"
              value={position}
              onChangeText={setPosition}
            />
            {errors.position && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                Cargo é obrigatório.
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextInputMask
              type="custom"
              options={{ mask: "(99) 9 9999-9999" }}
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.contact ? "red" : "#6e99df",
                fontSize: 16,
                color: "#000",
              }}
              placeholder="Contato*"
              placeholderTextColor="#a3a3a3"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
            {errors.contact && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                Contato é obrigatório.
              </Text>
            )}
          </View>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#6e99df",
                fontSize: 16,
                color: "#000",
              }}
              placeholder="Nome da Empresa (Opcional)"
              placeholderTextColor="#a3a3a3"
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#04378b",
                marginBottom: 8,
              }}
            >
              Áreas de Especialização*
            </Text>
            <MultiSelect
              items={areas.map((area) => ({
                id: area.idArea.toString(),
                name: area.name,
              }))}
              uniqueKey="id"
              onSelectedItemsChange={(selected) =>
                setSelectedAreas(selected.map(Number))
              }
              selectedItems={selectedAreas.map(String)}
              searchInputPlaceholderText="Digite para pesquisar" // Corrigido
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
              styleInputGroup={{
                borderWidth: 1,
                borderColor: "#6e99df",
                borderRadius: 5,
                paddingHorizontal: 15,
                paddingVertical: 12,
                backgroundColor: "#fff",
              }}
              styleTextDropdown={{
                color: "#a3a3a3",
                fontSize: 16,
                marginLeft: 15,
              }}
              styleTextDropdownSelected={{
                color: "#000",
                fontSize: 16,
                marginLeft: 15,
              }}
            />
            {errors.selectedAreas && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                Selecione pelo menos uma área.
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#0056D6",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              width: "100%",
              marginBottom: 16,
            }}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Cadastrar
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose}>
            <Text
              style={{
                color: "#0056D6",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default RegisterParticipantScreen;
