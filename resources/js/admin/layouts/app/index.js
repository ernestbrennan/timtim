import React, {useEffect} from "react";
import cx from "classnames";
import {Switch, Route, Redirect, useLocation} from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "$admin/ui-components/Navbars/AdminNavbar.js";
import Sidebar from "./Sidebar.js";

import {appRoutes, getRouteByPath} from "$admin/routes.js";

import styles from "$admin/assets/jss/layouts/adminStyle.js";
import {useDispatch, useSelector} from "react-redux";
import AuthService from "$app/services/AuthService";
import {onAuthSuccess} from "$app/redux/actions/authActions";
import {loadOptions} from "$admin/redux/actions/apiActions";

var ps;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(false);
  const [image, setImage] = React.useState(
    require("$admin/assets/img/sidebar-2.jpg").default
  );
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(
    require("$admin/assets/img/logo-white.svg").default
  );
  const location = useLocation();
  const currentRoute = getRouteByPath(location.pathname);

  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
      navigator.platform.indexOf("Win") > -1,
    });
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOptions());
  }, [dispatch]);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={appRoutes}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={currentRoute.title}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              {appRoutes.map((route, key) => (
                <Route path={route.path} component={route.component} key={key}/>
              ))}
              <Redirect from="/" to="/app/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
