import React from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyles from './login.module.css';

export function Login() {
  //let auth = useAuth();

  const [emailForm, setEmailForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');

  const changeEmailInput = (e) => {
    setEmailForm(e.target.value)
  }
  const changePasswordInput = (e) => {
    setPasswordForm(e.target.value)
  }

  // let login = useCallback(
  //   e => {
  //     e.preventDefault();
  //     auth.signIn(form);
  //   },
  //   [auth, form]
  // );


  return (
    <>
      <AppHeader />
      <main className={loginStyles.container}>
        <h2 className={`${loginStyles.title} text text_type_main-medium pb-6`}>Вход</h2>
        <form className={loginStyles.form}>
          <fieldset className={loginStyles.fieldset}>
            <EmailInput onChange={changeEmailInput} value={emailForm} name='email' />
            <PasswordInput onChange={changePasswordInput} value={passwordForm} name='password' />
          </fieldset>
          <Button type="primary" size="medium">Войти</Button>
        </form>
        <div className={`${loginStyles.string} pt-20 pb-4`}>
          <span className='text text_type_main-default text_color_inactive'>Вы — новый пользователь?</span>
          <Link className={loginStyles.link} to='/register'>Зарегистрироваться</Link>
        </div>
        <div className={loginStyles.string}>
          <span className='text text_type_main-default text_color_inactive'>Забыли пароль?</span>
          <Link className={loginStyles.link} to='/forgot-password'>Восстановить пароль</Link>
        </div>
      </main>
    </>
  );
}