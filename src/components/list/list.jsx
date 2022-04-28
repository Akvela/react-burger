import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import listStyles from './list.module.css';

const List = ({ itemList }) => {
    return (
      <ul className={`${listStyles.gallery} pr-2`}>
        {itemList.map((card, index)=>(
          <li className={listStyles.item} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={card.name}
              price={card.price}
              thumbnail={card.image}
            />
          </li>
          ))}
      </ul>
    )
}

export default List;