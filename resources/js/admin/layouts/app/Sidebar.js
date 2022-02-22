/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {NavLink, useLocation} from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";

// core components
import AdminNavbarLinks from "$admin/ui-components/Navbars/AdminNavbarLinks.js";
import sidebarStyle from "$admin/assets/jss/components/sidebarStyle.js";
import structure from './SidebarStructure';
import bgImage from '$admin/assets/img/sidebar-1.jpg';

const useStyles = makeStyles(sidebarStyle);

var ps;

function SidebarWrapper({className, user, headerLinks, links}) {
  const sidebarWrapper = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div className={className} ref={sidebarWrapper}>
      {user}
      {headerLinks}
      {links}
    </div>
  );
}

function Sidebar(props) {
  const { bgColor} = props;
  const classes = useStyles();
  const [miniActive, setMiniActive] = React.useState(true);
  let {pathname} = useLocation();
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    setState(getCollapseStates(structure));
  }, []);
  const mainPanel = React.useRef();
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (pathname === routes[i].path) {
        return true;
      }
    }
    return false;
  };
  const activeRoute = (routeName) => {
    return pathname === routeName ? "active" : "";
  };
  const createLinks = (routes) => {
    const {color} = props;
    return routes.map((prop, key) => {
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        const navLinkClasses =
          classes.itemLink +
          " " +
          cx({
            [" " + classes.collapseActive]: getCollapseInitialState(prop.views),
          });
        const itemText =
          classes.itemText +
          " " +
          cx({
            [classes.itemTextMini]: props.miniActive && miniActive,
            [classes.itemTextMiniRTL]: props.miniActive && miniActive,
          });
        const collapseItemText =
          classes.collapseItemText +
          " " +
          cx({
            [classes.collapseItemTextMini]: props.miniActive && miniActive,
            [classes.collapseItemTextMiniRTL]: props.miniActive && miniActive,
          });
        const itemIcon = classes.itemIcon;
        const caret = classes.caret;

        const collapseItemMini = classes.collapseItemMini;
        return (
          <ListItem
            key={key}
            className={cx(
              {[classes.item]: prop.icon !== undefined},
              {[classes.collapseItem]: prop.icon === undefined}
            )}
          >
            <NavLink
              to={"#"}
              className={navLinkClasses}
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === "string" ? (
                  <Icon className={itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={itemIcon}/>
                )
              ) : (
                <span className={collapseItemMini}>
                  {prop.mini}
                </span>
              )}
              <ListItemText
                primary={prop.name}
                secondary={
                  <b
                    className={
                      caret +
                      " " +
                      (state[prop.state] ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={cx(
                  {[itemText]: prop.icon !== undefined},
                  {[collapseItemText]: prop.icon === undefined}
                )}
              />
            </NavLink>
            <Collapse in={state[prop.state]} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                {createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        );
      }

      const innerNavLinkClasses = classes.collapseItemLink + " " + cx({
        [" " + classes[color]]: activeRoute(prop.path),
      });
      const collapseItemMini = classes.collapseItemMini
      const navLinkClasses = classes.itemLink + " " + cx({
        [" " + classes[color]]: activeRoute(prop.path),
      });
      const itemText = classes.itemText + " " + cx({
        [classes.itemTextMini]: props.miniActive && miniActive,
        [classes.itemTextMiniRTL]: props.miniActive && miniActive,
      });
      const collapseItemText =
        classes.collapseItemText +
        " " +
        cx({
          [classes.collapseItemTextMini]: props.miniActive && miniActive,
          [classes.collapseItemTextMiniRTL]: props.miniActive && miniActive,
        });
      const itemIcon = classes.itemIcon;
      return (
        <ListItem
          key={key}
          className={cx(
            {[classes.item]: prop.icon !== undefined},
            {[classes.collapseItem]: prop.icon === undefined}
          )}
        >
          <NavLink
            to={prop.path}
            className={cx(
              {[navLinkClasses]: prop.icon !== undefined},
              {[innerNavLinkClasses]: prop.icon === undefined}
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === "string" ? (
                <Icon className={itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={itemIcon}/>
              )
            ) : (
              <span className={collapseItemMini}>
                {prop.mini}
              </span>
            )}
            <ListItemText
              primary={prop.label}
              disableTypography={true}
              className={cx(
                {[itemText]: prop.icon !== undefined},
                {[collapseItemText]: prop.icon === undefined}
              )}
            />
          </NavLink>
        </ListItem>
      );
    });
  };
  var links = <List className={classes.list}>{createLinks(structure)}</List>;

  const drawerPaper = classes.drawerPaper + " " + cx({
    [classes.drawerPaperMini]: props.miniActive && miniActive,
  });
  const sidebarWrapper = classes.sidebarWrapper + " " + cx({
    [classes.drawerPaperMini]: props.miniActive && miniActive,
    [classes.sidebarWrapperWithPerfectScrollbar]:
    navigator.platform.indexOf("Win") > -1,
  });
  return (
    <div ref={mainPanel}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{
            paper: drawerPaper + " " + classes[bgColor + "Background"],
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SidebarWrapper
            className={sidebarWrapper}
            headerLinks={<AdminNavbarLinks/>}
            links={links}
          />
          <div className={classes.background} style={{backgroundImage: "url(" + bgImage + ")"}}/>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          onMouseOver={() => setMiniActive(false)}
          onMouseOut={() => setMiniActive(true)}
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: drawerPaper + " " + classes[bgColor + "Background"],
          }}
        >
          {/*{brand}*/}
          <SidebarWrapper
            className={sidebarWrapper}
            // user={user}
            links={links}
          />
          <div className={classes.background} style={{backgroundImage: "url(" + bgImage + ")"}}/>
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.defaultProps = {
  bgColor: "blue",
};

Sidebar.propTypes = {
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose",
  ]),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  headerLinks: PropTypes.object,
  links: PropTypes.object,
};

export default Sidebar;
