import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

export const AppHeader = () => {
  return(
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <nav className={appHeaderStyles.navigation}>
        <div className={appHeaderStyles.wrapper}>
          <ul className={appHeaderStyles.menu}>
            <li className={`${appHeaderStyles.menuItem} pr-5 pl-5 mr-2`}>
              <a href='/#' className={`${appHeaderStyles.link} ${appHeaderStyles.linkActive} text text_type_main-default`}>
                <BurgerIcon type='primary' />
                <span className='ml-2'>Конструктор</span>
              </a>
            </li>
            <li className={`${appHeaderStyles.menuItem} pr-5 pl-5`}>
              <a href='/#' className={`${appHeaderStyles.link} text text_type_main-default`}>  
                <ListIcon type='secondary' />
                <span className='ml-2'>Лента заказов</span>
              </a>
            </li>
          </ul>
          <Logo />
        </div>
        <div className='pr-5 pl-5'>
          <a href='/#' className={`${appHeaderStyles.link} text text_type_main-default`}>
            <ProfileIcon type='secondary' />
            <span className='ml-2'>Личный кабинет</span>
          </a>
        </div>
      </nav>
    </header>
  )
}