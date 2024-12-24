import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchEvents } from '@/services/eventService';
import { createFavoriteEvent, fetchFavoriteEvents } from '@/services/favoriteService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventCard from './EventCard';
import { Event } from '@/interfaces/eventInterface';
import { SaveActivity } from '@/interfaces/savedEventsInterface';

interface EventListProps {
  selectedDate: string;
}

export default function EventList({ selectedDate }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedParticipant = await AsyncStorage.getItem('participant');
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          const fetchedFavorites = await fetchFavoriteEvents(participant.idParticipant);

          console.log('Favorites fetched from API:', fetchedFavorites);

          // Extrair os IDs das atividades favoritas corretamente
          setFavorites(fetchedFavorites.map((fav: SaveActivity) => fav.activity.idActivity));
          await loadEvents();
        } else {
          Alert.alert('Erro', 'Usuário não autenticado. Por favor, faça login novamente.');
        }
      } catch (error) {
        console.error('Erro ao inicializar:', error);
      }
    };

    initialize();
  }, []);

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
      const storedParticipant = await AsyncStorage.getItem("participant");
      if (storedParticipant) {
        const participant = JSON.parse(storedParticipant);
        await createFavoriteEvent({
          idParticipant: participant.idParticipant,
          idActivity: event.idActivity,
        });
  
        Alert.alert("Favorito adicionado com sucesso!", `Evento: ${event.title}`);
  
        setFavorites((prevFavorites) => [...prevFavorites, event.idActivity]);
      } else {
        Alert.alert("Erro", "Usuário não autenticado. Por favor, faça login novamente.");
      }
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      Alert.alert("Erro", "Não foi possível favoritar o evento.");
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
      {filteredEvents.map((event) => {
        const isFavorite = favorites.includes(event.idActivity);
        console.log('Is Favorite:', isFavorite, 'Event ID:', event.idActivity);

        return (
          <EventCard
            key={event.idActivity}
            event={event}
            isFavorite={isFavorite}
            onFavoriteSuccess={handleSaveFavorite}
          />
        );
      })}
    </View>
  );
}