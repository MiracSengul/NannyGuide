import { useState, useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { database, nannyRef } from '../services/firebase';
import { get } from 'firebase/database';
import NannyCard from '../components/nanny/NannyCard';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [favoriteNannies, setFavoriteNannies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!favorites.length) {
        setFavoriteNannies([]);
        setLoading(false);
        return;
      }
      try {
        const nanniesData = [];
        for (const id of favorites) {
          const snapshot = await get(nannyRef(id));
          if (snapshot.exists()) {
            nanniesData.push({ id, ...snapshot.val() });
          }
        }
        setFavoriteNannies(nanniesData);
      } catch (error) {
        console.error('Favoriler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [favorites]);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="favorites-page">
      <h2>Favori Bakıcılarım</h2>
      {favoriteNannies.length === 0 ? (
        <p>Henüz favori eklemediniz.</p>
      ) : (
        <div className="nannies-list">
          {favoriteNannies.map(nanny => (
            <NannyCard key={nanny.id} nanny={nanny} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;