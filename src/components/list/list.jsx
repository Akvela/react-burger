import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import listStyles from './list.module.css';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types';

const List = ({ itemList }) => {
    return (
      <ul className={`${listStyles.gallery} pr-2`}>
        {itemList.map((card)=>(
          <li className={listStyles.item} key={card._id}>
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

List.propTypes = {
  itemList: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired
}

export default List;