import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

type Date = {
  date: string;
  day: string;
};

const data: Date[] = [
  { date: '09 Jan', day: 'Quinta' },
  { date: '10 Jan', day: 'Sexta' },
  { date: '11 Jan', day: 'Sábado' },
  { date: '12 Jan', day: 'Domingo' },
  { date: '13 Jan', day: 'Segunda' },
  { date: '14 Jan', day: 'Terça' },
];

export default function DateScroll() {
  const renderItem = ({ item }: { item: Date }) => (
    <View style={styles.dateItem}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.dayText}>{item.day}</Text>
    </View>
  );

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    alignSelf: 'flex-start', // Faz a FlatList ocupar apenas o espaço do conteúdo
  },
  contentContainer: {
    flexDirection: 'row', // Alinha os itens horizontalmente
    backgroundColor: '#002F6C',
    paddingVertical: 10, // Controle o padding no conteúdo
  },
  dateItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  dateText: {
    color: '#6e99df',
    fontWeight: 'bold',
  },
  dayText: {
    color: '#6e99df',
    fontSize: 12,
    marginTop: 5,
  },
});
