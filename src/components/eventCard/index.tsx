import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Event } from '@/types/event';


export default function EventCard({ event }: { event: Event }) {
  return (
    <View style={styles.container}>
      {/* Título e Ícone de Favorito */}
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <Feather name="bookmark" size={24} color="#666" />
      </View>

      {/* Data e Hora */}
      <View style={styles.row}>
        <View style={styles.iconText}>
          <Feather name="calendar" size={20} color="#0056D6" />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>
        <View style={styles.iconText}>
          <Feather name="clock" size={20} color="#0056D6" />
          <Text style={styles.infoText}>{event.time}</Text>
        </View>
      </View>

      {/* Sobre */}
      <Text style={styles.sectionTitle}>Sobre</Text>
      <Text style={styles.description}>{event.about}</Text>

      {/* Endereço */}
      <View style={styles.row}>
        <Feather name="map-pin" size={20} color="#666" />
        <Text style={styles.address}>{event.location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#0056D6',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
