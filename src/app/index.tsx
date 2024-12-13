import React from 'react';
import { Text, View, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-black">Linha do Tempo</Text>
    </View>
  );
}

function InfoScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      {/* Top Section: User Info */}
      <View className="items-center my-6">
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder para a foto do usuário
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-lg font-bold text-black">Nome do Usuário</Text>
        <Text className="text-sm text-gray-500">email@exemplo.com</Text>
      </View>

      {/* Sessão 1: Minha Conta */}
      <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-black mb-2">Minha Conta</Text>
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="person" size={20} color="black" />
          <Text className="text-black ml-2">Editar Perfil</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

       {/* Sessão 2: Serviços */}
       <View className="bg-white p-4 rounded-lg shadow mb-4">
        <Text className="text-lg font-bold text-black mb-2">Central de Atendimento</Text>
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="phone" size={20} color="black" />
          <Text className="text-black ml-2">Contato com os Coordenadores</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="map" size={20} color="black" />
          <Text className="text-black ml-2">Tradutor</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
          <MaterialIcons name="hotel" size={20} color="black" />
          <Text className="text-black ml-2">Hospedagem e Transporte</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 flex-row items-center justify-between">
          <MaterialIcons name="book" size={20} color="black" />
          <Text className="text-black ml-2">Cartilha do Viajante</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-white p-4 rounded-lg shadow mb-4 flex-row items-center justify-between">
        <MaterialIcons name="info" size={20} color="black" />
        <Text className="text-lg text-black ml-2">Sobre o Aplicativo</Text>
        <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
      </TouchableOpacity>

      {/* Sessão 4: Sair */}
      <TouchableOpacity className="border border-red-500 bg-transparent p-4 rounded-lg items-center my-6">
        <Text className="text-red-500 font-bold">Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
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
        <Tab.Screen name="Linha do Tempo" component={TimelineScreen} />
        <Tab.Screen name="Informações" component={InfoScreen} />
      </Tab.Navigator>
    </>
  );
}
