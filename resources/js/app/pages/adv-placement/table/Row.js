import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  tableRow: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
    wordBreak: 'normal',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      padding: 0,
    },

    '&:last-child': {
      overflow: 'hidden',
    },

    '&:nth-child(2n + 1)': {
      backgroundColor: '#F3F3F3',
    },
  },

  section: {
    display: 'flex',
    height: '100%',
  },

  sectionMobile: {
    display: 'flex',
    '@media (min-width: 768px)': {
      display: 'none',
    },
    '& span': {
      alignItems: 'flex-start',
      padding: 5,
    },
  },

  sectionMobileCell: {
    alignItems: 'flex-start',
    padding: 5,
  },

  row: {
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 768px)': {
      width: 0,
      flexGrow: 1,
      justifyContent: 'center',
    },
  },

  cell: {
    width: 0,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 4px',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: '20px',

    '@media (min-width: 768px)': {
      borderRight: '2px solid #1F2229',
      padding: '24px 9px',
    },

    '&:last-child': {
      '@media (min-width: 768px)': {
        border: 'none',
      },
    },

    '& b': {
      fontWeight: 600,
    },
  },

  caption: {
    padding: '25px 0 16px',
    letterSpacing: -0.15,
    lineHeight: '24px',
    fontSize: 16,

    '& br': {
      display: 'none',
    },

    '@media (min-width: 768px)': {
      width: 275,
      flexShrink: 0,
      flexGrow: 0,
      padding: 20,
      borderRight: '2px solid #1F2229',

      '& br': {
        display: 'block',
      },
    },

    '@media (min-width: 1200px)': {
      width: 540,
    },

    '& b': {
      fontWeight: 600,
    },
  },

  info: {
    padding: '20px 0',
  },
}));

const Row = ({ caption, items = [] }) => {
  const classes = useStyles();
  return (
    <div className={classes.tableRow}>
      <div className={classes.caption}>{caption}</div>
      <div className={classes.row}>
        <div className={classes.sectionMobile}>
          <span className={classes.cell}>Київ</span>
          <span className={classes.cell}>Київська область</span>
          <span className={classes.cell}>Одеса, Львів, Харків</span>
          <span className={classes.cell}>Інші міста</span>
        </div>
        <div className={classes.section}>
          <span className={classes.cell}>{items && items[0]}</span>
          <span className={classes.cell}>{items && items[1]}</span>
          <span className={classes.cell}>{items && items[2]}</span>
          <span className={classes.cell}>{items && items[3]}</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
