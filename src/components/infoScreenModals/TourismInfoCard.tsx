import React from 'react';
import { View, Text } from 'react-native';

interface TourismInfoCardProps {
  title: string;
  items: string[];
}

const TourismInfoCard: React.FC<TourismInfoCardProps> = ({ title, items }) => {
  return (
    <View className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
      <Text className="text-lg font-semibold text-gray-800 mb-2">{title}</Text>
      {items.map((item, index) => (
        <Text key={index} className="text-gray-700">- {item}</Text>
      ))}
    </View>
  );
};

export default TourismInfoCard;