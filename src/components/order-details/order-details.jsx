import orderDetailsStyles from './order-details.module.css';
import PropTypes from 'prop-types';

const OrderDetails = ({orderInfo}) => {
  return(
    <div className={orderDetailsStyles.container}>
      {!orderInfo.errorOrder
        ? <h2 className={`${orderDetailsStyles.title} text text_type_digits-large pt-30`}>{orderInfo.numberOrder}</h2>
        : <p className='text text_type_main-default'>Произошла ошибка</p>
      }
      <p className={'text text_type_main-medium pt-8'}>идентификатор заказа</p>
      <div className={`${orderDetailsStyles.image} pt-15 pb-15`} />
      <p className={'text text_type_main-default'}>Ваш заказ начали готовить</p>
      <p className={'text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderInfo: PropTypes.shape({
    numberOrder: PropTypes.number.isRequired,
    errorOrder: PropTypes.bool.isRequired
  })
}

export default OrderDetails;