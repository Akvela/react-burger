import React, {FunctionComponent} from 'react';
import { useSelector } from '../../services/types/hooks';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { TIngredientDetails, TIngredient } from '../../services/types/data';

export const IngredientDetails: FunctionComponent<TIngredientDetails> = ({ title }) => {
  const { ingredients } = useSelector(store => store.burgerIngredients);
  const { id } = useParams();
  const selectedIngredient: TIngredient = ingredients?.find(ingredient => ingredient._id === id)

  return(
    <>
      {selectedIngredient && (
        <div className={ingredientDetailsStyles.item}>
          {title && (<h2 className={`${ingredientDetailsStyles.title} text text_type_main-large`}>{title}</h2>)}
          <img src={`${selectedIngredient.image_large}`} alt={selectedIngredient.name} className={`${ingredientDetailsStyles.image} pl-4 pr-4`} />
          <p className='text text_type_main-medium pt-4'>{selectedIngredient.name}</p>
          <ul className={`${ingredientDetailsStyles.nutrition} pt-8`}>
            <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
              <span className='text_type_main-default'>Калории,ккал</span>
              {selectedIngredient.calories}
            </li>
            <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
              <span className='text_type_main-default'>Белки, г</span>
              {selectedIngredient.proteins}
            </li>
            <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
              <span className='text_type_main-default'>Жиры, г</span>
              {selectedIngredient.fat}
            </li>
            <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
              <span className='text_type_main-default'>Углеводы, г</span>
              {selectedIngredient.carbohydrates}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

IngredientDetails.propTypes = {
  title: PropTypes.string,
};