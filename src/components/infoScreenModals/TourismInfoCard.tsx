import React from 'react';
import { View, Text, Platform } from 'react-native';

interface TourismInfoCardProps {
  title: string;
  items: string[];
}

const TourismInfoCard: React.FC<TourismInfoCardProps> = ({ title, items }) => {
  return (
    <View
      className="bg-gray-100 rounded-lg shadow"
      style={{
        padding: 16,
        marginBottom: 16,
        marginTop: Platform.OS === 'ios' ? 12 : 8,
      }}
    >
      <Text className="text-lg font-semibold text-gray-800 mb-2">{title}</Text>
      {items.map((item, index) => (
        <Text key={index} className="text-gray-700">- {item}</Text>
      ))}
    </View>
  );
};

export default TourismInfoCard;