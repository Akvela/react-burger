import React from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from './register.module.css';

export function Register() {
  const [nameForm, setNameForm] = React.useState('');
  const [emailForm, setEmailForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');

  const changeNameInput = (e) => {
    setNameForm(e.target.value)
  }
  const changeEmailInput = (e) => {
    setEmailForm(e.target.value)
  }
  const changePasswordInput = (e) => {
    setPasswordForm(e.target.value)
  }

  return (
    <>
      <AppHeader />
      <main className={registerStyles.container}>
        <h2 className={`${registerStyles.title} text text_type_main-medium pb-6`}>Регистрация</h2>
        <form className={registerStyles.form}>
          <fieldset className={registerStyles.fieldset}>
            <Input onChange={changeNameInput} value={nameForm} name='name' placeholder='Имя' />
            <EmailInput onChange={changeEmailInput} value={emailForm} name='email' />
            <PasswordInput onChange={changePasswordInput} value={passwordForm} name='password' />
          </fieldset>
          <Button type="primary" size="medium">Зарегистрироваться</Button>
        </form>
        <div className={`${registerStyles.string} pt-20`}>
          <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</span>
          <Link className={registerStyles.link} to='/login'>Войти</Link>
        </div>
      </main>
    </>
  );
}