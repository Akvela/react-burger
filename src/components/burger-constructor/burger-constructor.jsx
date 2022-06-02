import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorItem } from '../constructor-item/constructor-item.jsx';
import { ADD_BUN, ADD_ITEM, RESET_CONSTRUCTOR, DELETE_ITEM } from '../../services/actions/burger-constructor.js';
import { INCREASE_COUNT, DECREASE_COUNT, RESET_COUNT } from '../../services/actions/burger-ingredients.js';
import { OPEN_MODAL_ORDER, CLOSE_MODAL_ORDER } from '../../services/actions/order-details.js';
import { calculateSum } from '../../utils/sum.js';
import { OrderDetails } from '../order-details/order-details.jsx';
import { Modal } from '../modal/modal.jsx';
import { getUserOrderNumber } from '../../services/actions/order-details.js';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';


export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { orderIsClicked, orderSuccessed } = useSelector(store => store.orderDetails);
  const ingredients = useSelector(store => store.burgerIngredients.ingredients);
  const { elements, bun } = useSelector(store => store.burgerConstructor);

  const totalPrice = calculateSum(elements, bun);

  const openModalOrder = React.useCallback(() => {
    const arrId = elements.map((ingredient) => ingredient._id);
    dispatch({ type: OPEN_MODAL_ORDER });
    dispatch(getUserOrderNumber([...arrId, bun._id]));
  }, [dispatch, elements, bun._id]);
  

  const closeModalOrder = React.useCallback(() => {
    dispatch({ type: CLOSE_MODAL_ORDER });
    dispatch({ type: RESET_CONSTRUCTOR });
    dispatch({ type: RESET_COUNT })
  }, [dispatch]);

  function setUniqueId() {
    return Date.now() * Math.random()
  };

  const deleteItem = React.useCallback((itemKey, itemId) => {
    dispatch({ type: DELETE_ITEM, id: itemKey });
    dispatch({ type: DECREASE_COUNT, id: itemId });
  }, [dispatch]);

  const [{ isDrag }, dropTarget] = useDrop({
    accept: 'item',
    collect: monitor => ({
      isDrag: monitor.canDrop()
    }),
    drop(itemId) {
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
        {bun && Array.of(bun).map((item, index) => (
          <ConstructorElement 
            key={index}
            type="top" 
            isLocked={true} 
            text={`${item.name} (верх)`} 
            price={item.price} 
            thumbnail={item.image_mobile} />
        ))}
      </div>
      {!bun && <p className='text text_type_digits-default text_color_inactive ml-10 pt-8 pl-10'>Перетащите булку и ингредиенты</p>}
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
        {bun && Array.of(bun).map((item, index) => (
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
      <div className={`${burgerConstructorStyles.info} pt-10 pr-4`}>
        <h2 className="text text_type_digits-medium">
          {totalPrice}
        </h2>
        <div className={burgerConstructorStyles.coins}></div>
        <Button type="primary" size="large" disabled={(bun.length===0) || (elements.length===0)} onClick={() => openModalOrder()}>Оформить заказ</Button>
      </div>
      {orderIsClicked && orderSuccessed && (
        <Modal onCloseClick={closeModalOrder}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}
