import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../common/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { database, userAppointmentsRef } from '../../services/firebase';
import { push } from 'firebase/database';
import './AppointmentModal.css';

const schema = yup.object({
  address: yup.string().required('Address is required'),
  childAge: yup.string().required('Child\'s age is required'),
  email: yup.string().email('Valid email required').required('Email is required'),
  parentName: yup.string().required('Parent name is required'),
  phone: yup.string()
    .required('Phone number is required')
    .matches(/^[0-9+\s()-]+$/, 'Only numbers, spaces, +, - and () allowed'),
  comment: yup.string(),
  meetingTime: yup.string().required('Meeting time is required'),
});

const AppointmentModal = ({ isOpen, onClose, nanny }) => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      meetingTime: '09:30'
    }
  });

  const onSubmit = async (data) => {
    if (!user) return;
    try {
      const appointment = {
        nannyId: nanny.id,
        nannyName: nanny.name,
        nannyAvatar: nanny.avatar_url,
        ...data,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      };
      const appointmentsRef = userAppointmentsRef(user.uid);
      await push(appointmentsRef, appointment);
      alert('Appointment request sent successfully!');
      reset();
      onClose();
    } catch (error) {
      alert('Failed to send appointment: ' + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="appointment-modal">
        <h2 className="appointment-title">Make an appointment with a babysitter</h2>
        <p className="appointment-subtitle">
          Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.
        </p>

        <div className="nanny-info">
          <img src={nanny?.avatar_url} alt={nanny?.name} className="nanny-avatar" />
          <div>
            <span className="your-nanny-label">Your nanny</span>
            <p className="nanny-name">{nanny?.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
          <div className="form-row">
            <div className="form-group">
              <input {...register('address')} placeholder="Address" className="form-input" />
              {errors.address && <p className="error">{errors.address.message}</p>}
            </div>
            <div className="form-group">
              <input {...register('childAge')} placeholder="Child's age" className="form-input" />
              {errors.childAge && <p className="error">{errors.childAge.message}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input {...register('email')} placeholder="Email" className="form-input" />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <input type="time" {...register('meetingTime')} className="form-input" step="1800" />
              {errors.meetingTime && <p className="error">{errors.meetingTime.message}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input {...register('parentName')} placeholder="Father's or mother's name" className="form-input" />
              {errors.parentName && <p className="error">{errors.parentName.message}</p>}
            </div>
            <div className="form-group">
              <input {...register('phone')} placeholder="Phone number" className="form-input" />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="form-group full-width">
            <textarea {...register('comment')} placeholder="Comment" className="form-textarea" rows="3" />
          </div>

          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentModal;