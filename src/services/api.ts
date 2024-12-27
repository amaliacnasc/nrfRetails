import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";
// n descomenta pra n quebrar o codigo por favor! 
// basta substituir a const pelo ip dado pelo seu expo!

const APIURL = "https://missaonrf25.pe.senac.br";
//const APIURL = "http://192.168.1.3:8080"
const api = axios.create({
  //não tira o cod comentado de baixo, é implm futura!
  //baseURL: API_BASE_URL,
  baseURL: APIURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const DEBUG_MODE = false;

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (DEBUG_MODE) {
      console.log("Configuração da requisição:", config);
    }

    return config;
  },
  (error) => {
    if (DEBUG_MODE) {
      console.error("Erro na configuração da requisição:", error);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (DEBUG_MODE) {
      console.log("Resposta da API:", response);
    }
    return response;
  },
  (error) => {
    if (DEBUG_MODE) {
      if (error.response) {
        console.error("Erro na resposta da API:", error.response.data);
        console.error("Status do erro:", error.response.status);
        console.error("Headers do erro:", error.response.headers);
      } else if (error.request) {
        console.error("Nenhuma resposta da API foi recebida:", error.request);
      } else {
        console.error("Erro ao configurar a requisição:", error.message);
      }
      console.error("Configuração completa do erro:", error.config);
    }

    return Promise.reject(error);
  }
);

export default api;