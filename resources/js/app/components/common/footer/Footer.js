import React from 'react';
import {Trans} from '@lingui/macro';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

import GooglePlayRentalsLink from "$app/components/common/links/GooglePlayRentalsLink";
import AppStoreRentalsLink from "$app/components/common/links/AppStoreRentalsLink";
import useGetHostRoute from '$app/hooks/useGetHostRoute'
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import GooglePlayRoundIcon from "$app/icons/GooglePlayRoundIcon";
import AppStoreRoundIcon from "$app/icons/AppStoreRoundIcon";
import FacebookIcon from '$app/icons/new/Facebook';
import Routes from '$app/utlis/routes';
import useStyles from './style';


const Footer = () => {
  const classes = useStyles();
  // const links = useGetLinks();
  const links = [
    {
      name: <Trans>About us</Trans>,
      link: useGetFullRoute(Routes.about),
    },
    {
      name: <Trans>Publish an ad</Trans>,
      link: useGetHostRoute(),
    },
    {
      name: <Trans>Rent</Trans>,
      link: useGetFullRoute(Routes.rent),
    },
    {
      name: <Trans>Sale</Trans>,
      link: useGetFullRoute(Routes.sale),
    },
    {
      name: <Trans>New buildings</Trans>,
      link: useGetFullRoute(Routes.complesList),
    },
    {
      name: <Trans>Adv placement</Trans>,
      link: useGetFullRoute(Routes.adv_placement),
    },
  ]

  return (
    <section className={classes.root}>
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} md={6} lg={3} className={classes.gridItem}>
          <div className={classes.columnTitle}><Trans>Contact Information</Trans></div>
          <div>
            <LocationOnIcon/>
            <span style={{marginLeft: 5}}>г.ТашкентМирзо-Улугбекский район,Салар буйи, 7Старт, бизнес-центр</span>
          </div>
          <div className={classes.contact}>
            <PhoneIcon/>
            <span style={{marginLeft: 5}}>+998 (33) 339 33 34</span>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={3} className={classes.gridItem}>
          <div className={classes.columnTitle}>Навигация по сайту</div>
          {/*{links.map((link, index) => (*/}
          {/*  <FooterColumnLink*/}
          {/*    key={index}*/}
          {/*    name={link.name}*/}
          {/*    Icon={link.icon}*/}
          {/*    IconHover={link.iconHover}*/}
          {/*    link={link.link}*/}
          {/*  />*/}
          {/*))}*/}

        </Grid>
        <Grid item xs={12} md={6} lg={3} className={classes.gridItem}>
          <div className={classes.columnTitle}>Мы в соц.сетях</div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <IconButton variant="outlined" className={classes.iconBtn}>
              <TelegramIcon />
            </IconButton>
            <IconButton variant="outlined" className={classes.iconBtn}>
              <FacebookIcon />
            </IconButton>
            <IconButton variant="outlined" className={classes.iconBtn}>
              <InstagramIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={3} className={classes.gridItem}>
          <div className={classes.columnTitle}>TimTim приложение</div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <GooglePlayRentalsLink style={{marginRight: 10}}>
              <GooglePlayRoundIcon/>
            </GooglePlayRentalsLink>
            <AppStoreRentalsLink>
              <AppStoreRoundIcon/>
            </AppStoreRentalsLink>
          </div>
        </Grid>
      </Grid>

      <div className={classes.copyright}>
        2021 Timtim Corporation
      </div>
    </section>
  );
};

export default Footer;
