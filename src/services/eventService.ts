import {  Event } from "@/interfaces/eventInterface";
import api, { DEBUG_MODE } from "./api";

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get('/appevento/activities');
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao buscar eventos:', error);
    }
    throw error; // Lança o erro sem logá-lo no console
  }
};
export const fetchEventById = async (idActivity: number): Promise<Event> => {
  try {
    const response = await api.get(`/appevento/activities/${idActivity}`);
    return response.data; // Retorna os dados do evento
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao buscar evento:", error);
    }
    throw error; 
  }
};