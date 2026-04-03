import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase';

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(4px)",
    zIndex: 200,
  },
  content: {
    inset: "auto",
    padding: 0,
    border: "none",
    background: "transparent",
    borderRadius: 0,
  },
};

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const openModalLogin = () => {
    setDrawerOpen(false);
    setModalLogin(true);
  };
  const closeModalLogin = () => setModalLogin(false);

  const openModalRegister = () => {
    setDrawerOpen(false);
    setModalRegister(true);
  };
  const closeModalRegister = () => setModalRegister(false);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setDrawerOpen(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Kullanıcının görünen adı (email veya displayName)
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>Nanny.Services</Link>

          {/* Desktop navbar */}
          <nav className={styles.navbar}>
            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Home</NavLink>
            <NavLink to="/nannies" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Nannies</NavLink>
            {user && (
              <NavLink to="/favorites" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Favorites</NavLink>
            )}
          </nav>

          <div className={styles.userArea}>
            {user ? (
              <>
                <span className={styles.userName}>{displayName}</span>
                <button onClick={handleLogOut} className={styles.logoutBtn}>Log out</button>
              </>
            ) : (
              <div className={styles.authButtons}>
                <button onClick={openModalLogin} className={styles.loginBtn}>Log In</button>
                <button onClick={openModalRegister} className={styles.registerBtn}>Register</button>
              </div>
            )}
          </div>

          {/* Hamburger butonu (mobil) */}
          <button className={styles.hamburger} onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Overlay ve Drawer (mobil menü) */}
        {drawerOpen && <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />}
        <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}>
          <button className={styles.drawerClose} onClick={() => setDrawerOpen(false)}>✕</button>
          <Link to="/" className={styles.drawerLogo} onClick={() => setDrawerOpen(false)}>Nanny.Services</Link>
          <nav className={styles.drawerNav}>
            <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
            <Link to="/nannies" onClick={() => setDrawerOpen(false)}>Nannies</Link>
            {user && <Link to="/favorites" onClick={() => setDrawerOpen(false)}>Favorites</Link>}
          </nav>
          <div className={styles.drawerActions}>
            {user ? (
              <>
                <span className={styles.drawerUserName}>{displayName}</span>
                <button onClick={handleLogOut} className={styles.logoutBtn}>Log out</button>
              </>
            ) : (
              <>
                <button onClick={openModalLogin} className={styles.loginBtn}>Log In</button>
                <button onClick={openModalRegister} className={styles.registerBtn}>Register</button>
              </>
            )}
          </div>
        </div>
        <Modal isOpen={modalRegister} onRequestClose={closeModalRegister} style={customStyles}>
          <RegisterModal isOpen={modalRegister} onClose={closeModalRegister} />
        </Modal>
        <Modal isOpen={modalLogin} onRequestClose={closeModalLogin} style={customStyles}>
          <LoginModal isOpen={modalLogin} onClose={closeModalLogin} />
        </Modal>
      </header>
    </>
  );
};

export default Header;