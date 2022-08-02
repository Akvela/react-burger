import React, {FunctionComponent} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/types/hooks';
import { changePassword } from '../services/actions/user';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loading } from '../components/loading/loading';
import resetPasswordStyles from './reset-password.module.css';

export const ResetPassword: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [tokenForm, setTokenForm] = React.useState('');
  const [passwordForm, setPasswordForm] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const {checkingReset, resetPasswordError, loading} = useSelector(store => store.user);
  const sendMail = useSelector(store => store.user.sendMail);
  const loginStatus =  useSelector(store => store.user.loginStatus);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const changeTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenForm(e.target.value)
  }
  const changePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm(e.target.value)
  }

  const onIconClick = () => {
    setVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const setNewPassword = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(changePassword(passwordForm, tokenForm))
  }

  if (!sendMail && loginStatus) {
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
            <Input type={visible ? 'text' : 'password'} onChange={changePasswordInput} value={passwordForm} ref={inputRef} onIconClick={onIconClick} icon={visible ? 'HideIcon' : 'ShowIcon'} name='new-password' placeholder='Введите новый пароль' />
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
      {loading && <Loading />}
    </>
  );
}