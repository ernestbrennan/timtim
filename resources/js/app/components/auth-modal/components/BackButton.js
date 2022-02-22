import Button from "@material-ui/core/Button";
import {Trans} from "@lingui/macro";
import React from "react";

import useStyles from "../style";

export default (props) => {
  const styles = useStyles();
  return (
    <Button size={'small'} className={styles.backButton} {...props}>
      {'\u276E'} {props.text || <Trans>Back</Trans>}
    </Button>
  );
};