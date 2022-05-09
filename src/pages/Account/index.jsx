import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProfilePicture from '../../constants/icons/ProfilePicture';
import OfferTabs from '../../components/AccountOfferTabs';
import OfferListItem from '../../components/AccountOfferList-Item';
import './account.scss';
import { useProduct } from '../../contexts/ProductContext';
import Loading from '../../components/Loading';

function Account() {
  const email = Cookies.get('user');
  const [selectedTab, setSelectedTab] = useState('receivedOffers');
  const {
    givenOffers, handleGivenOffers, receivedOffers, handleReceivedOffers, isLoading,
  } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    handleGivenOffers();
    handleReceivedOffers();
  }, []);

  let renderList;
  // let allReceivedOffers;
  // const listOfReceivedOffers = [];
  if (selectedTab === 'receivedOffers') {
    renderList = receivedOffers;
    // allReceivedOffers = receivedOffers.map((item) => item.offers.map((offer) => offer));
    // for (let i = 0; i < allReceivedOffers.length; i += 1) {
    //   for (let j = 0; j < allReceivedOffers[i].length; j += 1) {
    //     listOfReceivedOffers.push(allReceivedOffers[i][j]);
    //   }
    // }
  }

  if (selectedTab === 'givenOffers') {
    renderList = givenOffers;
  }
  return (
    <>
      <Navbar />
      <div className="account-container">
        <section>{isLoading && <Loading />}</section>
        <div className="account-wrapper">
          <div className="account-info">
            <div className="account-info-wrapper">

              <div className="profile-wrapper">
                <figure>
                  <ProfilePicture />
                </figure>
                <p>{email}</p>

              </div>
              <button
                type="button"
                className="btn-logout"
                onClick={() => {
                  Cookies.remove('user');
                  Cookies.remove('token');
                  Cookies.remove('myId');
                  navigate('/');
                }}
              >
                Çıkış Yap
              </button>
            </div>
          </div>
          <div className="account-content">
            <div className="account-content-wrapper">
              <OfferTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <div className="offer-list">
                {renderList
                && renderList.map((offer) => (
                  <OfferListItem
                    item={offer}
                    type={selectedTab}
                    key={offer.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
