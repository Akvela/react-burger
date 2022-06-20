import { Link } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

export const AppHeader = () => {
  return(
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav className={appHeaderStyles.navigation}>
        <div className={appHeaderStyles.wrapper}>
          <ul className={appHeaderStyles.menu}>
            <li className={`${appHeaderStyles.menuItem} pr-5 pl-5 mr-2`}>
              <Link className={`${appHeaderStyles.link} ${appHeaderStyles.linkActive}`} to='/'>
                <BurgerIcon type='primary' />
                <span className='text text_type_main-default ml-2'>Конструктор</span>
              </Link>
            </li>
            <li className={`${appHeaderStyles.menuItem} pr-5 pl-5`}>
              <Link className={appHeaderStyles.link} to='/'>  
                <ListIcon type='secondary' />
                <span className='text text_type_main-default ml-2'>Лента заказов</span>
              </Link>
            </li>
          </ul>
          <Logo />
        </div>
        <div className='pr-5 pl-5'>
          <Link className={appHeaderStyles.link} to='/profile'>
            <ProfileIcon type='secondary' />
            <span className='text text_type_main-default ml-2'>Личный кабинет</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}