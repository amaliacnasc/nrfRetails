import { CreateParticipant, Participant } from '@/interfaces/participantInterface';
import api, { DEBUG_MODE } from './api';

export const getParticipantByEmail = async (email: string): Promise<Participant> => {
  try {
    const encodedEmail = encodeURIComponent(email);

    const response = await api.get(`/appevento/participants/email/${encodedEmail}`);

    const participant: Participant = response.data;
    return participant;
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao buscar participante por e-mail:', error);
    }
    throw error;
  }
};

export const getAllParticipants = async (): Promise<any[]> => {
  try {
    const response = await api.get('/participants');
    return response.data; 
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao listar todos os participantes:', error);
    }
    throw error;
  }
};

export const updateParticipant = async (data: CreateParticipant): Promise<void> => {
  try {
    await api.post('/appevento/participants', data); 
    if (DEBUG_MODE) {
      console.log('Participante criado/atualizado com sucesso:', data);
    }
  } catch (error) {
    if (DEBUG_MODE) {
      console.error('Erro ao criar/atualizar participante:', error);
    }
    throw error;
  }
};