import { CreateParticipant, Participant } from '@/interfaces/participantInterface';
import axios from 'axios';

export const getParticipantByEmail = async (email: string): Promise<Participant> => {
  try {
    // Codifica o email para garantir que caracteres especiais sejam tratados corretamente
    const encodedEmail = encodeURIComponent(email);

    // Faz a requisição utilizando o email codificado
    const response = await axios.get(`/appevento/participants/email/${encodedEmail}`);

    const participant: Participant = response.data;
    return participant;
  } catch (error) {
    console.error('Erro ao buscar participante por e-mail:', error);
    throw error;
  }
};

export const getAllParticipants = async (): Promise<any[]> => {
  try {
    const response = await axios.get('/participants');
    return response.data; 
  } catch (error) {
    console.error('Erro ao listar todos os participantes:', error);
    throw error;
  }
};

// Função para criar ou atualizar dados de um participante
export const updateParticipant = async (data: CreateParticipant): Promise<void> => {
  try {
    await axios.post('/participants', data); // Faz o envio dos dados
    console.log('Participante criado/atualizado com sucesso:', data);
  } catch (error) {
    console.error('Erro ao criar/atualizar participante:', error);
    throw error;
  }
};