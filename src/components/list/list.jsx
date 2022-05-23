import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import listStyles from './list.module.css';
import { IngredientsContext } from '../../services/ingredients-context';
import React from 'react';

const List = () => {
  const constructorContext = React.useContext(IngredientsContext);
  const ingredients = constructorContext.selectedIngredients.filter(element => element.type !== 'bun');

    return (
      <ul className={`${listStyles.gallery} pr-2`}>
        {ingredients.map((card)=>(
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


export default List;