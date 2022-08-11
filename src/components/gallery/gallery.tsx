import React from 'react';
import { Card } from '../card/card';
import { TGallery } from '../../services/types/data';
import galleryStyles from './gallery.module.css';

export const Gallery = React.forwardRef<HTMLHeadingElement, TGallery>((props, ref) => {
  return (
    <>
      <h2 ref={ref} className='text text_type_main-medium mb-6 mt-10'>{props.ingredientsType}</h2>
      <ul className={`${galleryStyles.gallery} pl-4 pr-2`}>
        {props.data && props.data.map((item)=>(
          <Card item={item} key={item._id}/>
        ))}
      </ul>
    </>
  )
})
