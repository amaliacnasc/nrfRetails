import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';

type Date = {
  displayDate: string;
  day: string;
  value: string;
};

interface DateScrollProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const data: Date[] = [
  { displayDate: '09 Jan', day: 'Quinta', value: '2025-01-09' },
  { displayDate: '10 Jan', day: 'Sexta', value: '2025-01-10' },
  { displayDate: '11 Jan', day: 'Sábado', value: '2025-01-11' },
  { displayDate: '12 Jan', day: 'Domingo', value: '2025-01-12' },
  { displayDate: '13 Jan', day: 'Segunda', value: '2025-01-13' },
  { displayDate: '14 Jan', day: 'Terça', value: '2025-01-14' },
];

export default function DateScroll({ selectedDate, setSelectedDate }: DateScrollProps) {
  const renderItem = ({ item }: { item: Date }) => (
    <TouchableOpacity
      className={`items-center mx-2 py-2 px-3 rounded-lg ${
        selectedDate === item.value ? 'bg-[#0056D6]' : ''
      }`}
      onPress={() => setSelectedDate(selectedDate === item.value ? '' : item.value)}
    >
      <Text
        className={`text-sm font-bold ${
          selectedDate === item.value ? 'text-white' : 'text-[#6e99df]'
        }`}
      >
        {item.displayDate}
      </Text>
      <Text
        className={`text-xs mt-1 ${
          selectedDate === item.value ? 'text-white' : 'text-[#6e99df]'
        }`}
      >
        {item.day}
      </Text>
    </TouchableOpacity>
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
      }}
    />
  );
}