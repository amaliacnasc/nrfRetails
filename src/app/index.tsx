import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../../linha do tempo/postcard'; // Importa o componente

import "../global.css";

// Telas de exemplo
function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-black">Início</Text>
    </View>
  );
}

function TimelineScreen() {
  return (
    <View>
    <PostCard /> // Substitui a tela pela lista de posts
    </View>
  );
}

function InfoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-black">Informações</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      {/* Configuração da StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Definindo ícones para cada tela
            if (route.name === 'Início') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Linha do Tempo') {
              iconName = focused ? 'git-network' : 'git-network-outline';
            } else if (route.name === 'Informações') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            // Retorna o ícone correspondente
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          headerShown: false
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Linha do Tempo" component={PostCard} />
        <Tab.Screen name="Informações" component={InfoScreen} />
      </Tab.Navigator>
    </>
  );
}
