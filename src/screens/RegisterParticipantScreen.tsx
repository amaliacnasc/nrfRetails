import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AreaOfExpertiseDTO } from '../interfaces/areaOfExpertiseInterface';
import { CreateParticipant } from '../interfaces/participantInterface';
import { createParticipant } from '../services/participantService';
import { getAllAreas } from '@/services/areaService';

interface RegisterParticipantScreenProps {
  onClose: () => void;
  onRegisterSuccess: () => void;
}

const RegisterParticipantScreen: React.FC<RegisterParticipantScreenProps> = ({ onClose, onRegisterSuccess }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [areas, setAreas] = useState<AreaOfExpertiseDTO[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [areasLoading, setAreasLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAreasOfExpertise();
  }, []);

  const fetchAreasOfExpertise = async () => {
    try {
      const data = await getAllAreas();
      setAreas(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as áreas de especialização.');
    } finally {
      setAreasLoading(false);
    }
  };

  const toggleAreaSelection = (idArea: number) => {
    if (selectedAreas.includes(idArea)) {
      setSelectedAreas(selectedAreas.filter((id) => id !== idArea));
    } else {
      setSelectedAreas([...selectedAreas, idArea]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !position || !contact || selectedAreas.length === 0) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const participantData: CreateParticipant = {
      name,
      email,
      position,
      contact,
      companyName: companyName ? companyName : undefined,
      idArea: selectedAreas,
      postPermission: 0,
    };

    setLoading(true);

    try {
      await createParticipant(participantData);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      setName('');
      setEmail('');
      setPosition('');
      setContact('');
      setCompanyName('');
      setSelectedAreas([]);
      onRegisterSuccess(); // Chama a função de sucesso para navegar
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message || 'Falha no cadastro.');
    } finally {
      setLoading(false);
    }
  };

  if (areasLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-customGray">
        <ActivityIndicator size="large" color="#0056D6" />
        <Text className="mt-2.5 text-base text-gray-600">Carregando áreas de especialização...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-customGray p-5">
      <Text className="text-2xl font-bold text-customDarkBlue text-center mb-8">
        Cadastro de Participante
      </Text>

      <TextInput
        className="bg-white p-4 rounded-md text-base mb-5 border border-blue-400"
        placeholder="Nome*"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        className="bg-white p-4 rounded-md text-base mb-5 border border-blue-400"
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className="bg-white p-4 rounded-md text-base mb-5 border border-blue-400"
        placeholder="Posição*"
        value={position}
        onChangeText={setPosition}
      />

      <TextInput
        className="bg-white p-4 rounded-md text-base mb-5 border border-blue-400"
        placeholder="Contato*"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

      <TextInput
        className="bg-white p-4 rounded-md text-base mb-5 border border-blue-400"
        placeholder="Nome da Empresa (Opcional)"
        value={companyName}
        onChangeText={setCompanyName}
      />

      <Text className="text-xl font-semibold text-customDarkBlue mb-3">
        Áreas de Especialização*
      </Text>
      {areas.map((area) => (
        <TouchableOpacity
          key={area.idArea}
          className="flex-row items-center mb-4"
          onPress={() => toggleAreaSelection(area.idArea)}
        >
          <MaterialIcons
            name={selectedAreas.includes(area.idArea) ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color="#0056D6"
          />
          <Text className="ml-2 text-base text-gray-700">{area.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className={`bg-customBlue p-4 rounded-md items-center mt-8 ${loading ? 'opacity-60' : ''}`}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white text-lg font-semibold">Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="mt-5 items-center" onPress={onClose}>
        <Text className="text-customBlue text-base">Fechar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterParticipantScreen;