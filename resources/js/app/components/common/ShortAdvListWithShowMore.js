import React from "react";
import {useSelector} from "react-redux";
import {Fab, makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {Trans} from '@lingui/macro'

import BottomDownloadsBar from "./BottomDownloadsBar";

function ShortAdvListWithShowMore({itemCount, DataProviderWrapper, onShowMoreClick, hideShowMore}) {
  const currentCity = useSelector(state => state.cities.currentCity);

  const classes = makeStyles((theme) => ({
    showBtn: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.white,
      borderRadius: 10,
      textTransform: 'none',
      width: '100%'
    },
  }))();

  return currentCity.name && <Box style={{'overflow': 'hidden scroll', height: '100%'}}>
    <Box>
      {Array(itemCount).fill(1).map((_item, index) => <Box margin={'8px 0'} key={index}>
        {DataProviderWrapper({index, style: {}})}
      </Box>)}
    </Box>
    {!hideShowMore && <Box margin={'32px'}>
      <Fab onClick={onShowMoreClick} className={classes.showBtn}>
        <Trans>Show more</Trans>
      </Fab>
    </Box>}
    <Box m={'0 16px'}><Divider /></Box>
    {/*<AdvListBreadcrumbs />*/}
    <BottomDownloadsBar />
  </Box>
}

export default React.memo(ShortAdvListWithShowMore);
