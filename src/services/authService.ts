import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { DEBUG_MODE } from "./api";

interface LoginResponse {
  token: string;
  email: string;
}

export const login = async (email: string): Promise<LoginResponse> => {
  try {
    const response = await api.post("/appevento/appevento/auth/login", { email });
    const { token, email: userEmail } = response.data;

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("email", userEmail);

    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao realizar login:", error);
    }
    throw error;
  }
};