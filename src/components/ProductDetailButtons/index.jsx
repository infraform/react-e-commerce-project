import React from 'react';
import propTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useProduct } from '../../contexts/ProductContext';
import sendOffer from '../../api/sendOffer';
import axios from '../../api/axios';

function ProductDetailButtons({ setOfferModal, setConfirmModal }) {
  const { product, setProduct } = useProduct();
  const myID = Cookies.get('myId');
  const { offers } = product;
  let givenOffer;
  offers?.map((offer) => {
    if (offer.users_permissions_user === Number(myID)) {
      givenOffer = offer;
    }
    return null;
  });
  const { id } = product.users_permissions_user;

  if (id === Number(myID) && product?.isSold) {
    return (
      <div className="content-btn-area">
        <button type="submit" className="btn sold">Ürününüz Satıldı</button>
      </div>
    );
  }

  if (id === Number(myID)) {
    return (
      <div className="content-btn-area">
        <button type="submit" className="btn sold">Bu Ürün Size Ait Teklif Veremezsiniz</button>
      </div>
    );
  }

  const handleDelete = async () => {
    await sendOffer.delete(`/offers/${givenOffer.id}`);
    const response = await axios(`/products/${product.id}`);
    setProduct(response.data);
  };
  if (product?.isSold) {
    return (
      <div className="content-btn-area">
        <button type="submit" className="btn sold">Bu Ürün Satışta Değil</button>
      </div>
    );
  }

  return (
    <div className="content-btn-area">
      <button type="submit" className="btn buy" onClick={() => setConfirmModal(true)}>Satın Al</button>

      {!product?.isOfferable && (
      <button type="submit" className="btn offer btn-disabled">Bu Ürüne Teklif Verilemez</button>
      )}

      {product?.isOfferable && givenOffer && (
      <button type="submit" className="btn offer" onClick={() => handleDelete()}>Teklifi Geri Çek</button>
      )}

      {product?.isOfferable && !givenOffer && (
      <button type="submit" className="btn offer" onClick={() => setOfferModal(true)}>Teklif Yap</button>
      )}

    </div>

  );
}

ProductDetailButtons.propTypes = {
  setOfferModal: propTypes.func.isRequired,
  setConfirmModal: propTypes.func.isRequired,
};

export default ProductDetailButtons;
