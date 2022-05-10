import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClick }) => {
  return(
  <div className={modalOverlayStyles.container} onClick={onClick} />
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;