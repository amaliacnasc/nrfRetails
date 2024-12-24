
import { AreaOfExpertiseDTO } from '@/interfaces/areaOfExpertiseInterface';
import api, { DEBUG_MODE } from './api';

export const getAllAreas = async (): Promise<AreaOfExpertiseDTO[]> => {
  try {
    const response = await api.get('appevento/areas');
    return response.data;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao listar todas as áreas de especialização:', error);
    }
    throw error;
  }
};
