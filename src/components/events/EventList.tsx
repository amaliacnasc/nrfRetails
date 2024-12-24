import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchEvents } from '@/services/eventService';
import { saveFavoriteEvent } from '@/services/favoriteService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventCard from './EventCard'; // Importando o componente EventCard
import { Event } from '@/interfaces/eventInterface';

interface EventListProps {
  selectedDate: string;
}

export default function EventList({ selectedDate }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
        await loadEvents();
      } catch (error) {
        //Alert.alert('Erro', 'Não foi possível inicializar os eventos.');
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
      //Alert.alert('Erro', 'Não foi possível carregar os eventos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavorite = async (event: Event) => {
    if (!userToken) {
    //Alert.alert('Erro', 'Usuário não está logado!');
      return;
    }

    try {
      await saveFavoriteEvent(userToken, event);
      Alert.alert('Sucesso', 'Evento adicionado aos favoritos!');
    } catch (error) {
    //  Alert.alert('Erro', 'Não foi possível favoritar o evento.');
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
          onFavorite={handleSaveFavorite}
        />
      ))}
    </View>
  );
}