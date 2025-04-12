import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase-Authentication/Firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';
import "../../../firebase-Authentication/App.css"

const Navbar = ({ setSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe(); // clean up
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearch(value);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark');
  };

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    alert("Logged out. See you soon 🎬");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">🎬 JK TrailerMovies</Link>
      </div>

      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>

      <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            className="searchInput"
          />
        </div>

        <ul className="navLinks">
          <li><Link to="/home" className="navLink" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className="navLink" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" className="navLink" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>

          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="Logout">Logout</button></li>
          ) : (
            <>
              <li><Link to="/" className="navLink">Login</Link></li>
              <li><Link to="/signup" className="navLink">Signup</Link></li>
            </>
          )}
        </ul>

        <button className="themeToggle" onClick={toggleTheme}>
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
