import { useState, useEffect } from 'react';
import { database, nanniesRef, auth } from '../services/firebase';
import { get } from 'firebase/database';
import NannyCard from '../components/nanny/NannyCard';
import './Nannies.css';

const PAGE_SIZE = 3;

const Nannies = () => {
  const [allNannies, setAllNannies] = useState([]);
  const [filteredNannies, setFilteredNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortFilter, setSortFilter] = useState('A to Z');

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const user = auth.currentUser;
        const snapshot = await get(nanniesRef());
        if (snapshot.exists()) {
          const data = snapshot.val();
          const nanniesArray = Object.entries(data).map(([id, value]) => ({
            id,
            ...value
          }));
          setAllNannies(nanniesArray);
          setFilteredNannies(nanniesArray);
        } else {
          console.warn('Veritabanında bakıcı yok');
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNannies();
  }, []);

  const handleFilterSort = (value) => {
    setSortFilter(value);
    let result = [...allNannies];

    switch (value) {
      case 'Z to A':
        result = result.reverse();
        break;
      case 'Less than 10$':
        result = result.filter(p => p.price_per_hour < 10);
        break;
      case 'Greater than 10$':
        result = result.filter(p => p.price_per_hour > 10);
        break;
      case 'Popular':
        result = result.filter(p => p.rating >= 4.5);
        break;
      case 'Not popular':
        result = result.filter(p => p.rating < 4.5);
        break;
      case 'Show all':
        result = [...allNannies];
        break;
      default: // 'A to Z'
        result.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredNannies(result);
    setVisibleCount(PAGE_SIZE);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  const displayNannies = filteredNannies.slice(0, visibleCount);
  const showLoadMore = visibleCount < filteredNannies.length;

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <select onChange={(e) => handleFilterSort(e.target.value)} value={sortFilter}>
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
        <option value="Less than 10$">Less than 10$</option>
        <option value="Greater than 10$">Greater than 10$</option>
        <option value="Popular">Popular</option>
        <option value="Not popular">Not popular</option>
        <option value="Show all">Show all</option>
      </select>

      <div>
        {displayNannies.map((nanny) => (
          <NannyCard key={nanny.id} nanny={nanny} />
        ))}
      </div>

      {showLoadMore && (
        <button onClick={loadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default Nannies;