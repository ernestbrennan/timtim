import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Trans } from '@lingui/macro';
import TelegramIcon from '@material-ui/icons/Telegram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from "@material-ui/core/IconButton";

import StyledLink from '$app/components/common/StyledLink';
import LanguageSelect from '$app/components/common/LanguageSelect';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import useGetHostRoute from '$app/hooks/useGetHostRoute'
import CloseIconBlue from '$app/icons/CloseIconBlue';
import { onAuthLogout, onAuthRequested } from '$app/redux/actions/authActions';
import { onlineMagazineURL, privacyPolicyURL, termsURL } from '$js/config';
import GooglePlayColorIcon from "$app/icons/GooglePlayColorIcon";
import AppleIcon from "$app/icons/AppleIcon";
import Routes from '$app/utlis/routes';
import classnames from "classnames";
import useStyles from './style';


const MenuItem = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <li className={classes.menuItem} {...rest}>
      {children}
    </li>
  );
};

const IconLink = ({ icon, href, children }) => {
  const classes = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',

      '& svg': {
        fontSize: 25,
        padding: 5,
        color: theme.palette.primary.white,
        background: theme.palette.primary.main,
        borderRadius: '50%',
      }
    },
    text: {
      fontWeight: 300,
      fontSize: 12,
      lineHeight: 2,
      color: theme.palette.primary.textColor,
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.textColor,
      paddingLeft: 8,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }))();

  return (
    <div className={classes.root}>
      {icon}
      <div className={classes.text}>
        <a className={classes.link} href={href}>
          {children}
        </a>
      </div>
    </div>
  );
};

function useGetLinks() {
  return [
    {
      icon: <MailOutlineIcon />,
      label: 'timtimuzbekistan@gmail.com',
      href: 'mailto:info@mail.com',
    },
    {
      icon: <TelegramIcon />,
      label: <Trans>Find us on Telegram</Trans>,
      href: '#',
    },
    {
      icon: <InstagramIcon />,
      label: <Trans>Find us on Instagram</Trans>,
      href: 'https://invite.viber.com/?g2=AQBMLJbawWYDLUk3IxSEyWrvYHLFfukkocqhXRLat84IMzxj03y58GlgQxXuj0cQ',
    },
  ];
}

const MenuPanel = ({ onClose, onShowFavorites }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const links = useGetLinks();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <CloseIconBlue className={classes.closeBtn} onClick={onClose} />
      <nav className={classes.root}>
        {/*<LanguageSelect*/}
        {/*  style={{*/}
        {/*    display: 'flex',*/}
        {/*    flexDirection: 'row',*/}
        {/*  }}*/}
        {/*>*/}
        {/*</LanguageSelect>*/}
        <ul className={classes.menu}>
          {isAuthenticated ? (
            <MenuItem
              onClick={() => {
                dispatch(onAuthLogout());
                onClose();
              }}
            >
              <Trans>Log out</Trans>
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                dispatch(onAuthRequested());
                onClose();
              }}
            >
              <Trans>Log in</Trans>
            </MenuItem>
          )}
          <StyledLink to={useGetFullRoute(Routes.favourites)} className={classes.link}>
            <MenuItem
              onClick={() => {
                onShowFavorites();
                onClose();
              }}
            >
              <Trans>Favourites</Trans>
            </MenuItem>
          </StyledLink>
          <StyledLink to={useGetFullRoute(Routes.about)} className={classes.link}>
            <MenuItem onClick={onClose}>
              <Trans>About us</Trans>
            </MenuItem>
          </StyledLink>
          {/*<a href="#" target="_blank" rel="noopener noreferrer" className={classes.link}>*/}
          {/*  <MenuItem onClick={onClose}>*/}
          {/*    <Trans>Lend an apartment</Trans>*/}
          {/*  </MenuItem>*/}
          {/*</a>*/}
          <StyledLink to={useGetFullRoute(Routes.rent)} className={classes.link}>
            <MenuItem onClick={onClose}>
              <Trans>Rent</Trans>
            </MenuItem>
          </StyledLink>
          <StyledLink to={useGetFullRoute(Routes.sale)} className={classes.link}>
            <MenuItem onClick={onClose}>
              <Trans>Sale</Trans>
            </MenuItem>
          </StyledLink>
          <StyledLink to={useGetFullRoute(Routes.complexList)} className={classes.link}>
            <MenuItem onClick={onClose}>
              <Trans>New buildings</Trans>
            </MenuItem>
          </StyledLink>
          <a href="#" className={classes.link}>
            <MenuItem onClick={onClose}>
              <Trans>Magazine</Trans>
            </MenuItem>
          </a>
          <StyledLink to={useGetFullRoute(Routes.adv_placement)} className={classes.link}>
            <MenuItem onClick={onClose}>
              <Trans>Adv placement</Trans>
            </MenuItem>
          </StyledLink>
          <div className={classes.spacer} />
          <a href={termsURL} className={classes.link} target="_blank" rel="noopener noreferrer">
            <MenuItem className={classes.smallMenuItem}>
              <Trans>Terms of service</Trans>
            </MenuItem>
          </a>
          <a
            href={privacyPolicyURL}
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MenuItem className={classes.smallMenuItem}>
              <Trans>Privacy policy</Trans>
            </MenuItem>
          </a>
        </ul>

        <div className={classes.social}>
          {links.map((link, index) => {
            return (
              <IconLink key={index} icon={link.icon} href={link.href}>
                {link.label}
              </IconLink>
            );
          })}
        </div>
        <div className={classes.appIconsContainer}>
          <IconButton className={classnames(classes.appIconBtn, classes.googleBtn)}>
            <GooglePlayColorIcon/> <span style={{marginLeft: 10}}>Google Play</span>
          </IconButton>
          <IconButton className={classnames(classes.appIconBtn, classes.appleBtn)}>
            <AppleIcon /> <span style={{marginLeft: 10}}>App Store</span>
          </IconButton>
        </div>
      </nav>
    </div>
  );
};

export default MenuPanel;
