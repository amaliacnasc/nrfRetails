import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { login } from "@/services/authService";
import { getParticipantByEmail } from "@/services/participantService";
import { RootStackParamList } from "@/types/types";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    Keyboard.dismiss(); // Fecha o teclado ao clicar no botão
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      if (email === "admin2024") {
        // Login de teste bem-sucedido
        Alert.alert("Sucesso", "Login de teste realizado com sucesso!");
        navigation.navigate("TabNavigator");
        return;
      }

      await login(email);
      const participant = await getParticipantByEmail(email);
      navigation.navigate("TabNavigator");
    } catch (error) {
      Alert.alert("Erro", "Falha no login ou na busca de informações do participante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Logotipo */}
        <View style={styles.logoContainer}>
          <Image source={require("../images/Marca NRF 4 1.png")} style={styles.logo} resizeMode="contain" />
        </View>
        {/* Campos de formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Carregando..." : "Entrar"}</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Não possui uma conta?{" "}
            <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
              Cadastre-se
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    position: "absolute",
    top: 50, // Ajusta a posição da logo mais para cima
    alignSelf: "center",
  },
  logo: {
    width: 500,
    height: 100,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 100, // Espaçamento entre o logo e os campos
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#6e99df",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#04378b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 14,
    color: "#000000",
  },
  registerLink: {
    color: "#04378b",
    fontWeight: "bold",
  },
});

export default LoginScreen;
