import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import useWindowSize from '../../hooks/useWindowSize';
import Logo from '../../constants/icons/Logo';
import Form from '../../components/Form';
import LoginBanner from '../../components/LoginBanner/LoginBanner';
import { useProduct } from '../../contexts/ProductContext';
import Loading from '../../components/Loading';

function Login() {
  const [width] = useWindowSize();
  const { isLoading } = useProduct();
  return (
    <main className="login-register-main">
      <section>{isLoading && <Loading />}</section>
      <figure className="login-register-banner" width={width * 0.434}>
        <LoginBanner />
      </figure>
      <section className="login-register-area">
        <div className="login-register-logo">
          <Link to="/">
            <Logo size={width < 768 && 144} />
          </Link>
        </div>

        <Form />
      </section>
    </main>
  );
}

export default Login;
