import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { useSelector } from '../../services/types/hooks';

export const ProtectedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const { userName } = useSelector((store) => store.user);
  const location = useLocation();
  
  if (!userName) {
    return (
      <Redirect to={{ pathname: '/login', state: { from: location }} } />
    )
  }

  return <Route {...rest}>{children}</Route>;
}
