import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './card.module.css';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types';

const Card = ({ card }) => {
  const [count, setCount] = React.useState(0);

  return (
    <article className={cardStyles.item}>
      {(count !== 0) &&
        <Counter count={count} size="default" />}
      <img src={`${card.image}`} alt={card.name} className='pl-4 pr-4' />
      <p className={`${cardStyles.price} text text_type_digits-default pt-1 pb-1`}>
        {card.price}
        <CurrencyIcon type='primary' />
      </p>
      <p className={`${cardStyles.name} text text_type_main-default`}>{card.name}</p>
    </article>
  )
}

Card.propTypes = {
  card: ingridientDataTypes.isRequired
}

export default Card;