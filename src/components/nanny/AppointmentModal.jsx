import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../common/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { database, userAppointmentsRef } from '../../services/firebase';
import { push } from 'firebase/database';

const schema = yup.object({
  fatherName: yup.string().required('Baba adı zorunlu'),
  motherName: yup.string().required('Anne adı zorunlu'),
  phone: yup.string().required('Telefon zorunlu'),
  email: yup.string().email('Geçerli email').required('Email zorunlu'),
  comment: yup.string(),
});

const AppointmentModal = ({ isOpen, onClose, nannyName }) => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!user) return;
    try {
      const appointment = {
        nannyName,
        ...data,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      };
      const appointmentsRef = userAppointmentsRef(user.uid);
      await push(appointmentsRef, appointment);
      alert('Randevu talebiniz alındı');
      reset();
      onClose();
    } catch (error) {
      alert('Randevu gönderilemedi: ' + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Randevu Talebi">
      <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
        <input {...register('fatherName')} placeholder="Baba adı" />
        <p className="error">{errors.fatherName?.message}</p>
        <input {...register('motherName')} placeholder="Anne adı" />
        <p className="error">{errors.motherName?.message}</p>
        <input {...register('phone')} placeholder="Telefon" />
        <p className="error">{errors.phone?.message}</p>
        <input {...register('email')} placeholder="E-posta" />
        <p className="error">{errors.email?.message}</p>
        <textarea {...register('comment')} placeholder="Eklemek istedikleriniz (isteğe bağlı)"></textarea>
        <button type="submit">Gönder</button>
      </form>
    </Modal>
  );
};

export default AppointmentModal;