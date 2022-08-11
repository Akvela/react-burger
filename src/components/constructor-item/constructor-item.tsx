import React, { FunctionComponent } from 'react';
import { useDispatch } from '../../services/types/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { reorderItems } from '../../services/actions/burger-constructor';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorItemStyles from './constructor-item.module.css';
import { TConstructorItem } from '../../services/types/data';

export const ConstructorItem: FunctionComponent<TConstructorItem> = (props) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const { id, index } = props;
  
  const [{ isDragging }, drag] = useDrag({
    type: 'filling',
    item: () => {
      return { id, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const opacity = isDragging ? 0.3 : 1;

  
  const [{ handlerId  }, drop] = useDrop({
    accept: 'filling',
    collect: (monitor: any) => {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch(reorderItems(dragIndex, hoverIndex));
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return (
    <li className={constructorItemStyles.item} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      {props.children}
    </li>
  )
}