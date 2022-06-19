import React from 'react';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordStyles from './reset-password.module.css';

export function ResetPassword() {

  const [emailForm, setEmailForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');

  const changeEmailInput = (e) => {
    setEmailForm(e.target.value)
  }
  const changePasswordInput = (e) => {
    setPasswordForm(e.target.value)
  }

  return (
    <>
      <main className={resetPasswordStyles.container}>
        <h2 className={`${resetPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
        <form className={resetPasswordStyles.form}>
          <fieldset className={resetPasswordStyles.fieldset}>
            <Input type="password" onChange={changePasswordInput} value={passwordForm} name='new-password' icon="ShowIcon" placeholder='Введите новый пароль' />
            <Input type="text" onChange={changeEmailInput} value={emailForm} name='codeword' placeholder='Введите код из письма' />
          </fieldset>
          <Button type="primary" size="medium">Сохранить</Button>
        </form>
        <div className={`${resetPasswordStyles.string} pt-20`}>
          <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
          <Link className={resetPasswordStyles.link} to='/login'>Войти</Link>
        </div>
      </main>
    </>
  );
}