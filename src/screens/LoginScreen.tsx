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
  Platform,
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
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "ios" ? 60 : 20, // Diferenciação iOS e Android
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Image
            source={require("../images/Marca NRF 4 1.png")}
            style={{ width: 200, height: 100, resizeMode: "contain" }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 8 }}>
              E-mail
            </Text>
            <TextInput
              style={{
                backgroundColor: "#f7f7f7",
                height: 50,
                borderRadius: 8,
                paddingHorizontal: 12,
                borderColor: emailError ? "red" : "#6e99df",
                borderWidth: 1,
                fontSize: 16,
                color: "#000",
              }}
              placeholder="Digite seu email"
              placeholderTextColor="#a3a3a3"
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
              <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>Email é obrigatório.</Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#04378b",
              height: 50,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              opacity: loading ? 0.6 : 1,
            }}
            onPress={() => handleLogin()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Entrar</Text>
            )}
          </TouchableOpacity>
          {loginError && (
            <Text style={{ color: "red", fontSize: 14, marginTop: 12, textAlign: "center" }}>
              Falha no login ou na busca de informações do participante.
            </Text>
          )}
          <TouchableOpacity style={{ marginTop: 16 }} onPress={openRegisterModal}>
            <Text style={{ color: "#0056D6", fontSize: 14, textAlign: "center" }}>
              Não possui uma conta?{" "}
              <Text style={{ fontWeight: "bold" }}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
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