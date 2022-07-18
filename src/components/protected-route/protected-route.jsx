import { Redirect, Route } from "react-router-dom";


export default function ProtectedRoute({ path, children, check }) {
  return (
    <Route 
      path={path} 
      exact={true} 
      render={
        ({ location }) => check ? 
          (children) : 
            (<Redirect to={{ pathname: '/login', state: { from: location }} } />)
      } 
    />
  )
}
