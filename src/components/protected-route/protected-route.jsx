import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ path, children, redirectPath, check }) {
  return (
    <Route 
      path={path} 
      exact={true} 
      render={
        ({ location }) => check ? 
          (children) : 
            (<Redirect to={{ pathname: redirectPath, state: { from: location }} } />)
      } 
    />
  )
}
