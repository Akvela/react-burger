import Card from '../card/card';
import galleryStyles from './gallery.module.css';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types';

const Gallery = ({ itemList, handleClick }) => {
  return (
    <ul className={`${galleryStyles.gallery} pl-4 pr-2`}>
      {itemList.map((item)=>(
        <Card key={item._id} card={item} onClick={handleClick} onIngredientClick={handleClick} />
      ))}
    </ul>
  )
}

Gallery.propTypes = {
  itemList: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Gallery;