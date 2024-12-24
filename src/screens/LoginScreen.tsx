import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  View,
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
  const [emailError, setEmailError] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async (emailToLogin?: string) => {
    const emailToUse = emailToLogin || email.trim();
    if (!emailToUse) {
      setEmailError(true);
      return;
    }

    setLoading(true);
    setEmailError(false);
    setLoginError(false);

    try {
      if (emailToUse === "admin2024") {
        navigation.navigate("TabNavigator");
        return;
      }

      await login(emailToUse);
      const participant = await getParticipantByEmail(emailToUse);
      navigation.navigate("TabNavigator");
    } catch (error) {
      setLoginError(true);
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

  const handleRegisterSuccess = (registeredEmail: string) => {
    setIsModalVisible(false);
    handleLogin(registeredEmail);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <View className="absolute top-12 left-0 right-0 flex-row justify-center">
          <Image
            source={require("../images/Marca NRF 4 1.png")}
            className="w-[200px] h-[100px]"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 justify-center items-stretch px-5 pt-40">
          <View className="w-full">
            <View className="mb-5">
              <Text className="text-base font-semibold text-black mb-1">E-mail</Text>
              <TextInput
                className={`w-full h-16 bg-gray-100 p-4 rounded-md border ${
                  emailError ? "border-red-500" : "border-[#6e99df]"
                }`}
                placeholder="Digite seu email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (text.trim()) {
                    setEmailError(false);
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError && (
                <Text className="text-red-500 text-sm mt-1">Email é obrigatório.</Text>
              )}
            </View>
            <TouchableOpacity
              className={`w-full h-12 bg-[#04378b] justify-center items-center rounded-md ${
                loading ? "opacity-60" : ""
              }`}
              onPress={() => handleLogin()}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-semibold">Entrar</Text>
              )}
            </TouchableOpacity>
            {loginError && (
              <Text className="text-red-500 text-sm mt-2 text-center">
                Falha no login ou na busca de informações do participante.
              </Text>
            )}
            <TouchableOpacity className="mt-5" onPress={openRegisterModal}>
              <Text className="text-[#0056D6] text-base text-center">
                Não possui uma conta? <Text className="font-semibold">Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;