import React from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay.jsx';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';

const modalContainer = document.querySelector('#react-modals');

export const Modal = ({onCloseClick, children, title}) => {
  const handleEscCloseModal = (evt) => {
    evt.key === 'Escape' && onCloseClick()
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscCloseModal)

    return () => {
      document.removeEventListener("keydown", handleEscCloseModal)
    }
  }, []);

  return createPortal(
    <>
      <div className={modalStyles.box}>
        <button className={modalStyles.button} onClick={onCloseClick}>
          <CloseIcon type="primary" />
        </button>
        {title && (<h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>)}
        {children}
      </div>
      <ModalOverlay onClick={onCloseClick} />
    </>,
    modalContainer
  )
}

Modal.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}