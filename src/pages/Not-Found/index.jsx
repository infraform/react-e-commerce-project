import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import attention from '../../constants/icons/attention.png';
import './notfound.scss';

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="error-container">
        <div className="error-wrapper">
          <div className="error-img">
            <img src={attention} alt="errorImg" />
          </div>
          <div className="error-message">
            <p>Oooops! </p>
            Aradığınız sayfa bulunamadı.
            {' '}
            <Link to="/">
              <div className="error-link">Anasayfaya dönmek için tıklayın...</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
