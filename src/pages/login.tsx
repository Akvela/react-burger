import React, {FunctionComponent} from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/types/hooks';
import { loginUser } from '../services/actions/user';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyles from './login.module.css';

export const Login: FunctionComponent = () => {
  const [emailForm, setEmailForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');
  const location = useLocation<{ from: string }>();
  const dispatch = useDispatch();
  const {userName, loading, loginError} = useSelector(store => store.user);

  const changeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForm(e.target.value)
  }
  const changePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm(e.target.value)
  }

  if (userName) {
    return (
      <Redirect to={location.state?.from || '/'} />
    )
  }

  return (
    <>
      <main className={loginStyles.container}>
        <h2 className={`${loginStyles.title} text text_type_main-medium pb-6`}>Вход</h2>
        <form className={loginStyles.form} onSubmit={(evt) => { 
          evt.preventDefault(); dispatch(loginUser(emailForm, passwordForm))
        }}>
          <fieldset className={loginStyles.fieldset}>
            <Input onChange={changeEmailInput} value={emailForm} name='email' placeholder={'E-mail'} />
            <PasswordInput onChange={changePasswordInput} value={passwordForm} name='password' />
          </fieldset>
          <Button type="primary" size="medium">Войти</Button>
        </form>
        {loginError && <span className={loginStyles.error}>Неправильно введены данные</span>}
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