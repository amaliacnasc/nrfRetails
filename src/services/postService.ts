import { CreatePost, Post } from "@/interfaces/postInterface";
import api, { DEBUG_MODE } from "./api";

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get('/appevento/posts');
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao buscar posts:', error);
    }
    throw error;
  }
};

export const createPost = async (newPost: CreatePost): Promise<Post> => {
  try {
    const response = await api.post('/appevento/posts', newPost);
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao criar post:', error);
    }
    throw error;
  }
};