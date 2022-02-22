import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    color: '#77828D',
    fontSize: '13px',
    lineHeight: '20px',
    letterSpacing: '-0.139286px',
  },
}));

const Copyright = (props) => {
  const copyRightText = `\u00A9 2019 - ${new Date().getFullYear()} TimTim`;
  const styles = useStyles();

  return (
    <div className={styles.container} {...props}>
      {copyRightText}
    </div>
  );
};

export default Copyright;
