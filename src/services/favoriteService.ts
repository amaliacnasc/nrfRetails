import { CreateSaveActivity, SaveActivity } from "@/interfaces/savedEventsInterface";
import api from "@/services/api";



export const fetchFavoriteEvents = async (idParticipant: number): Promise<SaveActivity[]> => {
  try {
    const response = await api.get(`/appevento/save/participant/${idParticipant}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    throw error;
  }
};

export const createFavoriteEvent = async (saveActivityData: CreateSaveActivity): Promise<SaveActivity> => {
  try {
    const response = await api.post(`/appevento/save`, saveActivityData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar favorito:", error);
    throw error;
  }
};
export const deleteFavoriteEvent = async (idSaveActivity: number): Promise<void> => {
  try {
    const response = await api.delete(`/appevento/save/${idSaveActivity}`);
    if (response.status !== 204) {
      throw new Error(`Erro ao deletar o favorito com ID ${idSaveActivity}`);
    }
    console.log(`Favorito com ID ${idSaveActivity} foi deletado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar favorito:`, error);
    throw error;
  }
};