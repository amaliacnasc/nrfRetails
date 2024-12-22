import { CreateEvent, Event } from "@/interfaces/eventInterface";
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

export const createEvent = async (newEvent: CreateEvent): Promise<Event> => {
  try {
    const response = await api.post('/activities', newEvent);
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao criar evento:', error);
    }
    throw error;
  }
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    await api.delete(`/activities/${id}`);
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao excluir evento:', error);
    }
    throw error;
  }
};