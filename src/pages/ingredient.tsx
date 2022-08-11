import { FunctionComponent } from 'react';
import ingredientStyles from './ingredient.module.css';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { TIngredientPage } from '../services/types/data';

export const Ingredient: FunctionComponent<TIngredientPage> = ({title}) => {
  return (
    <div className={ingredientStyles.item}>
      <IngredientDetails title='Детали ингредиента'/>
    </div>
  )
}
