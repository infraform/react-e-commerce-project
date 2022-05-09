import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import sendOffer from '../../api/sendOffer';
import ConfirmModal from '../../components/ConfirmModal';
import GivenOffer from '../../components/GivenOffer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import OfferModal from '../../components/OfferModal';
import ProductDetailButtons from '../../components/ProductDetailButtons';
import UndefinedProduct from '../../constants/images/undefinedProduct.webp';
import { useProduct } from '../../contexts/ProductContext';
import './product-detail.scss';

function ProductDetail() {
  const location = window.location.pathname;
  const productId = location.split('/')[2];
  const {
    product, setProduct, products, setProducts, setIsLoading, isLoading,
  } = useProduct();
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [displayOfferModal, setDisplayOfferModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const getProduct = async () => {
      const response = await axios.get(`/products/${productId}`);
      setProduct(response.data);
    };
    if (isMounted) {
      getProduct();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePurchase = async () => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        await sendOffer.put(`/products/${product.id}`, {
          isSold: true,
          isOfferable: false,
          // users_permissions_user: myID,
        });
        setProduct({ ...product, isSold: true, isOfferable: false });
        setProducts([...products, product]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  };

  const {
    image, name, brand, color, status, price, description,
  } = product;
  return (
    <div>
      {product?.id && (
      <div>
        <Navbar />
        <main className="product-detail-container">
          <section>{isLoading && <Loading />}</section>
          <div className="product-detail-wrapper">
            <div className="product-detail">
              <figure className="product-detail-img">
                <img src={product?.image === 'null' || !image?.formats?.small ? UndefinedProduct : `https://bootcamp.akbolat.net${image?.formats?.small?.url}`} alt="product-img" />
              </figure>
              <div className="product-detail-content">
                <div className="content-title">{name}</div>
                <div className="content-info">
                  <p className="content-info-brand">
                    <span className="strong">Marka:</span>
                    {brand}

                  </p>
                  <p className="content-info-color">
                    <span className="strong">Renk:</span>
                    {color}
                  </p>
                  <p className="content-info-status">
                    <span className="strong">Kullanım Durumu:</span>
                    {status}
                  </p>
                </div>
                <div className="content-price">
                  {price}
                  {' '}
                  TL
                  <GivenOffer product={product} />
                </div>
                <ProductDetailButtons
                  setConfirmModal={setDisplayConfirmModal}
                  setOfferModal={setDisplayOfferModal}
                />
                <div className="content-desc">
                  <p className="strong">Açıklama</p>
                  <p className="content-desc-text">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ConfirmModal
          displayModal={displayConfirmModal}
          closeModal={() => setDisplayConfirmModal(false)}
          callback={handlePurchase}
        />
        <OfferModal
          displayModal={displayOfferModal}
          closeModal={() => setDisplayOfferModal(false)}
        />

      </div>
      )}
    </div>
  );
}

export default ProductDetail;
