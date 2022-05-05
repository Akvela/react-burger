import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingridientDataTypes } from '../../utils/types';

const IngredientDetails = ({ ingredient }) => {
  return(
    <div className={ingredientDetailsStyles.item}>
      <h2 className={`${ingredientDetailsStyles.title} text text_type_main-large pl-10`}>Детали ингредиента</h2>
      <img src={`${ingredient.image_large}`} alt={ingredient.name} className={`${ingredientDetailsStyles.image} pl-4 pr-4`} />
      <p className='text text_type_main-medium pt-4'>{ingredient.name}</p>
      <ul className={`${ingredientDetailsStyles.nutrition} pt-8`}>
        <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
          <span className='text_type_main-default'>Калории,ккал</span>
          {ingredient.calories}
        </li>
        <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
          <span className='text_type_main-default'>Белки, г</span>
          {ingredient.proteins}
        </li>
        <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
          <span className='text_type_main-default'>Жиры, г</span>
          {ingredient.fat}
        </li>
        <li className={`${ingredientDetailsStyles.unit} text text_type_digits-default text_color_inactive`}>
          <span className='text_type_main-default'>Углеводы, г</span>
          {ingredient.carbohydrates}
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingridientDataTypes.isRequired
}

export default IngredientDetails;