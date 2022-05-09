import React from 'react';
import propTypes from 'prop-types';
import OfferListInfo from '../AccountOfferInfo';
import UndefinedProduct from '../../constants/images/undefinedProduct.webp';
import './offerList-Item.scss';
import { useProduct } from '../../contexts/ProductContext';

function OfferListItem({ item, type }) {
  const { moreClick } = useProduct();
  if (type === 'receivedOffers') {
    return (
      <div className="offer__item">
        <div className="offer__item-wrapper">
          <div className="offer__item-content">
            <div className="offer__item-content-img" role="none" onClick={() => moreClick(item)}>
              <img src={item?.image === 'null' ? UndefinedProduct : `https://bootcamp.akbolat.net${item?.image?.formats?.thumbnail?.url}`} alt="product-img" />
            </div>
            <div className="offer__item-content-body">
              <div className="offer__item-content-detail">
                <p className="product-title">{item.name}</p>

                {item?.offers?.length > 0
                    && (
                    <p className="product-offer">
                      {type === 'receivedOffers'
                        ? 'Alınan Teklif: '
                        : 'Verilen Teklif: '}
                      <span className="offer-price">
                        {item?.offers?.sort((a, b) => b.offerPrice - a.offerPrice)[0]?.offerPrice}
                        {' '}
                        TL
                      </span>
                    </p>
                    )}

              </div>
              <div className="offer__item-wrapper-btn-group">
                <OfferListInfo type={type} item={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="offer__item">
      <div className="offer__item-wrapper">
        <div className="offer__item-content">
          <div className="offer__item-content-img" role="none" onClick={() => moreClick(item?.product)}>
            <img src={item?.product?.image === null ? UndefinedProduct : `https://bootcamp.akbolat.net${item?.product?.image?.formats?.thumbnail?.url}`} alt="product-img" />
          </div>
          <div className="offer__item-content-body">
            <div className="offer__item-content-detail">
              <p className="product-title">{item?.product?.name}</p>
              <p className="product-offer">
                {type === 'receivedOffers'
                  ? 'Alınan Teklif: '
                  : 'Verilen Teklif: '}
                <span className="offer-price">
                  {item.offerPrice}
                  {' '}
                  TL
                </span>
              </p>
            </div>
            <div className="offer__item-wrapper-btn-group">
              <OfferListInfo type={type} item={item} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
OfferListItem.propTypes = {
  item: propTypes.shape().isRequired,
  type: propTypes.string.isRequired,
};

export default OfferListItem;
