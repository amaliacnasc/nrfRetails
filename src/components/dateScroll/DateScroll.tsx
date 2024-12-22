import React from 'react';
import { FlatList, Text, View } from 'react-native';

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
    <View className="items-center mx-4">
      <Text className="text-[#6e99df] font-bold">{item.date}</Text>
      <Text className="text-[#6e99df] text-xs mt-1">{item.day}</Text>
    </View>
  );

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: '#002F6C', 
        paddingVertical: 10, 
        paddingHorizontal: 15,
        width: '100%', 
        justifyContent: 'space-between',
      }}
      style={{
        width: '100%',
      }}
    />
  );
}