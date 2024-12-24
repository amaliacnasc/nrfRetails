import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { fetchFavoriteEvents } from "@/services/favoriteService";
import FavoriteEventCard from "@/components/events/FavoriteEventCard";

export default function FavoriteEventsScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedParticipant = await AsyncStorage.getItem("participant");
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setIdParticipant(participant.idParticipant);

          if (participant.idParticipant) {
            await loadFavorites(participant.idParticipant);
          }
        } else {
          Alert.alert("Erro", "Usuário não autenticado. Por favor, faça login novamente.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os favoritos.");
        console.error("Erro ao carregar favoritos:", error);
      }
    };

    initialize();
  }, []);

  const loadFavorites = async (participantId: number) => {
    try {
      setLoading(true);
      const fetchedFavorites = await fetchFavoriteEvents(participantId); // Busca favoritos diretamente
      setFavorites(fetchedFavorites);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os favoritos.");
      console.error("Erro ao buscar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0056D6" />
        <Text className="mt-4 text-lg font-semibold text-gray-600">Carregando favoritos...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Feather name="frown" size={48} color="#64748b" className="mb-4" />
        <Text className="text-lg font-semibold text-gray-600">
          Você ainda não favoritou nenhum evento.
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-4 text-gray-800">Seus eventos favoritos</Text>
      <FlatList
  data={favorites}
  renderItem={({ item }) => (
    <FavoriteEventCard
      favorite={item}
      onRemoveFavorite={(favorite) => {
        console.log("Removendo favorito:", favorite);
      }}
    />
  )}
  keyExtractor={(item) => item.idSaveActivity.toString()}
/>
    </View>
  );
}