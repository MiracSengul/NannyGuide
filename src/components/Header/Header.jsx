import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

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

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <p className={styles.logo}>Nanny.Services</p>

          <nav className={styles.navbar}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/nannies">Nannies</Link></li>
              {user && <li><Link to="/favorites">Favorites</Link></li>}
            </ul>
            <ul>
              {user ? (
                <>
                  <p className={styles.userEmail}>{user.email}</p>
                  <li>
                    <button onClick={handleLogOut} className={styles.register}>
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={openModalLogin} className={styles.login}>
                      Log In
                    </button>
                  </li>
                  <li>
                    <button onClick={openModalRegister} className={styles.register}>
                      Register
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <button className={styles.hamburger} onClick={() => setDrawerOpen(true)}>
            <span /><span /><span />
          </button>
        </div>

        {drawerOpen && <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />}
        <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}>
          <button className={styles.drawerClose} onClick={() => setDrawerOpen(false)}>✕</button>
          <p className={styles.drawerLogo}>Nanny.Services</p>
          <nav className={styles.drawerNav}>
            <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
            <Link to="/nannies" onClick={() => setDrawerOpen(false)}>Nannies</Link>
            {user && <Link to="/favorites" onClick={() => setDrawerOpen(false)}>Favorites</Link>}
          </nav>
          <div className={styles.drawerActions}>
            {user ? (
              <>
                <p className={styles.drawerUsername}>{user.email}</p>
                <button onClick={handleLogOut} className={styles.register}>Log Out</button>
              </>
            ) : (
              <>
                <button onClick={openModalLogin} className={styles.login}>Log In</button>
                <button onClick={openModalRegister} className={styles.register}>Register</button>
              </>
            )}
          </div>
        </div>
      </header>

      <LoginModal isOpen={modalLogin} onClose={closeModalLogin} />
      <RegisterModal isOpen={modalRegister} onClose={closeModalRegister} />
    </>
  );
};

export default Header;