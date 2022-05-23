import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import PropTypes from 'prop-types';

const modalContainer = document.querySelector('#react-modals');

const Modal = ({onCloseClick, children}) => {
  const handleEscCloseModal = (evt) => {
    evt.key === 'Escape' && onCloseClick()
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscCloseModal)

    return () => {
      document.removeEventListener("keydown", handleEscCloseModal)
    }
  }, [])

  return createPortal(
    <>
      <div className={modalStyles.box}>
        <button type="button" className={modalStyles.button}>
          <CloseIcon type="primary" onClick={onCloseClick} />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onCloseClick} />
    </>,
    modalContainer
  )
}

Modal.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default Modal;