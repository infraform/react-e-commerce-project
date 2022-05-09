import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import toastify from '../../helper funcs/toastify';
// import Cookies from 'js-cookie';
import './confirm-modal.scss';

function ConfirmModal({ displayModal, closeModal, callback }) {
  // const myID = Cookies.get('myId');
  useEffect(() => {
    const closeEscapeKey = (e) => {
      if (displayModal) {
        if (e.keyCode === 27) {
          closeModal();
        }
      }
    };
    document.addEventListener('keydown', closeEscapeKey);
    return () => {
      document.removeEventListener('keydown', closeEscapeKey);
    };
  }, [displayModal, closeModal]);

  return ReactDOM.createPortal(
    <div className={displayModal ? 'confirm-modal' : 'off-confirm-modal'}>
      <div className="confirm-modal-info">
        <div className="confirm-modal-info-title" id="confirm-modal-title">
          <h2>Satın Al</h2>
        </div>
        <div className="confirm-modal-info-body">
          <p>Satın almak istiyor musunuz?</p>
        </div>
        <div className="confirm-modal-info-footer">
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              closeModal();
            }}
          >
            Vazgeç
          </button>
          <button
            type="button"
            className="btn confirm"
            onClick={() => {
              callback();
              closeModal();
              toastify('success', 'Satın alındı');
            }}
          >
            Satın Al
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('root'),
  );
}

ConfirmModal.propTypes = {
  showModal: propTypes.bool,
  closeModal: propTypes.func,
  callback: propTypes.func,
};

export default ConfirmModal;
