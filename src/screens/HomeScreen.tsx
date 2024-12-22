import { ScrollView, View, Text, Image } from 'react-native';
import DateScroll from '@/components/dateScroll';
import EventList from '@/components/eventList';

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