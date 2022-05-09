import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import axios from '../../api/axios';
import toastify from '../../helper funcs/toastify';
import DownArrow from '../../constants/icons/DownArrow';
import './form.scss';
import checkAuth from '../../helper funcs/checkAuth';
// import { useUser } from '../../contexts/UserContext';

function Form() {
  // const { setAuth } = useUser();
  const [inIndex, setInIndex] = useState();
  const [err, setErr] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/register') setInIndex(false);
    else setInIndex(true);
  }, [location]);
  const REGISTER_URL = '/auth/local/register';
  const LOGIN_URL = '/auth/local';
  const submitHandler = async (values) => {
    if (!inIndex) {
      try {
        const response = await axios.post(REGISTER_URL, {
          username: values.email.split('@')[0],
          email: values.email,
          password: values.password,
        });
        const { jwt } = await response.data;
        Cookies.set('myId', response.data.user.id);
        Cookies.set('token', jwt);
        Cookies.set('user', response.data.user.email);
        toastify(
          'success',
          'Giriş başarılı anasayfaya yönlendiriliyorsunuz!',
        );
        navigate('/');
      } catch (error) {
        if (error.response.status === 400) {
          toastify('error', 'Email zaten kullanılıyor');
        } else {
          toastify('error', 'Bir hata oluştu');
        }
      }
    } else {
      try {
        const token = Cookies.get('token');
        if (!token) {
          const response = await axios.post(LOGIN_URL, {
            identifier: values.email,
            password: values.password,
          });
          const { jwt } = await response.data;
          Cookies.set('myId', response.data.user.id);
          Cookies.set('token', jwt);
          Cookies.set('user', response.data.user.email);
          toastify(
            'success',
            'Giriş başarılı anasayfaya yönlendiriliyorsunuz!',
          );
        }

        navigate('/');
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 400) {
          toastify('error', 'Email ya da şifre yanlış');
        } else {
          toastify('error', 'Bir hata oluştu');
        }
      }
    }
  };

  useEffect(() => {
    if (checkAuth()) {
      navigate('/');
    }
  }, []);

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h1>{inIndex ? 'Giriş Yap' : 'Üye Ol'}</h1>
        <div className="form-header-desc">
          Fırsatlardan yararlanmak için
          {inIndex ? ' giriş yap' : ' üye ol'}
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
              toastify('error', 'Email alanı boş bırakılamaz');
              setErr(errors);
            } else if (!values.password) {
              errors.password = 'Password is required';
              toastify('error', 'Şifre alanı boş bırakılamaz');
              setErr(errors);
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
              toastify('error', 'Email adresi geçersiz');
              setErr(errors);
            } else if (values.password.length < 8) {
              errors.password = 'Password must be at least 8 characters';
              toastify('error', 'Şifre en az 8 karakter olmalı');
              setErr(errors);
            } else { submitHandler(values); }
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            // errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">
                  E-mail
                  <input
                    className={`${err.email ? 'error' : ''}`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email@example.com"
                    autoComplete={inIndex ? 'on' : 'off'}
                    value={values.email}
                    onChange={handleChange}

                  />
                  {inIndex && <DownArrow />}
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  Şifre
                  <input
                    className={`${err.password ? 'error' : ''}`}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="........"
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}

                  />
                </label>
              </div>
              <p className="forgotten-password">
                {inIndex && <a href="/login#">Şifremi Unuttum</a>}
              </p>
              <button type="submit" className="login-register-btn">
                {inIndex ? 'Giriş Yap' : 'Üye Ol'}
              </button>
              <div className="account-query">
                {inIndex ? (
                  <>
                    Hesabın yok mu?
                    <Link to="/register">
                      <span> Üye Ol</span>
                    </Link>
                  </>
                ) : (
                  <>
                    Hesabın var mı?
                    <Link to="/login">
                      <span> Giriş Yap</span>
                    </Link>
                  </>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Form;
