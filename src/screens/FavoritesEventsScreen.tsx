import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { fetchFavoriteEvents, deleteFavoriteEvent } from "@/services/favoriteService";
import FavoriteEventCard from "@/components/events/FavoriteEventCard";
import { useFavorites } from "@/context/FavoritesContext";
import EventSkeleton from "@/components/events/EventSkeleton";

export default function FavoriteEventsScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);
  const { setFavorites: updateContextFavorites, toggleRefreshFavorites, refreshFavorites } = useFavorites();

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
        //  console.error("Usuário não autenticado. Por favor, faça login novamente.");
        }
      } catch (error) {
      //  console.error("Erro ao inicializar favoritos:", error);
      }
    };

    initialize();
  }, [refreshFavorites]);

  const loadFavorites = async (participantId: number) => {
    try {
      setLoading(true);
      const fetchedFavorites = await fetchFavoriteEvents(participantId);
      setFavorites(fetchedFavorites);
      updateContextFavorites(fetchedFavorites.map((fav) => fav.activity.idActivity));
    } catch (error) {
     // console.error("Erro ao buscar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favorite: any) => {
    try {
      await deleteFavoriteEvent(favorite.idSaveActivity);
      const updatedFavorites = favorites.filter(
        (item) => item.idSaveActivity !== favorite.idSaveActivity
      );
      setFavorites(updatedFavorites);
      updateContextFavorites(updatedFavorites.map((fav) => fav.activity.idActivity));
      toggleRefreshFavorites();
    } catch (error) {
     // console.error("Erro ao remover favorito:", error);
    }
  };

  const toggleFavorite = (favorite: any) => {
    const isCurrentlyFavorited = favorites.some((fav) => fav.idSaveActivity === favorite.idSaveActivity);

    if (isCurrentlyFavorited) {
      handleRemoveFavorite(favorite);
    }
  };

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center p-4">
      <Feather name="frown" size={48} color="#64748b" />
      <Text className="text-lg font-semibold text-gray-600">
        Você ainda não favoritou nenhum evento.
      </Text>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4 text-gray-800">Seus eventos favoritos</Text>
      {loading ? (
        <EventSkeleton />
      ) : favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <FavoriteEventCard
              favorite={item}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorited={true}
              onToggleFavorite={() => toggleFavorite(item)}
            />
          )}
          keyExtractor={(item) => item.idSaveActivity.toString()}
        />
      )}
    </View>
  );
}