import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CLICK_ON_INGREDIENT } from "../../services/actions/ingredient-details";
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types.js';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './card.module.css';

export const Card = (props) => {
  const { id } = props;
  const { bun, elements } = useSelector(store => store.burgerConstructor);
  const ingredients = useSelector(store => store.burgerIngredients.ingredients);
  const dispatch = useDispatch();
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'item',
    item: { id }
  });

  function selectIngredient(evt, data) {
    return data.filter(item => {
      return item._id === evt.currentTarget.id
    })
  };

  return (
    <Link className={cardStyles.link} to={{
      pathname: `/ingredients/${props.id}`,
      state: { background: location }
    }}>
      <li ref={dragRef} id={props.id} className={cardStyles.item} onClick={(evt) => { dispatch({ type: CLICK_ON_INGREDIENT, item: selectIngredient(evt, ingredients) }) }}>
        {!!props.count && !!(elements.length > 0) &&
          <Counter count={props.count} size="default" />}
        {!!bun.count && props.type === 'bun' && bun._id  === id && !!bun &&
          <Counter count={bun.count} size="default" />}
        <img src={`${props.image}`} alt={props.name} className='pl-4 pr-4' />
        <p className={`${cardStyles.price} text text_type_digits-default pt-1 pb-1`}>
          {props.price}
          <CurrencyIcon type='primary' />
        </p>
        <p className={`${cardStyles.name} text text_type_main-default`}>{props.name}</p>
      </li>
    </Link>
  )
}

Card.propTypes = ingridientDataTypes.isRequired.isRequired