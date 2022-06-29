import PropTypes from 'prop-types';
import ingredientStyles from './ingredient.module.css';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';

export function Ingredient({title}) {
  return (
    <div className={ingredientStyles.item}>
      <IngredientDetails title='Детали ингредиента'/>
    </div>
  )
}

Ingredient.propTypes = {
  title: PropTypes.string,
};