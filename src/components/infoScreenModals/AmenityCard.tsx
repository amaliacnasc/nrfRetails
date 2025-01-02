import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native-reanimated/lib/typescript/Animated";

type IconName = keyof typeof MaterialIcons.glyphMap;
export interface Amenity {
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap; // Use apenas chaves válidas do MaterialIcons
  }
  
interface AmenityCardProps {
  title: string;
  icon: IconName;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ title, icon }) => (
  <View className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-4 shadow">
    <MaterialIcons name={icon} size={24} color="#0056D6" />
    <Text className="ml-4 text-lg font-semibold text-gray-800">{title}</Text>
  </View>
);
const Amenities = () => {
  return (
    <View className="p-4">
      <AmenityCard title="Gym" icon="fitness-center" />
      <AmenityCard title="Restaurant and Bar" icon="restaurant" />
      <AmenityCard title="Multilingual Staff" icon="language" />
      <AmenityCard title="Ask Alfred Children Programme" icon="child-care" />
      <AmenityCard title="Complimentary Wi-Fi" icon="wifi" />
      <AmenityCard title="Meeting and Event Facilities" icon="event" />
    </View>
  );
};

export default Amenities;