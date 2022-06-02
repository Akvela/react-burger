import React from 'react';
import { Card } from '../card/card.jsx';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types';
import galleryStyles from './gallery.module.css';

export const Gallery = React.forwardRef((props, ref) => {
  return (
    <>
      <h2 ref={ref} className='text text_type_main-medium mb-6 mt-10'>{props.ingredientsType}</h2>
      <ul className={`${galleryStyles.gallery} pl-4 pr-2`}>
        {props.data && props.data.map((item)=>(
          <Card id={item._id} key={item._id} {...item} />
        ))}
      </ul>
    </>
  )
})

Gallery.propTypes = {
  ingredientsType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired
}