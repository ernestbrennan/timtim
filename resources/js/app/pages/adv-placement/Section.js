import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 20,
    marginBottom: 16,
    marginTop: 0,
    paddingRight: 55,
    lineHeight: 1,

    '@media (min-width: 768px)': {
      paddingRight: 0,
    },
  },

  subtitle: {
    marginTop: 0,
    marginBottom: 0,
  },

  section: {
    borderRadius: 24,
    backgroundColor: '#F6F6F6',
    padding: '24px 26px 15px',
    overflow: 'hidden',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    height: 110,

    '&:first-child': {
      marginBottom: 18,

      '@media (min-width: 1200px)': {
        marginBottom: 0,
      },
    },

    '@media (min-width: 1200px)': {
      flexBasis: 'calc(50% - 20px)',
      height: 124,
      padding: '15px 40px 15px',
      alignItems: 'center',
    },
  },

  img: {
    width: 40,
    marginRight: 24,
    flexShrink: 0,

    '@media (min-width: 768px)': {
      width: 58,
      marginRight: 38,
    },

    '& img': {
      width: '100%',
    },
  },
}));

const Section = ({ title, subtitle, img }) => {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      <span className={classes.img}>{img}</span>
      <span>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.subtitle}>{subtitle}</p>
      </span>
    </section>
  );
};

export default Section;
