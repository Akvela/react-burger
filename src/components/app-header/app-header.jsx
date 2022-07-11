import { NavLink, Link } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

export const AppHeader = () => {
  return(
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav className={appHeaderStyles.navigation}>
        <div className={appHeaderStyles.wrapper}>
          <ul className={appHeaderStyles.menu}>
            <li className={`${appHeaderStyles.menuItem} pr-5 pl-5 mr-2`}>
              <NavLink activeClassName={appHeaderStyles.linkActive} className={appHeaderStyles.link} exact to='/'>
                <BurgerIcon type='secondary' />
                <span className='text text_type_main-default ml-2'>Конструктор</span>
              </NavLink>
            </li>
            <li className={`${appHeaderStyles.menuItem} pr-5 pl-5`}>
              <NavLink activeClassName={appHeaderStyles.linkActive} className={appHeaderStyles.link} to='/profile/orders'>  
                <ListIcon type='secondary' />
                <span className='text text_type_main-default ml-2'>Лента заказов</span>
              </NavLink>
            </li>
          </ul>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <div className='pr-5 pl-5'>
          <NavLink activeClassName={appHeaderStyles.linkActive} className={appHeaderStyles.link} exact to='/profile'>
            <ProfileIcon type='secondary' />
            <span className='text text_type_main-default ml-2'>Личный кабинет</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}