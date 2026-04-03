import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Modal from '../common/Modal';
import './AuthModal.css';

const schema = yup.object({
  name: yup.string().required('İsim zorunlu'),
  email: yup.string().email('Geçerli email girin').required('Email zorunlu'),
  password: yup.string().min(6, 'En az 6 karakter').required('Şifre zorunlu'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Şifreler uyuşmuyor').required(),
});

const RegisterModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      reset();
      onClose();
    } catch (error) {
      alert('Kayıt başarısız: ' + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="auth-modal">
        <h2 className="auth-title">Register</h2>
        <p className="auth-subtitle">
          Create an account to save favorite nannies and book appointments.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="input-group">
            <input {...register('name')} placeholder="Full Name" className="auth-input" />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="input-group">
            <input {...register('email')} placeholder="Email" className="auth-input" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="input-group password-group">
            <input 
              {...register('password')} 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              className="auth-input"
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div className="input-group password-group">
            <input 
              {...register('confirmPassword')} 
              type={showConfirmPassword ? 'text' : 'password'} 
              placeholder="Confirm Password" 
              className="auth-input"
            />
            <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;