import { ScrollView, View, Text, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import EventList from '@/components/events/EventList';
import DateScroll from '@/components/dateScroll/DateScroll';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0058a3" />

      <ScrollView>
      
        <View className="w-full bg-blue-500 items-center justify-center py-20">
          <Image source={require('@/images/marca.png')} />
        </View>

      
        <Image source={require('@/images/exemploInicio.png')} className="mx-auto my-4" />


        <DateScroll selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        
        <EventList selectedDate={selectedDate} />
      </ScrollView>
    </>
  );
}