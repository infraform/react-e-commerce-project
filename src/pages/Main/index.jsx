import React from 'react';
import './Main.scss';
import MainBanner from '../../components/MainBanner/MainBanner';
import Navbar from '../../components/Navbar';
import Categories from '../../components/Categories/Categories';
import Products from '../../components/Products';
import Loading from '../../components/Loading';
import { useProduct } from '../../contexts/ProductContext';

function Main() {
  const { isLoading } = useProduct();
  return (
    <>
      <Navbar />
      <main className="main-section">
        <section>{isLoading && <Loading />}</section>
        <section className="main-container">
          <figure className="main-banner">
            <MainBanner />
          </figure>
          <Categories />
          <Products />
        </section>
      </main>

    </>
  );
}

export default Main;
