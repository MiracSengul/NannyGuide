import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { database, userFavoritesRef } from '../services/firebase';
import { get, set } from 'firebase/database';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const favRef = userFavoritesRef(user.uid);
        const snapshot = await get(favRef);
        if (snapshot.exists()) {
          setFavorites(snapshot.val());
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error('Favoriler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (nannyId) => {
    if (!user) {
      console.log('Kullanıcı giriş yapmamış');
      return false;
    }

    try {
      const favRef = userFavoritesRef(user.uid);
      let newFavorites;
      if (favorites.includes(nannyId)) {
        newFavorites = favorites.filter(id => id !== nannyId);
      } else {
        newFavorites = [...favorites, nannyId];
      }
      await set(favRef, newFavorites);
      setFavorites(newFavorites);
      return true;
    } catch (error) {
      console.error('Favori güncelleme hatası:', error);
      return false;
    }
  };

  const isFavorite = (nannyId) => favorites.includes(nannyId);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};