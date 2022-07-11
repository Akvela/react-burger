import React from 'react';
import { Link } from 'react-router-dom';
import { OrderContainer } from '../components/order-container/order-container';
import { Loading } from '../components/loading/loading';
import { setUniqueId } from '../utils/utils';
import feedStyles from './feed.module.css';
import { answer, ordersDone, ordersWork } from './api';


export function Feed() {
  const arr = answer.orders;
  
  return (
    <>
      <main className={feedStyles.page}>
        <h2 className={'text text_type_main-large'}>Лента заказов</h2>
        <div className={feedStyles.tape}>
          <ul className={feedStyles.container}>
            {arr.map((item)=>(
              <OrderContainer id={arr.number} key={setUniqueId()} status={null} number={item.number} createdAt={item.createdAt} name={item.name} ingredients={item.ingredients} />
            ))}
          </ul>
          <div className={feedStyles.info}>
            <div className={feedStyles.orders}>
              <div className={feedStyles.column}>
                <h3 className='text text_type_main-medium pb-1'>Готовы:</h3>
                <ul className={feedStyles.list}>
                  {ordersDone.map((item)=>(
                    <li key={setUniqueId()} className={`${feedStyles.numberOrderDone} text text_type_digits-default`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={feedStyles.column}>
                <h3 className='text text_type_main-medium  pb-1'>В работе:</h3>
                <ul className={feedStyles.list}>
                  {ordersWork.map((item)=>(
                    <li key={setUniqueId()} className={`${feedStyles.numberOrderWork} text text_type_digits-default`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
              <p className='text text_type_main-medium'>Выполнено за все время:</p>
              <span className={`${feedStyles.points} text text_type_digits-large`}>28752</span>
              <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
              <span className={`${feedStyles.points} text text_type_digits-large`}>138</span>
          </div>
        </div>
      </main>
      {/* {loading && <Loading />} */}
    </>
  );
}