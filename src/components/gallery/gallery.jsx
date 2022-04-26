import React from 'react';
import Card from '../card/card';
import galleryStyles from './gallery.module.css';

const Gallery = ({ itemList }) => {
  return (
    <ul className={`${galleryStyles.gallery} pl-4 pr-2`}>
      {itemList.map((item, index)=>(
        <li key={index} className={galleryStyles.item}>
          <Card card={item} />
        </li>
        )
      )}
    </ul>
  )
}

export default Gallery;