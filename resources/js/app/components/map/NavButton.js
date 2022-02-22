import React from 'react';
import { GeolocateControl, NavigationControl } from 'react-map-gl';
import { makeStyles } from '@material-ui/core';

const navStyle = {
  position: 'absolute',
  right: 16,
  top: window.innerHeight / 2 - 144,
};
const geoStyle = { marginTop: 24 };
const geoLocateIconSVG = `url("data:image/svg+xml;charset=utf-8,%3Csvg width='14' height='13' viewBox='0 0 14 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.61966 12.4722C6.71846 12.9435 7.36099 13.0165 7.56293 12.5793L12.9974 0.814815C13.1909 0.395798 12.7619 -0.0393412 12.3402 0.148337L1.00004 5.19546C0.573174 5.38545 0.616954 6.00504 1.06629 6.13311L5.26884 7.33092C5.44741 7.38182 5.58306 7.52746 5.62116 7.70919L6.61966 12.4722Z' fill='%2377828D'/%3E%3C/svg%3E")`;
const zoomPlusIconSVG = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.5' y='7' width='13' height='2.08' rx='1.04' fill='%2377828D'/%3E%3Crect x='9.03906' y='1.54004' width='13' height='2.08' rx='1.04' transform='rotate(90 9.03906 1.54004)' fill='%2377828D'/%3E%3C/svg%3E%0A");`;
const zoomMinusIconSVG = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.5' y='7' width='13' height='2.08' rx='1.04' fill='%2377828D'/%3E%3C/svg%3E%0A");`;

const useStyles = makeStyles(() => ({
  root: {},
  navButtonsContainer: {
    borderRadius: '22px',
    width: '40px',
    height: '89px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#77828D',
    position: 'relative !important'
  },
  geolocateButtonContainer: {
    borderRadius: '22px',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#77828D',
  },
}));
const NavButton = React.memo(() => {
  const styles = useStyles();
  return (
    <div style={navStyle}>
      <style>
        {`.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon {
            background-image: ${geoLocateIconSVG};
          }
          .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
            background-image: ${zoomPlusIconSVG};
          }
          .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
            background-image: ${zoomMinusIconSVG};
          }
          button.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-in {
            padding: 16px 12px 12px 12px;
            width: 40px;
            height: 44px;
            border-top-left-radius: 22px;
            border-top-right-radius: 22px;
          }
          button.mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-out {
            padding: 12px 12px 16px 12px;
            width: 40px;
            height: 44px;
            border-bottom-left-radius: 22px;
            border-bottom-right-radius: 22px;
          }
          button.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          }
          `}
      </style>
      <NavigationControl showCompass={false} className={styles.navButtonsContainer} />
      <GeolocateControl style={geoStyle} className={styles.geolocateButtonContainer} />
    </div>
  );
});

export default NavButton;
