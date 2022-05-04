import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

const modalContainer = document.querySelector('#react-modals');

const Modal = ({onCloseEsc, onCloseClick, children}) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onCloseEsc)

    return () => {
      document.removeEventListener("keydown", onCloseEsc)
    }
  }, [])

  return React.createPortal(
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


export default Modal;