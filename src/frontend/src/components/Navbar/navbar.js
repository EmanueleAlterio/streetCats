import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

// Import per le icone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { jwtDecode as jwt_decode } from 'jwt-decode';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoggedIn(false);
      return;
    }
    try {
      jwt_decode(token);
      setLoggedIn(true);
    } catch {
      setLoggedIn(false);
    }
  }, []);

  const defaultProfile = '/default-profile.png';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FontAwesomeIcon icon={faCat} className="ms-2 me-2" size="lg" />
          StreetCats
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/add-cat">
                Inserisci Gatto
              </Link>
            </li>
            <li className="nav-item ms-3 me-3">
              {loggedIn ? (
                <Link to="/profile" className="nav-link p-0">
                  <i class="bi bi-person-fill icon-large"></i>
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
