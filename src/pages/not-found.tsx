import React, {FunctionComponent} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import notfoundStyles from './not-found.module.css';

export const NotFound: FunctionComponent = () => {
  return (
    <div className={notfoundStyles.wrapper}>
      <p className="text text_type_digits-large text_color_inactive">404</p>
      <h1 className="text text_type_main-medium">Страница не найдена</h1>
      <Link className={notfoundStyles.link} to="/">
        <Button type="secondary" size="medium">На главную</Button>
      </Link>
    </div>
  )
}