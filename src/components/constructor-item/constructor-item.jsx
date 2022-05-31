import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { REORDER_ITEMS } from '../../services/actions/burger-constructor';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import constructorItemStyles from './constructor-item.module.css';

export const ConstructorItem = (props) => {
  const { elements } = useSelector(store => store.burgerConstructor);
  const ref = React.useRef();
  const dispatch = useDispatch();
  const { id, index } = props;
  
  const [{ opacity }, drag] = useDrag({
    type: 'element',
    item: { id, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  function moveItem(dragIndex, hoverIndex) {
    let newItems = [...elements];
    let dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    dispatch({ type: REORDER_ITEMS, data: newItems });
  };

  const [, drop] = useDrop({
    accept: 'element',
    hover(item) {
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

ConstructorItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}