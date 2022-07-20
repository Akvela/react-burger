import React from 'react';
import { OrderContainer } from '../components/order-container/order-container';
import { Loading } from '../components/loading/loading';
import { setUniqueId } from '../utils/utils';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/ws';
import feedStyles from './feed.module.css';
import { useSelector, useDispatch } from 'react-redux';

export function Feed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(store => store.ws);

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const ordersDone = orders?.filter(item => item.status === 'done').slice(0, 20);
  const ordersWork = orders?.filter(item => item.status === 'pending').slice(0, 10);

  return (
    <>
      {orders ? (
        <main className={feedStyles.page}>
          <h2 className={'text text_type_main-large'}>Лента заказов</h2>
          <div className={feedStyles.tape}>
            <ul className={feedStyles.container}>
              {orders?.map((item)=>(
                <OrderContainer key={setUniqueId()} order={item} />
              ))}
            </ul>
            <div className={feedStyles.info}>
              <div className={feedStyles.orders}>
                <div className={feedStyles.column}>
                  <h3 className='text text_type_main-medium pb-1'>Готовы:</h3>
                  <ul className={feedStyles.list}>
                    {ordersDone?.map((item)=>(
                      <li key={setUniqueId()} className={`${feedStyles.numberOrderDone} text text_type_digits-default`}>{item.number}</li>
                    ))}
                  </ul>
                </div>
                <div className={feedStyles.column}>
                  <h3 className='text text_type_main-medium  pb-1'>В работе:</h3>
                  <ul className={feedStyles.list}>
                    {orders && ordersWork?.map((item)=>(
                      <li key={setUniqueId()} className={`${feedStyles.numberOrderWork} text text_type_digits-default`}>{item.number}</li>
                    ))}
                  </ul>
                </div>
              </div>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <span className={`${feedStyles.points} text text_type_digits-large`}>{total}</span>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <span className={`${feedStyles.points} text text_type_digits-large`}>{totalToday}</span>
            </div>
          </div>
        </main>
      ) : <Loading /> }
    </>
  );
}