import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchEvents } from '@/services/eventService';
import { createFavoriteEvent, fetchFavoriteEvents, deleteFavoriteEvent } from '@/services/favoriteService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventCard from './EventCard';
import { Event } from '@/interfaces/eventInterface';
import { SaveActivity } from '@/interfaces/savedEventsInterface';
import { useFavorites } from '@/context/FavoritesContext';

interface EventListProps {
  selectedDate: string;
}

export default function EventList({ selectedDate }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { favorites, setFavorites, refreshFavorites, toggleRefreshFavorites } = useFavorites();
  
  const [favoriteSaveIds, setFavoriteSaveIds] = useState<{ [idActivity: number]: number }>({});

  const initialize = async () => {
    try {
      const storedParticipant = await AsyncStorage.getItem('participant');
      if (storedParticipant) {
        const participant = JSON.parse(storedParticipant);
        const fetchedFavorites = await fetchFavoriteEvents(participant.idParticipant);
        
        const favoriteIds = fetchedFavorites.map((fav: SaveActivity) => fav.activity.idActivity);
        setFavorites(favoriteIds);
        
        const fetchedFavoritesMap = fetchedFavorites.reduce((acc, fav: SaveActivity) => {
          acc[fav.activity.idActivity] = fav.idSaveActivity;
          return acc;
        }, {} as { [idActivity: number]: number });
        setFavoriteSaveIds(fetchedFavoritesMap);
        
        await loadEvents();
      } else {
        console.error('Usuário não autenticado. Por favor, faça login novamente.');
      }
    } catch (error) {
      console.error('Erro ao inicializar:', error);
    }
  };

  useEffect(() => {
    initialize();
  }, [refreshFavorites]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavorite = async (event: Event) => {
    try {
      const storedParticipant = await AsyncStorage.getItem('participant');
      if (storedParticipant) {
        const participant = JSON.parse(storedParticipant);
        const newFavorite: SaveActivity = await createFavoriteEvent({
          idParticipant: participant.idParticipant,
          idActivity: event.idActivity,
        });
        
        setFavorites((prevFavorites) => [...prevFavorites, event.idActivity]);
        setFavoriteSaveIds((prevMap) => ({
          ...prevMap,
          [event.idActivity]: newFavorite.idSaveActivity,
        }));
        toggleRefreshFavorites();
        console.log(`Favorito adicionado com sucesso! Evento: ${event.title}`);
      } else {
        console.error('Usuário não autenticado. Por favor, faça login novamente.');
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
  };

  const handleRemoveFavorite = async (idActivity: number, idSaveActivity: number) => {
    try {
      await deleteFavoriteEvent(idSaveActivity);
      setFavorites((prevFavorites) => prevFavorites.filter(id => id !== idActivity));
      setFavoriteSaveIds((prevMap) => {
        const updatedMap = { ...prevMap };
        delete updatedMap[idActivity];
        return updatedMap;
      });
      toggleRefreshFavorites();
      console.log(`Favorito removido com sucesso! Evento ID: ${idActivity}`);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const filteredEvents = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.date).toISOString().slice(5, 10);
        return eventDate === selectedDate;
      })
    : events;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0056D6" />
        <Text className="mt-4 text-lg font-semibold text-gray-600">Carregando eventos...</Text>
      </View>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Feather name="frown" size={48} color="#64748b" className="mb-4" />
        <Text className="text-lg font-semibold text-gray-600">
          Não há eventos disponíveis no momento
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-4 text-gray-800">Sua programação</Text>
      {filteredEvents.map((event) => (
        <EventCard
          key={event.idActivity}
          event={event}
          isFavorite={favorites.includes(event.idActivity)}
          onFavoriteSuccess={handleSaveFavorite}
          onRemoveFavorite={() => handleRemoveFavorite(event.idActivity, favoriteSaveIds[event.idActivity])}
        />
      ))}
    </View>
  );
}