import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { login } from "@/services/authService";
import { getParticipantByEmail } from "@/services/participantService";
import { RootStackParamList } from "@/types/types";
import RegisterParticipantScreen from "@/screens/RegisterParticipantScreen";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      await login(email);
      const participant = await getParticipantByEmail(email);
      navigation.navigate("TabNavigator");
    } catch (error) {
      Alert.alert("Erro", "Falha no login ou na busca de informações do participante.");
    } finally {
      setLoading(false);
    }
  };

  const openRegisterModal = () => {
    setIsModalVisible(true);
  };

  const closeRegisterModal = () => {
    setIsModalVisible(false);
  };

  const handleRegisterSuccess = () => {
    setIsModalVisible(false);
    navigation.navigate("TabNavigator");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Text className="text-2xl font-bold text-customDarkBlue mb-5">Login</Text>
      <TextInput
        className="w-full h-12 border border-blue-400 rounded-md px-3 mb-5 text-base"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title={loading ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
      />
      <TouchableOpacity className="mt-5" onPress={openRegisterModal}>
        <Text className="text-customBlue text-base">Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeRegisterModal}
      >
        <RegisterParticipantScreen
          onClose={closeRegisterModal}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </Modal>
    </View>
  );
};

export default LoginScreen;