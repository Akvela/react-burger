import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import List from '../list/list';
import burgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ ingredients }) => {
  const ingredientsArray = ingredients.filter(element => element.type !== 'bun')

  return(
    <div className='pt-1'>
      <div className={burgerConstructorStyles.item}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
          className='background-color: #1C1C21'
        />
      </div>
      <div className={burgerConstructorStyles.block}>
        <div className={burgerConstructorStyles.gallery}>
          <List itemList={ingredientsArray} />
        </div>
      </div>
      <div className={burgerConstructorStyles.item}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
        />
      </div>
      <div className={`${burgerConstructorStyles.info} pt-10 pr-4`}>
          <h2 className="text text_type_digits-medium">610</h2><div className={burgerConstructorStyles.coins}></div>
          <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;