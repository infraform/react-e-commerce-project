import React, { useState } from 'react';
import propTypes from 'prop-types';
// import Cookies from 'js-cookie';
import sendOffer from '../../api/sendOffer';
import ConfirmModal from '../ConfirmModal';
import { useProduct } from '../../contexts/ProductContext';
// import axios from '../../api/axios';

function OfferListInfo({ type, item }) {
  const [displayModal, setDisplayModal] = useState(false);
  const { handleReceivedOffers, handleGivenOffers, setIsLoading } = useProduct();

  const givenOffered = () => (
    <p className="text-offered">Satıcıdan bilgi bekleniyor</p>
  );

  const handlePurchase = async (ite) => {
    await sendOffer.put(`/products/${ite?.product?.id}`, {
      isSold: true,
      isOfferable: false,
    });

    handleGivenOffers();
    handleReceivedOffers();
  };
  const givenAccepted = () => (
    <>
      <button
        type="button"
        className="btn-accept"
        onClick={() => {
          setDisplayModal(true);
        }}
      >
        Satın Al
      </button>
      <p className="text-confirm">Onaylandı</p>
      <ConfirmModal
        displayModal={displayModal}
        closeModal={() => setDisplayModal(false)}
        callback={() => handlePurchase(item)}
      />
    </>
  );

  const givenRejected = () => <p className="text-rejected">Reddedildi</p>;
  const givenPurchased = () => <p className="text-purchased">Satın alındı</p>;
  const givenSoldOut = () => <p className="text-soldout">Ürün satıldı</p>;

  const putAcceptOffer = async (highOffer) => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        await sendOffer.put(`/offers/${highOffer.id}`, {
          isStatus: true,
        }).then(await sendOffer.put(`/products/${highOffer.product}`, {
          isOfferable: false,
        }));
        handleReceivedOffers();
        handleGivenOffers();
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

  const postRejectOffer = async (highOffer) => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        await sendOffer.put(`/offers/${highOffer.id}`, {
          isStatus: false,
        });
        handleReceivedOffers();
        handleGivenOffers();
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
  const receivedOffered = () => (
    <>
      <button
        type="button"
        className="btn-accept"
        onClick={() => {
          putAcceptOffer(item.offers.sort((a, b) => b.offerPrice - a.offerPrice)[0]);
        }}
      >
        Onayla
      </button>
      <button
        type="button"
        className="btn-reject"
        onClick={() => {
          postRejectOffer(item.offers.sort((a, b) => b.offerPrice - a.offerPrice)[0]);
        }}
      >
        Reddet
      </button>
    </>
  );

  const receivedRejected = () => <p className="text-rejected">Reddedildi</p>;
  const receivedAccepted = () => <p className="text-confirm">Onayladın.</p>;
  const receivedPurchased = () => <p className="text-purchased">Satıldı</p>;

  switch (type) {
    case 'givenOffers':
      switch (item?.isStatus === true) {
        case true:
          if (item?.product?.isSold === true) {
            return givenPurchased();
          }
          return givenAccepted();
        case false:
          if (item?.product?.isSold === true) {
            return givenSoldOut();
          }
          if (item?.isStatus === false) {
            return givenRejected();
          }
          return givenOffered();
        default:
          return givenRejected();
      }

    case 'receivedOffers':
      if (item.isSold) {
        return receivedPurchased();
      }

      switch (item.offers.sort((a, b) => b.offerPrice - a.offerPrice)[0]?.isStatus === null) {
        case true:
          return receivedOffered();
        case false:
          if (item.offers.sort((a, b) => b.offerPrice - a.offerPrice)[0]?.isStatus === false) {
            return receivedRejected();
          }
          if (item.offers.sort((a, b) => b.offerPrice - a.offerPrice)[0]?.isStatus === true) {
            return receivedAccepted();
          }
          return <p className="text-rejected">Henüz teklif yok</p>;
        default:
          return null;
      }
    default:
      return null;
  }
}

OfferListInfo.propTypes = {
  type: propTypes.string.isRequired,
  item: propTypes.shape().isRequired,
};

export default OfferListInfo;
