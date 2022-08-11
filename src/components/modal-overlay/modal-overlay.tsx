import React from 'react';
import { TModalOverlay } from '../../services/types/data';
import modalOverlayStyles from './modal-overlay.module.css';

export const ModalOverlay = React.forwardRef<HTMLDivElement, TModalOverlay>((props, ref) => {
  return(
    <div ref={ref} className={modalOverlayStyles.container} onClick={props.onClick} />
  )
})
