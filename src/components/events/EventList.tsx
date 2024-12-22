import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchEvents } from '@/services/eventService';
import {saveFavoriteEvent} from '@/services/favoriteService'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      // Carrega o token do usuário do AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      await loadEvents();
    };

    initialize();
  }, []);

  const loadEvents = async () => {
    try {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os eventos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFavorite = async (event: Event) => {
    if (!userToken) {
      Alert.alert('Erro', 'Usuário não está logado!');
      return;
    }

    try {
      await saveFavoriteEvent(userToken, event);
      Alert.alert('Sucesso', 'Evento adicionado aos favoritos!');
    } catch (error) {
      console.error('Erro ao favoritar evento:', error);
      Alert.alert('Erro', 'Não foi possível favoritar o evento.');
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0056D6" />
        <Text>Carregando eventos...</Text>
      </View>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Feather name="frown" size={48} color="#666" />
        <Text>Não há eventos para essa data</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Sua programação</Text>
      {filteredEvents.map((event) => (
        <View
          key={event.idActivity}
          style={{
            marginBottom: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{event.title}</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>{event.date}</Text>
          <Button title="Favoritar" onPress={() => handleSaveFavorite(event)} />
        </View>
      ))}
    </View>
  );
}
