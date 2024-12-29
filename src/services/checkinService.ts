import { CreateCheckin, Checkin } from "@/interfaces/checkinInterface";
import api, { DEBUG_MODE } from "./api";

export const fetchCheckins = async (): Promise<Checkin[]> => {
  try {
    const response = await api.get("/appevento/checkins");
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao buscar check-ins:", error);
    }
    throw error;
  }
};

export const createCheckin = async (newCheckin: CreateCheckin): Promise<Checkin> => {
  try {
    const response = await api.post("/appevento/checkins", newCheckin);
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao criar check-in:", error);
    }
    throw error;
  }
};

export const fetchCheckinStatus = async (idEvent: number, idParticipant: number): Promise<boolean> => {
  try {
    const response = await api.get(`/appevento/checkins/event/${idEvent}/participant/${idParticipant}`);
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao verificar status do check-in:", error);
    }
    throw error;
  }
};
export const fetchCheckinsByParticipant = async (idParticipant: number): Promise<Checkin[]> => {
  try {
    const response = await api.get(`/appevento/checkins/participant/${idParticipant}`);
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao buscar check-ins do participante:", error);
    }
    throw error;
  }
};