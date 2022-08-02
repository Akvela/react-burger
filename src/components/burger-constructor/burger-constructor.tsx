import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { useDrop } from 'react-dnd';
import { getCookie } from '../../utils/cookie';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { useHistory } from 'react-router-dom';
import { setUniqueId } from '../../utils/utils';
import { ADD_BUN, ADD_ITEM, RESET_CONSTRUCTOR, DELETE_ITEM } from '../../services/actions/burger-constructor';
import { INCREASE_COUNT, DECREASE_COUNT, RESET_COUNT } from '../../services/actions/burger-ingredients';
import { CLOSE_MODAL_ORDER } from '../../services/actions/order-details';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { getUserOrderNumber } from '../../services/actions/order-details';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loading } from '../loading/loading';
import burgerConstructorStyles from './burger-constructor.module.css';
import { TIngredient } from '../../services/types/data';


export const BurgerConstructor: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderIsClicked, orderRequest, orderNumber } = useSelector(store => store.orderDetails);
  const { ingredients } = useSelector(store => store.burgerIngredients);
  const { elements, bun } = useSelector(store => store.burgerConstructor);
  const  burgerConstructor = useSelector(store => store.burgerConstructor);
  const { userName } = useSelector(store => store.user);
  const accessToken = getCookie('accessToken');

  const totalPrice: number = React.useMemo(() => {
    return (
      (burgerConstructor.bun ? burgerConstructor.bun.price * 2 : 0) + burgerConstructor.elements.reduce((s, v) => s + v.price, 0)
      )
  }, [burgerConstructor])

  const postOrder = () => {
    const arrId = elements.map(ingredient => ingredient._id )
    userName && dispatch(getUserOrderNumber({ accessToken: `Bearer ${accessToken}`, order: [...arrId, bun._id] }));
    !userName && history.replace({ pathname: '/login', state: { from: { pathname: '/' }} })
  }

  const closeModalOrder = () => {
    dispatch({ type: CLOSE_MODAL_ORDER });
    dispatch({ type: RESET_CONSTRUCTOR });
    dispatch({ type: RESET_COUNT })
  };

  const deleteItem = React.useCallback((itemKey: number, itemId: string) => {
    dispatch({ type: DELETE_ITEM, id: itemKey });
    dispatch({ type: DECREASE_COUNT, id: itemId });
  }, [dispatch]);

  const [{ isDrag }, dropTarget] = useDrop({
    accept: 'item',
    collect: monitor => ({
      isDrag: monitor.canDrop()
    }),
    drop(itemId: { id: string }) {
      dispatch({
        type: ADD_ITEM, 
        data: ingredients.filter(item => {
          return item._id === itemId.id && item.type !== 'bun'
        }).map((item) => { return { ...item, uniqueId: setUniqueId() } })
      })
      dispatch({
        type: ADD_BUN, 
        bunItem: ingredients.find(item => {
          return item._id === itemId.id && item.type === 'bun'
        })
      })
      dispatch({ type: INCREASE_COUNT, id: itemId.id })
    }
  });
  
  return(
    elements && <div className={`${burgerConstructorStyles.constructor} pt-1`} ref={dropTarget}>
      <div className={burgerConstructorStyles.item}> 
        {bun && bun._id && Array.of(bun).map((item, index) => (
          <ConstructorElement 
            key={index}
            type="top" 
            isLocked={true} 
            text={`${item.name} (верх)`} 
            price={item.price} 
            thumbnail={item.image_mobile} />
        ))}
      </div>
      <ul className={burgerConstructorStyles.block}>
        {elements.filter(item => { return item.type !== 'bun' }).map((item, index)=>(
          <ConstructorItem id={item.uniqueId} index={index} key={item.uniqueId} >
            <ConstructorElement 
              id={item.uniqueId}
              text={item.name} 
              price={item.price} 
              thumbnail={item.image_mobile}
              handleClose={() => deleteItem(item.uniqueId, item._id)}
            />
          </ConstructorItem>
        ))}
      </ul>
      <div className={burgerConstructorStyles.item}>
        {bun && bun._id && Array.of(bun).map((item, index) => (
          <ConstructorElement 
            key={index}
            type="bottom" 
            isLocked={true} 
            text={`${item.name} (низ)`} 
            price={item.price} 
            thumbnail={item.image_mobile} 
          />
        ))}
      </div>
      
      {elements.length === 0 && (<div className={burgerConstructorStyles.box}>
        <p className={burgerConstructorStyles.text}>Выбери булку и начинку</p>
        {isDrag && <p className={burgerConstructorStyles.border}>Тяни сюда</p>}
      </div>)}

      <div className={`${burgerConstructorStyles.info} pt-10 pr-4`}>
        <h2 className="text text_type_digits-medium">
          {totalPrice}
        </h2>
        <div className={burgerConstructorStyles.coins}></div>
        <Button type="primary" size="large" disabled={(bun === {}) || (elements.length===0)} onClick={() => postOrder()}>Оформить заказ</Button>
      </div>

      {orderRequest && orderIsClicked && (
        <Modal onCloseClick={closeModalOrder}>
          <Loading />
        </Modal>
      )}

      {orderNumber && (
        <Modal onCloseClick={closeModalOrder}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}
