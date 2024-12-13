import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

type Date = {
  date: string,
  day: string
}
const data: Date[] = [
  { date: '09 Jan', day: 'Quinta' },
  { date: '10 Jan', day: 'Sexta' },
  { date: '11 Jan', day: 'Sábado' },
  { date: '12 Jan', day: 'Domingo' },
  { date: '13 Jan', day: 'Segunda' },
  { date: '13 Jan', day: 'Segunda' },
  { date: '13 Jan', day: 'Segunda' },
  { date: '13 Jan', day: 'Segunda' },
  { date: '13 Jan', day: 'Segunda' },
  { date: '13 Jan', day: 'Segunda' },
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
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002F6C',
    paddingVertical: 10,
  },
  dateItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  dateText: {
    color: '#6e99df',
    fontWeight: 'bold'
  },
  dayText: {
    color: '#6e99df',
    fontSize: 12,
    marginTop: 5,
  },
});
