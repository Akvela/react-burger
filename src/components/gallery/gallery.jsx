import React from 'react';
import Card from '../card/card';
import galleryStyles from './gallery.module.css';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types';

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
  itemList: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired
}

export default Gallery;