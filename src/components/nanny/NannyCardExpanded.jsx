import AppointmentModal from './AppointmentModal';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import starIcon from '../../assets/star.svg';
import './NannyCard.css';

const NannyCardExpanded = ({ nanny, onClose }) => {
  const { user } = useAuth();
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="nanny-card-expanded">
      <div className="expanded-header">
        <h4>Reviews</h4>
        <button className="close-expanded" onClick={onClose}>×</button>
      </div>
      {nanny.reviews && nanny.reviews.map((review, idx) => (
        <div key={idx} className="review-item">
          <div className="reviewer-info">
            <strong>{review.reviewer}</strong>
            <div className="review-rating">
              <img src={starIcon} alt="star" width="14" />
              <span>{review.rating}</span>
            </div>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
      <div className="expanded-actions">
        <button className="appointment-btn" onClick={() => setShowAppointment(true)}>
          Make an appointment
        </button>
      </div>
      <AppointmentModal isOpen={showAppointment} onClose={() => setShowAppointment(false)} nannyName={nanny.name} />
    </div>
  );
};

export default NannyCardExpanded;