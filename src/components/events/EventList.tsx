import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import EventCard from './EventCard';
import { fetchEvents } from '@/services/eventService';
import { Event } from '@/interfaces/eventInterface';

interface EventListProps {
  selectedDate: string;
}

export default function EventList({ selectedDate }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const filteredEvents = selectedDate
  ? events.filter((event) => {
      const eventDate = new Date(event.date).toISOString().slice(5, 10); 
      return eventDate === selectedDate;
    })
  : events;

  if (loading) {
    return (
      <View className="w-full mt-5 px-7">
        <Text className="text-lg font-semibold mb-3">Sua programação</Text>
        <ActivityIndicator size="large" color="#0056D6" />
      </View>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <View className="w-full mt-5 px-7 items-center">
        <Feather name="frown" size={48} color="#666" className="mb-3" />
        <Text className="text-lg font-semibold text-gray-600">Não há eventos para essa data</Text>
      </View>
    );
  }

  return (
    <View className="w-full mt-5 px-7">
      <Text className="text-lg font-semibold">Sua programação</Text>
      <View className="space-y-3 mt-4">
        {filteredEvents.map((event) => (
          <EventCard key={event.idActivity} event={event} />
        ))}
      </View>
    </View>
  );
}