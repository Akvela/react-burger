import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { useDrop } from 'react-dnd';
import { getCookie } from '../../utils/cookie';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { useHistory } from 'react-router-dom';
import { addItem, resetConstructor, removeItem } from '../../services/actions/burger-constructor';
import { closeOrderModal } from '../../services/actions/order-details';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { getUserOrderNumber } from '../../services/actions/order-details';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loading } from '../loading/loading';
import { TIngredient } from '../../services/types/data';
import burgerConstructorStyles from './burger-constructor.module.css';

export const BurgerConstructor: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderIsClicked, orderRequest, orderNumber } = useSelector(store => store.orderDetails);
  const { bun, filling, totalPrice, orderIds } = useSelector(store => store.burgerConstructor);
  const { userName } = useSelector(store => store.user);
  const accessToken = getCookie('accessToken');

  const postOrder = (orderData: string[]) => {
    userName && dispatch(getUserOrderNumber({ accessToken: `Bearer ${accessToken}`, order: orderData }));
    !userName && history.replace({ pathname: '/login', state: { from: { pathname: '/' }} })
  }

  const closeModalOrder = React.useCallback(() => {
    dispatch(closeOrderModal());
    dispatch(resetConstructor());
  }, [dispatch]);
  
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor: any) => ({
      isHover: monitor.isOver()
    }),
    drop({ item }: { item: TIngredient }) {
      dispatch(addItem(item))
    },
  });
  
  const deleteItem = (item: TIngredient) => {
    dispatch(removeItem(item));
  };

  return(
    filling && <div className={`${burgerConstructorStyles.constructor} pt-1`} ref={dropTarget}>
      <div className={burgerConstructorStyles.item}> 
        {bun && (
          <ConstructorElement 
            type="top" 
            isLocked={true} 
            text={`${bun.name} (верх)`} 
            price={bun.price} 
            thumbnail={bun.image_mobile} />
        )}
      </div>
      <ul className={burgerConstructorStyles.block}>
      {filling.map((item, index) => (
          <ConstructorItem id={item.uniqueId} index={index} key={item.uniqueId} >
            <ConstructorElement 
              text={item.name} 
              price={item.price} 
              thumbnail={item.image_mobile}
              handleClose={() => deleteItem(item)}
            />
          </ConstructorItem>
        ))}
      </ul>
      <div className={burgerConstructorStyles.item}>
        {bun && (
          <ConstructorElement 
            type="bottom" 
            isLocked={true} 
            text={`${bun.name} (низ)`} 
            price={bun.price} 
            thumbnail={bun.image_mobile} 
          />
        )}
      </div>
      
      {filling.length === 0 && (<div className={burgerConstructorStyles.box}>
        <p className={burgerConstructorStyles.text}>Выбери булку и начинку</p>
        {isHover && <p className={burgerConstructorStyles.border}>Тяни сюда</p>}
      </div>)}

      <div className={`${burgerConstructorStyles.info} pt-10 pr-4`}>
        <h2 className="text text_type_digits-medium">
        {totalPrice}
        </h2>
        <div className={burgerConstructorStyles.coins}></div>
        <Button type="primary" size="large" disabled={!bun || (filling.length===0)} onClick={() => postOrder(orderIds)}>Оформить заказ</Button>
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
