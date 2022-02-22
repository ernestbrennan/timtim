import React from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AppLayout from './layouts/app/index'
import AuthLayout from './layouts/auth/index'

// context
import { useUserState } from "./context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  const isAuth = isAuthenticated()

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />

          <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />}/>
          <PrivateRoute path="/app" component={AppLayout} />
          <PublicRoute path="/auth" component={AuthLayout} />
        </Switch>
      </HashRouter>
    </>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => React.createElement(component, props)}
      />
    )
    // return (
    //   <Route
    //     {...rest}
    //     render={props =>
    //         isAuth ? (
    //         React.createElement(component, props)
    //       ) : (
    //         <Redirect to={"/auth"} />
    //       )
    //     }
    //   />
    // );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            isAuth ? (<Redirect to={{pathname: "/"}}/>) : (React.createElement(component, props))
        }
      />
    );
  }
}
