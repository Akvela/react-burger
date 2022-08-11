import React, {FunctionComponent} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/types/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getPasswordRecovery } from '../services/actions/user';
import forgotPasswordStyles from './forgot-password.module.css';

export const ForgotPassword: FunctionComponent = () => {
  const [emailForm, setEmailForm] = React.useState('');
  const dispatch = useDispatch();
  const {checkingResponse, userName, loading, sendMailError} = useSelector(store => store.user);

  const changeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForm(e.target.value)
  };

  const recoverPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailForm) {
      return;
    }
    dispatch(getPasswordRecovery(emailForm));
    setEmailForm('')
  };

  if (userName) {
    return (
      <Redirect to='/' />
    )
  };
 
  return (
    <>
      {checkingResponse && <Redirect to='/reset-password'/>}
      <main className={forgotPasswordStyles.container}>
        <h2 className={`${forgotPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
        <form className={forgotPasswordStyles.form} onSubmit={(e) => recoverPassword(e)}>
          <Input onChange={changeEmailInput} value={emailForm} name='email' placeholder='Укажите e-mail' />
          <Button type="primary" size="medium">Восстановить</Button>
        </form>
        {sendMailError && <span className={forgotPasswordStyles.error}>Пользователя с такой почтой не существует</span>}
        <div className={forgotPasswordStyles.string}>
          <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
          <Link className={forgotPasswordStyles.link} to='/login'>Войти</Link>
        </div>
      </main>
    </>
  );
}