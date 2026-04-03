import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import AppointmentModal from './AppointmentModal';
import LoginModal from '../auth/LoginModal';
import styles from './NannyCard.module.css';
import mapPin from '../../assets/map-pin.svg';
import starIcon from '../../assets/star.svg';

const NannyCard = ({ nanny }) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [expanded, setExpanded] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleFavoriteClick = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    toggleFavorite(nanny.id);
  };

  const handleMakeAppointment = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setShowAppointment(true);
  };

  const getAge = (birthdayStr) => {
    const birthDate = new Date(birthdayStr);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const isFav = isFavorite(nanny.id);

  return (
    <>
      <div className={styles.card}>
        <img src={nanny.avatar_url} width={96} height={96} alt={nanny.name} />
        <div className={styles.cardItem}>
        <ul className={styles.info}>
          <li>
            <img src={mapPin} alt="location" />
            {nanny.location}
          </li>
          <li>
            <img src={starIcon} alt="rating" />
            <span>Rating: {nanny.rating}</span>
          </li>
          <li>Price / 1 hour: {nanny.price_per_hour}$</li>
          <li>
            <button className={styles.heartBtn} onClick={handleFavoriteClick}>
              {isFav ? '♥' : '♡'}
            </button>
          </li>
        </ul>
          <div className={styles.cardinfo}>
            <h2 className={styles.heading}>{nanny.name}</h2>
            <ul className={styles.all}>
              <li>
                <span className={styles.color}>Age:</span> {getAge(nanny.birthday)}
              </li>
              <li>
                <span className={styles.color}>Experience:</span> {nanny.experience}
              </li>
              <li>
                <span className={styles.color}>Kids Age:</span> {nanny.kids_age}
              </li>
              <li>
                <span className={styles.color}>Characters:</span> {nanny.characters?.join(', ')}
              </li>
              <li>
                <span className={styles.color}>Education:</span> {nanny.education}
              </li>
            </ul>
            <p className={styles.about}>{nanny.about}</p>

            {expanded && (
              <>
                <ul className={styles.item}>
                  {nanny.reviews?.map((review, idx) => (
                    <li key={idx}>
                      <div className={styles.review}>
                        <p className={styles.title}>{review.reviewer[0].toUpperCase()}</p>
                        <div>
                          <p>{review.reviewer}</p>
                          <div className={styles.star}>
                            <img src={starIcon} alt="rating" />
                            <p>{review.rating}</p>
                          </div>
                        </div>
                      </div>
                      <p className={styles.comment}>{review.comment}</p>
                    </li>
                  ))}
                </ul>
                <button onClick={handleMakeAppointment} className={styles.make}>
                  Make an appointment
                </button>
              </>
            )}

            <button onClick={() => setExpanded(!expanded)} className={styles.readMoreBtn}>
              {expanded ? 'Read less' : 'Read more'}
            </button>
          </div>
        </div>
      </div>

      <AppointmentModal 
        isOpen={showAppointment} 
        onClose={() => setShowAppointment(false)} 
        nanny={nanny}   // tüm nanny objesini gönder
      />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default NannyCard;