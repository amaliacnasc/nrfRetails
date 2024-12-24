import React, { createContext, useState, useContext, ReactNode } from "react";

interface FavoritesContextData {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  refreshFavorites: boolean;
  toggleRefreshFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [refreshFavorites, setRefreshFavorites] = useState(false);

  const toggleRefreshFavorites = () => setRefreshFavorites((prev) => !prev);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, refreshFavorites, toggleRefreshFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  }
  return context;
};