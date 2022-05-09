import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './navbar.scss';
import Logo from '../../constants/icons/Logo';
import Plus from '../../constants/icons/Plus';
import Login from '../../constants/icons/Login';
import useWindowSize from '../../hooks/useWindowSize';
import { useProduct } from '../../contexts/ProductContext';

function Navbar() {
  const [width] = useWindowSize();
  const isAuth = Cookies.get('token');
  const { getProduct } = useProduct();

  return (
    <nav className="nav">
      <div className="nav-wrapper">
        <div className="nav-logo">
          <Link to="/">
            <Logo
              aria-label="Logo"
              name="logo"
              size={width < 768 ? 99.33 : 128.94}
              onClick={() => getProduct}
            />
          </Link>
        </div>
        <div className="nav-btns">
          {isAuth && (
          <Link to="/addproduct">
            <button
              type="button"
              name="addproduct"
              aria-label="Add Product"
              className="nav-btn btn-add-product"
            >
              <Plus />
              {' '}
              {width > 576 && 'Ürün Ekle'}
              {' '}

            </button>
          </Link>
          ) }
          {isAuth ? (
            <Link to="/myaccount">
              <button
                type="button"
                name="myaccount"
                className="nav-btn btn-add-product"
                aria-label="My Account"
              >
                <Login />
                {' '}
                Hesabım
              </button>
            </Link>
          )
            : (
              <Link to="/login">
                <button
                  type="button"
                  name="login"
                  className="nav-btn btn-login"
                  aria-label="Login"
                >
                  <Login />
                  {' '}
                  Giriş Yap
                </button>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
