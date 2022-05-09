import React from 'react';
import Cookies from 'js-cookie';
import { useProduct } from '../../contexts/ProductContext';

function GivenOffer() {
  const myID = Cookies.get('myId');
  const { product } = useProduct();
  const { offers, isOfferable } = product;

  let givenOffer;
  offers?.map((offer) => {
    if (offer.users_permissions_user === Number(myID)) {
      givenOffer = offer;
    }
    return null;
  });
  if (!givenOffer) {
    return null;
  }

  return (
    <div>
      {isOfferable

      && (
      <div className={`content-given-offer offer-${givenOffer.isStatus}`}>
        Verilen teklif:
        {'  '}
        <span className="given-price">
          {givenOffer.offerPrice}
          {' '}
        </span>
      </div>
      )}

    </div>
  );
}
export default GivenOffer;
