import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { registerNewUser } from '../services/actions/user';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../components/loading/loading';
import registerStyles from './register.module.css';

export function Register() {
  const dispatch = useDispatch();
  const [nameForm, setNameForm] = React.useState('');
  const [emailForm, setEmailForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');
  const { loginStatus, loading } = useSelector(store => store.user);

  const changeNameInput = (e) => {
    setNameForm(e.target.value)
  }
  const changeEmailInput = (e) => {
    setEmailForm(e.target.value)
  }
  const changePasswordInput = (e) => {
    setPasswordForm(e.target.value)
  }

  const createNewUser = (evt) => {
    evt.preventDefault();
    dispatch(registerNewUser(nameForm, emailForm, passwordForm));
    setNameForm('');
    setEmailForm('');
    setPasswordForm('');
  }

  if (loginStatus) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <>
      <main className={registerStyles.container}>
        <h2 className={`${registerStyles.title} text text_type_main-medium pb-6`}>Регистрация</h2>
        <form className={registerStyles.form} onSubmit={(evt) => createNewUser(evt)}>
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
      {loading && <Loading />}
    </>
  );
}