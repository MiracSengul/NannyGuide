import { useState, useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { database, nannyRef } from '../services/firebase';
import { get } from 'firebase/database';
import NannyCard from '../components/nanny/NannyCard';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [favoriteNannies, setFavoriteNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

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

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const displayedNannies = favoriteNannies.slice(0, visibleCount);
  const hasMore = visibleCount < favoriteNannies.length;

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        {displayedNannies.length === 0 ? (
          <p className="no-favorites">No favorites added yet.</p>
        ) : (
          <>
            <div className="favorites-list">
              {displayedNannies.map(nanny => (
                <NannyCard key={nanny.id} nanny={nanny} />
              ))}
            </div>
            {hasMore && (
              <button className="load-more-btn" onClick={loadMore}>
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;