import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {NavLink, useLocation} from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";

// core components
import Button from "$admin/ui-components/CustomButtons/Button";
import styles from "$admin/assets/jss/components/authNavbarStyle.js";
import {isCurrentRoute} from "$admin/routes.js";

const useStyles = makeStyles(styles);

export default function Navbar(props) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const {pathname} = useLocation();

  const classes = useStyles();
  const { color, brandText } = props;

  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });

  var list = (
    <List className={classes.list}>

      <ListItem className={classes.listItem}>
        <NavLink
          to={"/auth/register"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]:isCurrentRoute(pathname, 'register')
          })}
        >
          <PersonAdd className={classes.listItemIcon} />
          <ListItemText
            primary={"Register"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={"/auth/login"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: isCurrentRoute(pathname, 'login')
          })}
        >
          <Fingerprint className={classes.listItemIcon} />
          <ListItemText
            primary={"Login"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={"/auth/lock-screen"}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: isCurrentRoute(pathname, 'lock_screen')
          })}
        >
          <LockOpen className={classes.listItemIcon} />
          <ListItemText
            primary={"Lock"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={classes.flex}>
            <Button href="#" className={classes.title} color="transparent">
              {brandText}
            </Button>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.flex}>
            <Button href="#" className={classes.title} color="transparent">
              MD Pro React
            </Button>
          </div>
        </Hidden>
        <Hidden smDown>{list}</Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
