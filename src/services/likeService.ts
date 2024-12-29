import { CreateLike, Like } from "@/interfaces/likesInteraface";
import api, { DEBUG_MODE } from "./api";

export const fetchLikes = async (): Promise<Like[]> => {
  try {
    const response = await api.get("/appevento/likes");
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao buscar likes:", error);
    }
    throw error;
  }
};

export const createLike = async (newLike: CreateLike): Promise<Like> => {
  try {
    const response = await api.post("/appevento/likes", newLike);
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao criar like:", error);
    }
    throw error;
  }
};

export const fetchLikesCount = async (idPost: number): Promise<number> => {
  try {
    const response = await api.get(`/appevento/likes/post/${idPost}`);
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao contar likes:", error);
    }
    throw error;
  }
};
export const deleteLike = async (idLike: number): Promise<void> => {
  try {
    await api.delete(`/appevento/likes/${idLike}`);
  } catch (error) {
    if (DEBUG_MODE) {
      console.error("Erro ao deletar like:", error);
    }
    throw error;
  }
};