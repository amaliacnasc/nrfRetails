import {  View, StatusBar, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../../linha do tempo/postcard'; // Importa o componente
import InfoScreen from '@/conponents/InfoScreen';

import "../global.css";
import HomeScreen from './home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      {/* Configuração da StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

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
          tabBarActiveTintColor: '#04378b',
          tabBarInactiveTintColor: '#6e99df',
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
