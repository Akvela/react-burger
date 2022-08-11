import { FunctionComponent, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../services/types/hooks';
import { Link, useLocation } from 'react-router-dom';
import { TIngredientCard } from '../../services/types/data';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './card.module.css';

export const Card: FunctionComponent<TIngredientCard> = ({ item }) => {
  const { bun, filling } = useSelector(store => store.burgerConstructor);
  const location = useLocation();

  const counter = useMemo(() => {
    if (item.type === 'bun') {
      return bun && item._id === bun._id ? 2 : 0;
    }
    return filling && filling.filter((fillingItem) => fillingItem._id === item._id).length;
  }, [bun, filling, item._id, item.type]);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { item },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  }, [bun, filling]);

  return (
    <Link className={cardStyles.link} to={{
      pathname: `/ingredients/${item._id}`,
      state: { background: location }
    }}>
      <li ref={dragRef} id={item.id} className={cardStyles.item} draggable>
        {counter > 0 && <Counter count={counter} size="default" />}
        <img src={`${item.image}`} alt={item.name} className='pl-4 pr-4' />
        <p className={`${cardStyles.price} text text_type_digits-default pt-1 pb-1`}>
          {item.price}
          <CurrencyIcon type='primary' />
        </p>
        <p className={`${cardStyles.name} text text_type_main-default`}>{item.name}</p>
      </li>
    </Link>
  )
}