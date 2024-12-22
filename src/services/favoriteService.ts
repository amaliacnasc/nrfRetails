import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '@/interfaces/eventInterface';

const FAVORITES_KEY = 'user_favorites';

export const saveFavoriteEvent = async (userToken: string, event: Event): Promise<void> => {
  try {
    // Busca os favoritos armazenados no AsyncStorage
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};

    // Inicializa a lista de favoritos para o usuário, caso não exista
    favorites[userToken] = favorites[userToken] || [];

    // Verifica se o evento já está nos favoritos
    const isAlreadyFavorite = favorites[userToken].some(
      (favEvent: Event) => favEvent.idActivity === event.idActivity
    );

    if (!isAlreadyFavorite) {
      // Adiciona o evento aos favoritos do usuário
      favorites[userToken].push(event);

      // Atualiza o AsyncStorage
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } else {
      console.log('Evento já está nos favoritos.');
    }
  } catch (error) {
    console.error('Erro ao salvar evento favorito:', error);
    throw error;
  }
};
