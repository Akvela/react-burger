import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './card.module.css';
import PropTypes from 'prop-types';

const Card = ({ card }) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  }

  return (
    <article className={cardStyles.item} onClick={handleClick}>
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
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default Card;