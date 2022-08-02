import { Redirect, Route, useLocation } from "react-router-dom";
import { FunctionComponent } from "react";
import { useSelector } from "../../services/types/hooks";
import { Loading } from "../loading/loading";
import { TProtectedRoute } from "../../services/types/data";


export const ProtectedRoute: FunctionComponent<TProtectedRoute> = ({ children, ...rest }) => {
  const { isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();
  
  if (!isAuthChecked && <Loading />) {
    return (
      <Redirect to={{ pathname: '/login', state: { from: location }} } />
    )
  }

  return <Route {...rest}>{children}</Route>;
}
