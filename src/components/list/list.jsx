import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import listStyles from './list.module.css';
import PropTypes from 'prop-types';

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
  itemList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main','sauce']).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default List;