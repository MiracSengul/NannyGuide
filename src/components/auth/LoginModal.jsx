import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Modal from '../common/Modal';
import './AuthModal.css';

const schema = yup.object({
  email: yup.string().email('Geçerli email girin').required('Email zorunlu'),
  password: yup.string().min(6, 'En az 6 karakter').required('Şifre zorunlu'),
});

const LoginModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      reset();
      onClose();
    } catch (error) {
      alert('Giriş başarısız: ' + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="auth-modal">
        <h2 className="auth-title">Log In</h2>
        <p className="auth-subtitle">
          Welcome back! Please enter your credentials to access your account and continue your babysitter search.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit" className="auth-button">Log In</button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;