import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../services/actions/user';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordStyles from './reset-password.module.css';

export function ResetPassword() {
  const dispatch = useDispatch();
  const [tokenForm, setTokenForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');
  const { checkingReset, resetPasswordError} = useSelector(store => store.user);
  const sendMail = useSelector(store => store.user.sendMail)
  const userName =  useSelector(store => store.user.userName)
  
  const changeTokenInput = (e) => {
    setTokenForm(e.target.value)
  }
  const changePasswordInput = (e) => {
    setPasswordForm(e.target.value)
  }

  const setNewPassword = (evt) => {
    evt.preventDefault();
    dispatch(changePassword(passwordForm, tokenForm))
  }


  if (!sendMail && userName) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <>
      {checkingReset && <Redirect to='/login' />}
      <main className={resetPasswordStyles.container}>
        <h2 className={`${resetPasswordStyles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
        <form className={resetPasswordStyles.form} onSubmit={(evt) => setNewPassword(evt)}>
          <fieldset className={resetPasswordStyles.fieldset}>
            <PasswordInput type="password" onChange={changePasswordInput} value={passwordForm} name='new-password' icon="ShowIcon" placeholder='Введите новый пароль' />
            <Input type="text" onChange={changeTokenInput} value={tokenForm} name='token' placeholder='Введите код из письма' />
          </fieldset>
          <Button type="primary" size="medium">Сохранить</Button>
        </form>
        {resetPasswordError && <p className={resetPasswordStyles.error}>Неверно введен проверочный код</p>}
        <div className={`${resetPasswordStyles.string} pt-20`}>
          <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
          <Link className={resetPasswordStyles.link} to='/login'>Войти</Link>
        </div>
      </main>
    </>
  );
}