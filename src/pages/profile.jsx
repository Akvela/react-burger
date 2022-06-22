import React from 'react';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';

export function Profile() {
  const [nameForm, setNameForm] = React.useState('');
  const [loginForm, setLoginForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');

  const changeNameInput = (e) => {
    setNameForm(e.target.value)
  }
  const changeLoginInput = (e) => {
    setLoginForm(e.target.value)
  }
  const changePasswordInput = (e) => {
    setPasswordForm(e.target.value)
  }

  return (
    <>
      <main className={profileStyles.page}>
        <div className={profileStyles.container}>
          <ul className={profileStyles.navigation}>
            <li className={profileStyles.item}>
              <Link className={`${profileStyles.link} ${profileStyles.linkActive} text text_type_main-medium`}>Профиль</Link>
            </li>
            <li className={profileStyles.item}>
              <Link className={`${profileStyles.link} text text_type_main-medium`}>История заказов</Link>
            </li>
            <li className={profileStyles.item}>
              <Link className={`${profileStyles.link} text text_type_main-medium`}>Выход</Link>
            </li>
            <li className={`${profileStyles.item} pt-20`}>
              <p className={`${profileStyles.description} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </li>
          </ul>
          <form className={profileStyles.form}>
            <Input onChange={changeNameInput} value={nameForm} name='name' icon="EditIcon" placeholder='Имя' />
            <Input onChange={changeLoginInput} value={loginForm} name='login' icon="EditIcon" placeholder='Логин' />
            <PasswordInput onChange={changePasswordInput} value={passwordForm} name='password' icon="EditIcon" placeholder='Пароль' />
          </form>
        </div>
      </main>
    </>
  )
}