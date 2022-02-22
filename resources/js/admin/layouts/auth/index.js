import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Navbar from "./Navbar.js";
import styles from "$admin/assets/jss/layouts/authStyle.js";
import {authRoutes, getRouteByPath} from "$admin/routes.js";

const useStyles = makeStyles(styles);


export default function Pages(props) {
  const {...rest} = props;
  const location = useLocation();
  const currentRoute = getRouteByPath(location.pathname);
  const classes = useStyles();

  return (
    <div>
      <Navbar brandText={currentRoute.title} {...rest} />
      <div className={classes.wrapper}>
        <div className={classes.fullPage} style={{backgroundImage: "url(" + currentRoute.bgImage + ")"}}>
          <Switch>
            {authRoutes.map((route) => (
              <Route path={route.path} component={route.component} key={route.key}/>
            ))}

            <Redirect from="/auth" to="/auth/login"/>
          </Switch>
        </div>
      </div>
    </div>
  );
};
