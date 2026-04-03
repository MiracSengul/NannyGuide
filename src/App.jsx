import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Home from './pages/Home';
import Nannies from './pages/Nannies';
import Favorites from './pages/Favorites';
import Header from './components/Header/Header'; // Yeni eklediğimiz Header
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nannies" element={<Nannies />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;