import './offerTabs.scss';

import propTypes from 'prop-types';
import React from 'react';

function OfferTabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="offer-tabs-content-header">
      <div
        role="none"
        className={selectedTab === 'receivedOffers' ? 'tab selected' : 'tab'}
        onClick={() => setSelectedTab('receivedOffers')}
      >
        Teklif Aldıklarım
      </div>
      <div
        role="none"
        className={selectedTab === 'givenOffers' ? 'tab selected' : 'tab'}
        onClick={() => setSelectedTab('givenOffers')}
      >
        Teklif Verdiklerim
      </div>
    </div>
  );
}
OfferTabs.propTypes = {
  selectedTab: propTypes.string.isRequired,
  setSelectedTab: propTypes.func.isRequired,
};

export default OfferTabs;
