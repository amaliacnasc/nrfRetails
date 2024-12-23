import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RegisterScreenNavigationProp = StackNavigationProp<any, "Register">;

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const sectorOptions = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleRegister = async () => {
    Keyboard.dismiss();

    if (!name || !email || !company) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Falha no registro. Tente novamente.");
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const selectSector = (option: string) => {
    setSector(option);
    closeModal();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        {/* Campo Nome */}
        <Text style={styles.label}>
          Nome <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        {/* Campo E-mail */}
        <Text style={styles.label}>
          E-mail <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo Empresa */}
        <Text style={styles.label}>
          Empresa <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da empresa"
          placeholderTextColor="#aaa"
          value={company}
          onChangeText={setCompany}
        />

        {/* Campo Setor/Segmento */}
        <Text style={styles.label}>
          Setor / Segmento <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity style={styles.dropdown} onPress={openModal}>
          <Text style={[styles.dropdownText, !sector && { color: "#aaa" }]}>
            {sector || "Selecione um segmento"} {/* Placeholder padrão */}
          </Text>
        </TouchableOpacity>


        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={sectorOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    underlayColor="#ddd"
                    onPress={() => selectSector(item)}
                  >
                    <Text style={styles.modalOption}>{item}</Text>
                  </TouchableHighlight>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Botão Cadastrar */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Link para Login */}
        <Text style={styles.loginText}>
          Já possui uma conta?{" "}
          <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
            Faça login
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#04378b",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 5,
  },
  required: {
    color: "red",
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
  dropdown: {
    width: "100%",
    height: 50,
    borderColor: "#6e99df",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalOption: {
    padding: 15,
    fontSize: 16,
    color: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#04378b",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#04378b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center", // Centraliza o botão
},
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    marginTop: 20,
  },
  loginLink: {
    color: "#04378b",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
