import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ onCloseRequest, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  });

  const handleKeyUp = e => {
    if (e.code === 'Escape') {
      onCloseRequest();
    }
  };

  const handleOutsideClick = e => {
    if (e.target === e.currentTarget) {
      onCloseRequest();
    }
  };

  return (
    <div className={s.overlay} onClick={handleOutsideClick}>
      <div className={s.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseRequest: PropTypes.func.isRequired,
};

export default Modal;
