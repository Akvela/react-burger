import React from 'react';
import Card from '../card/card';
import galleryStyles from './gallery.module.css';
import PropTypes from 'prop-types';

const Gallery = ({ itemList }) => {
  return (
    <ul className={`${galleryStyles.gallery} pl-4 pr-2`}>
      {itemList.map((item)=>(
        <li key={item._id} className={galleryStyles.item}>
          <Card card={item} />
        </li>
        )
      )}
    </ul>
  )
}

Gallery.propTypes = {
  itemList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main','sauce']).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default Gallery;