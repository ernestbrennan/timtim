import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  gradientAnchor: {
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '50%',
      background: `linear-gradient(180deg, #F8F9FA 0%, rgba(255, 255, 255, 0) 100%);`,
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
    },
  },
  expandButton: {
    cursor: 'pointer',
  },
}));

function ExpandableContainerWithShowMore({ collapsedHeight = 200, children, ...props }) {
  const [isExpanded, setExpanded] = useState(false);
  const styles = useStyles();

  return (
    <div className={classNames(styles.root)}>
      <div
        className={classNames(styles.content)}
        style={{ height: isExpanded ? 'inherit' : `${collapsedHeight}px` }}
      >
        {children}
        <div className={styles.gradientAnchor} style={{ display: isExpanded ? 'none' : 'block' }} />
      </div>
      <div
        className={styles.expandButton}
        onClick={() => {
          setExpanded((value) => !value);
        }}
      >
        <ins>{isExpanded ? <Trans>Less</Trans> : <Trans>More</Trans>}</ins>
      </div>
    </div>
  );
}

export default ExpandableContainerWithShowMore;
