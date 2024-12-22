import { ScrollView, View, Text, Image } from 'react-native';
import EventList from '@/components/eventList/EventList';
import DateScroll from '@/components/dateScroll/DateScroll';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View className="w-full bg-blue-500 items-center justify-center py-20">
        <Image source={require('@/images/marca.png')} />
      </View>

      <Image source={require('@/images/exemploInicio.png')} className="mx-auto my-4" />

      <DateScroll />

      <EventList />
    </ScrollView>
  );
}