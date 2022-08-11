import React, { FormEvent, FunctionComponent, useCallback } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/types/hooks';
import { logOut } from '../services/actions/user';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie, deleteCookie } from '../utils/cookie';
import { updateUser } from '../services/actions/user';
import { Loading } from '../components/loading/loading';
import profileStyles from './profile.module.css';

export const Profile: FunctionComponent = () => {
  const [isUserInfoChanged, setIsUserInfoChanged] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userName, userEmail, loading} = useSelector(store => store.user)
  const [nameValue, setNameValue] = React.useState(userName);
  const [loginValue, setLoginValue] = React.useState(userEmail);
  const [passwordValue, setPasswordValue] = React.useState('');

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const loginInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  const logoutUser = useCallback(() => {
    refreshToken && dispatch(logOut(refreshToken));
  }, [dispatch, logOut, history, refreshToken]);

  const onClickName = () => {
    setTimeout(() => nameInputRef.current && nameInputRef.current?.focus(), 0)
  }
  const onClickLogin = () => {
    setTimeout(() => loginInputRef.current && loginInputRef.current.focus(), 0)
  }
  const onClickPassword = () => {
    setTimeout(() => passwordInputRef.current && passwordInputRef.current.focus(), 0)
  }

  const changeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(evt.target.value)
    evt.target.value === userName ? setIsUserInfoChanged(false) : setIsUserInfoChanged(true)
  }
  const changeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue(evt.target.value)
    evt.target.value === userEmail ? setIsUserInfoChanged(false) : setIsUserInfoChanged(true)
  }
  const changePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(evt.target.value)
    evt.target.value === passwordValue ? setIsUserInfoChanged(false) : setIsUserInfoChanged(true)
  }

  const resetForm = React.useCallback(() => {
    setNameValue(userName)
    setLoginValue(userEmail)
    setPasswordValue('')
  }, [userName, userEmail])

  const submitForm = React.useCallback((evt: FormEvent) => {
    evt.preventDefault();
    dispatch(updateUser({ name: nameValue, email: loginValue, password: passwordValue, accessToken: `Bearer ${accessToken}` }))
  },
    [dispatch, nameValue, loginValue, passwordValue, accessToken]
  )

  React.useEffect(() => {
    setNameValue(userName);
    setLoginValue(userEmail);
    setPasswordValue('');
  }, [userName, userEmail])

  if (userName === '') {
    return (
      <Redirect to='/login' />
    )
  }

  return (
    <>
      <main className={profileStyles.page}>
        <div className={profileStyles.container}>
          <ul className={profileStyles.navigation}>
            <li className={profileStyles.item}>
              <Link to='/profile' className={`${profileStyles.link} ${profileStyles.linkActive} text text_type_main-medium`}>Профиль</Link>
            </li>
            <li className={profileStyles.item}>
              <Link to='/profile/orders' className={`${profileStyles.link} text text_type_main-medium`}>История заказов</Link>
            </li>
            <li className={profileStyles.item}>
              <Link to='/' onClick={logoutUser}
                className={`${profileStyles.link} text text_type_main-medium`}
              >Выход</Link>
            </li>
            <li className={profileStyles.item}>
              <p className={`${profileStyles.description} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </li>
          </ul>
          <form className={profileStyles.form} onSubmit={submitForm}>
            <Input onIconClick={onClickName} onChange={changeName}
              type={'text'} value={nameValue} name='name' icon="EditIcon" placeholder='Имя' ref={nameInputRef} />
            <Input onIconClick={onClickLogin} onChange={changeEmail} 
              type={'text'} value={loginValue} name='login' icon="EditIcon" placeholder='Логин' ref={loginInputRef} />
            <Input onIconClick={onClickPassword} onChange={changePassword} 
              type={'text'} value={passwordValue} name='password' icon="EditIcon" placeholder='Пароль' ref={passwordInputRef} />
            {isUserInfoChanged && (<div className={profileStyles.buttons}>
              <Button onClick={resetForm} type="secondary" size="medium" >Отмена</Button>
              <Button type="primary" size="medium" >Сохранить</Button>
            </div>)}
          </form>
          {loading && <Loading />}
        </div>
      </main>
    </>
  )
}