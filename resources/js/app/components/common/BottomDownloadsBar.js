import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import DownloadOurApp from './DownloadOurApp';

const useStyles = makeStyles(() => ({
  footerInFooter: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: '16px',
  },
}));

function BottomDownloadsBar() {
  const styles = useStyles();
  return (
    <div className={styles.footerInFooter}>
      <Copyright />
      <DownloadOurApp />
    </div>
  );
}

export default BottomDownloadsBar;
