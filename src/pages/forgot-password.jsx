import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordStyles from './forgot-password.module.css';

export function ForgotPassword() {
  const [emailForm, setEmailForm] = React.useState('');

  const changeEmailInput = (e) => {
    setEmailForm(e.target.value)
  }
 
  return (
    <>
      <main className={forgotPasswordStyles.container}>
        <h2 className={`${forgotPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
        <form className={forgotPasswordStyles.form}>
          <Input onChange={changeEmailInput} value={emailForm} name='email' placeholder='Укажите e-mail' />
          <Button type="primary" size="medium">Восстановить</Button>
        </form>
        <div className={forgotPasswordStyles.string}>
          <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
          <Link className={forgotPasswordStyles.link} to='/register'>Войти</Link>
        </div>
      </main>
    </>
  );
}