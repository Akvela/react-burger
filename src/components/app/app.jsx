import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './app.module.css';

const App = () => {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
        <BurgerIngredients />
      </main>
    </div>
  )
}

export default App;