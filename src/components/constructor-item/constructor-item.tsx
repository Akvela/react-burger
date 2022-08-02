import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { REORDER_ITEMS } from '../../services/actions/burger-constructor';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import constructorItemStyles from './constructor-item.module.css';
import { TConstructorItem, TIngredient } from '../../services/types/data';

export const ConstructorItem: FunctionComponent<TConstructorItem> = (props) => {
  const { elements } = useSelector(store => store.burgerConstructor);
  const ref = React.useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const { id, index } = props;
  
  const [{ opacity }, drag] = useDrag({
    type: 'element',
    item: { id, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  function moveItem(dragIndex: number, hoverIndex: number) {
    let newItems = [...elements];
    let dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    dispatch({ type: REORDER_ITEMS, data: newItems });
  };

  const [, drop] = useDrop({
    accept: 'element',
    hover(item: TIngredient) {
      if (item.index === index) {
        return;
      }
      if (!ref.current) {
        return;
      }
      moveItem(item.index, index);
      item.index = index
    }
  });

  drag(drop(ref));

  return (
    <li className={constructorItemStyles.item} ref={ref} index={index} style={{ opacity }}>
      <DragIcon type="primary" />
      {props.children}
    </li>
  )
}