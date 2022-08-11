import React, { FunctionComponent } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModal } from '../../services/types/data';
import modalStyles from './modal.module.css';

const modalContainer = document.querySelector('#react-modals');

export const Modal: FunctionComponent<TModal> = (props) => {
  function handleEscCloseModal(evt: KeyboardEvent) {
    evt.key === 'Escape' && props.onCloseClick()
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscCloseModal)

    return () => {
      document.removeEventListener('keydown', handleEscCloseModal)
    }
  }, [props.onCloseClick]);
  
  return createPortal(
    <>
      <div className={modalStyles.box}>
        <button className={modalStyles.button} onClick={props.onCloseClick}>
          <CloseIcon type="primary" />
        </button>
        {props.title && (<h2 className={`${modalStyles.title} text text_type_main-large`}>{props.title}</h2>)}
        {props.children}
      </div>
      <ModalOverlay onClick={props.onCloseClick} />
    </>,
    modalContainer!
  )
}