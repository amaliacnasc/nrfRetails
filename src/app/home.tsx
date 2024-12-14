import { ScrollView, View, Text, Image } from 'react-native';
import marca from '../images/marca.png';
import exemplo from '../images/exemploInicio.png';
import DateScroll from '@/conponents/dateScroll';
import EventList from '@/conponents/eventList';

export default function HomeScreen() {
  return (
    <ScrollView >
      <View className="w-full bg-blue-500 items-center justify-center py-20">
        <Image source={marca} />
      </View>

      <Image source={exemplo} className="mx-auto my-4" />

      <DateScroll />

      <EventList />
    </ScrollView>
  );
}
