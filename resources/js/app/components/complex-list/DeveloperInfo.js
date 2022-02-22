import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: '25px',
    width: '25px',
    borderRadius: '13px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeImageContainer: {
    height: '48px',
    width: '48px',
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
  },
  logoImage: {
    width: '25px',
    height: 'auto',
  },
  largeImage: {
    width: '48px',
    height: 'auto',
  },
  textContainer: {
    fontFamily: 'sans-serif',
    fontWeight: 500,
    textAlign: 'center',
    marginLeft: '12px',
    fontSize: '13px',
    lineHeight: '16px',
  },
  largeTextContainer: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
  },
}));

const DeveloperInfo = ({ developer: { name, logo }, large = false, altView = false }) => {
  const styles = useStyles();
  return (
    <div
      className={styles.root}
      style={
        altView
          ? {
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              width: '100%',
            }
          : undefined
      }
    >
      <div className={large ? styles.largeImageContainer : styles.imageContainer}>
        <img
          className={large ? styles.largeImage : styles.logoImage}
          src={logo}
          alt={'real estate developer logo'}
        />
      </div>
      <div className={large ? styles.largeTextContainer : styles.textContainer}>{name}</div>
    </div>
  );
};

export default DeveloperInfo;
