import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import { AreaOfExpertiseDTO } from '../interfaces/areaOfExpertiseInterface';
import { CreateParticipant } from '../interfaces/participantInterface';
import { createParticipant } from '../services/participantService';
import { getAllAreas } from '@/services/areaService';
import AreasModal from '@/components/registerscreen/AreasModal';

interface RegisterParticipantScreenProps {
  onClose: () => void;
  onRegisterSuccess: (email: string) => void;
}

const RegisterParticipantScreen: React.FC<RegisterParticipantScreenProps> = ({
  onClose,
  onRegisterSuccess,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [areas, setAreas] = useState<AreaOfExpertiseDTO[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [areasLoading, setAreasLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!position.trim()) newErrors.position = true;
    if (!contact.trim()) newErrors.contact = true;
    if (selectedAreas.length === 0) newErrors.selectedAreas = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const participantData: CreateParticipant = {
      name,
      email,
      position,
      contact,
      companyName: companyName || undefined,
      idArea: selectedAreas,
      postPermission: 0,
    };

    setLoading(true);

    try {
      await createParticipant(participantData);
      setName('');
      setEmail('');
      setPosition('');
      setContact('');
      setCompanyName('');
      setSelectedAreas([]);
      onRegisterSuccess(email);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (areasLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f0f0f0]">
        <ActivityIndicator size="large" color="#0056D6" />
        <Text className="mt-2.5 text-base text-[#555555]">Carregando áreas de especialização...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#f0f0f0] p-5">
      <Text className="text-2xl font-bold text-[#04378b] text-center mb-8">Cadastro de Participante</Text>
      <View className="mb-5">
        <TextInput
          className={`bg-white p-4 rounded-md text-base border ${
            errors.name ? 'border-red-500' : 'border-[#6e99df]'
          }`}
          placeholder="Nome*"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text className="text-red-500 text-sm mt-1">Nome é obrigatório.</Text>}
      </View>
      <View className="mb-5">
        <TextInput
          className={`bg-white p-4 rounded-md text-base border ${
            errors.email ? 'border-red-500' : 'border-[#6e99df]'
          }`}
          placeholder="Email*"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text className="text-red-500 text-sm mt-1">Email é obrigatório.</Text>}
      </View>
      <View className="mb-5">
        <TextInput
          className={`bg-white p-4 rounded-md text-base border ${
            errors.position ? 'border-red-500' : 'border-[#6e99df]'
          }`}
          placeholder="Cargo*"
          value={position}
          onChangeText={setPosition}
        />
        {errors.position && <Text className="text-red-500 text-sm mt-1">Cargo é obrigatório.</Text>}
      </View>
      <View className="mb-5">
        <TextInput
          className={`bg-white p-4 rounded-md text-base border ${
            errors.contact ? 'border-red-500' : 'border-[#6e99df]'
          }`}
          placeholder="Contato*"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />
        {errors.contact && <Text className="text-red-500 text-sm mt-1">Contato é obrigatório.</Text>}
      </View>
      <View className="mb-5">
        <TextInput
          className="bg-white p-4 rounded-md text-base border border-[#6e99df]"
          placeholder="Nome da Empresa (Opcional)"
          value={companyName}
          onChangeText={setCompanyName}
        />
      </View>
      <TouchableOpacity
        className="bg-[#0056D6] p-4 rounded-md items-center my-5"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-lg font-semibold">Selecionar Áreas de Especialização</Text>
      </TouchableOpacity>
      {errors.selectedAreas && (
        <Text className="text-red-500 text-sm mb-2">Selecione pelo menos uma área.</Text>
      )}
      <TouchableOpacity
        className={`bg-[#0056D6] p-4 rounded-md items-center mt-8 ${loading ? 'opacity-60' : ''}`}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white text-lg font-semibold">Cadastrar</Text>
        )}
      </TouchableOpacity>
      <AreasModal
        visible={modalVisible}
        areas={areas}
        selectedAreas={selectedAreas}
        onClose={() => setModalVisible(false)}
        onSave={(selected) => setSelectedAreas(selected)}
      />
    </ScrollView>
  );
};

export default RegisterParticipantScreen;