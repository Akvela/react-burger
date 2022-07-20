import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../loading/loading";


export default function ProtectedRoute({ children, ...rest }) {
  const { isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();
  
  if (!isAuthChecked && <Loading />) {
    return (
      <Redirect to={{ pathname: '/login', state: { from: location }} } />
    )
  }

  return <Route {...rest}>{children}</Route>;
}
