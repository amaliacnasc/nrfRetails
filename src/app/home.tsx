import { View, Text, Image } from 'react-native'
import marca from '../images/marca.png'
import exemplo from '../images/exemploInicio.png'
import DateScroll from '@/conponents/dateScroll';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center gap-5 bg-white">
      <View className='w-full bg-blue-500 items-center justify-center py-20'>
        <Image source={marca} />
      </View>
      <Image source={exemplo} />
      <DateScroll />
    </View>
  );
}