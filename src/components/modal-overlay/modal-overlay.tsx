import modalOverlayStyles from './modal-overlay.module.css';
import { FunctionComponent } from 'react';
import { TModalOverlay } from '../../services/types/data';

export const ModalOverlay: FunctionComponent<TModalOverlay> = ({ onClick }) => {
  return(
    <div className={modalOverlayStyles.container} onClick={onClick} />
  )
}
