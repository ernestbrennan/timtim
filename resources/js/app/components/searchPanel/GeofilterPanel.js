import React, { useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Trans } from '@lingui/macro';
import Box from '@material-ui/core/Box';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import RegionSelector from '../selectors/RegionSelector';
import SubwaySelector from '../selectors/SubwaySelector';
import Routes from '$app/utlis/routes';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import classnames from "classnames";

function TabContainer({ children, dir, padding = 3 }) {
  const style = {
    padding: 8 * padding,
  };
  return (
    <Typography component="div" dir={dir} style={style}>
      {children}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.white,
    borderColor: '#D3C18D',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'hidden',
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    flexGrow: 1,
    overflowY: 'auto',
  },
  controls: {
    zIndex: 1,
    minHeight: 56,
    boxShadow: '0px -2px 20px -3px rgba(143,128,143,0.89);',
  },
  buttons: {
    margin: theme.spacing(1),
    height: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  showBtn: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.white,
    borderRadius: 10,
    textTransform: 'none'
  },
  cancelBtn: {
    textTransform: 'none',
    textDecoration: 'underline'
  },
}));

export const GeofilterPanel = ({
  regions,
  regionCategories,
  selectedRegions,
  onRegionSelected,
  subways,
  selectedSubways,
  subwayLines,
  onSubwayLineSelected,
  onSubwaySelected,
  subwayDistance,
  onSubwayDistanceChanged,
  searchCount,
  onGeofilterPanelDisplayChange,
  withDisplayChange = true,
  altView = false,
  isMobile,
  ...props
}) => {
  const location = useLocation();
  const isComplexesSearch =
    location.pathname === useGetFullRoute(Routes.complexList) ||
    location.pathname.includes('/complex/');
  const RCCount = useSelector((state) => state.search.RCCount);
  const { name: cityName } = useSelector((state) => state.cities.currentCity);
  const advType = useSelector((state) => state.filters.advType);

  const getStartIndex = (selectedRegions, selectedSubways) => {
    if (selectedSubways.size) {
      return 1;
    } else if (selectedRegions.size) {
      return 0;
    }
    return 0;
  };
  const [value, setValue] = React.useState(getStartIndex(selectedRegions, selectedSubways));
  const styles = useStyles();
  const containerRef = useRef();

  const swipeableViewRef = useRef();
  const classes = {
    content: {},
  };

  const maxHeight = altView ? (isMobile ? 'calc(100vh -103px)' : '410px') : undefined;

  const handleApply = useCallback(() => {
    onGeofilterPanelDisplayChange(false);
  }, [onGeofilterPanelDisplayChange, cityName, advType]);

  const handleCancel = useCallback(() => {
    onGeofilterPanelDisplayChange(false);
  }, [onGeofilterPanelDisplayChange]);

  const handleChange = useCallback(
    (event, index) => {
      setValue(index);
      containerRef.current.scrollTop = 0;
    },
    [setValue],
  );
  const handleChangeIndex = useCallback(
    (index) => {
      setValue(index);
    },
    [setValue],
  );

  const handleUpdateHeight = () => {
    swipeableViewRef.current.updateHeight();
  };
  return (
    <Card
      className={styles.root}
      style={{
        width: altView && !isMobile ? '564px' : undefined,
        maxHeight,
        height: altView ? 'auto' : undefined,
      }}
      elevation={isMobile ? 0 : 4}
      {...props}
    >
      <Box style={{ borderBottom: '1px solid rgba(196, 196, 196, 0.5)' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={altView ? 'fullWidth' : undefined}
          indicatorColor="primary"
        >
          <Tab label="Район" />
          {subways && subways.length && <Tab label="Метро" />}
          {/*isComplexesSearch && <Tab label="Название ЖК" /> //TODO: finish search by RC name */}
        </Tabs>
      </Box>
      <CardContent
        className={styles.content}
        ref={containerRef}
        style={isMobile && { padding: '8px 24px' }}
      >
        <SwipeableViews
          index={value}
          ref={swipeableViewRef}
          onChangeIndex={handleChangeIndex}
          containerStyle={classes.content}
          animateHeight
        >
          <TabContainer padding={altView ? 0 : 3} altView={altView}>
            <RegionSelector
              regions={regions}
              regionCategories={regionCategories}
              selectedRegions={selectedRegions}
              onRegionSelected={onRegionSelected}
              altView={altView}
            />
          </TabContainer>

          <TabContainer padding={altView ? 0 : 3} altView={altView}>
            <SubwaySelector
              subways={subways}
              subwayLines={subwayLines}
              selectedSubways={selectedSubways}
              onSubwayLineSelected={onSubwayLineSelected}
              onSubwaySelected={onSubwaySelected}
              subwayDistance={subwayDistance}
              onSubwayDistanceChanged={onSubwayDistanceChanged}
              onExpand={handleUpdateHeight}
              altView={altView}
            />
          </TabContainer>
          {/*isComplexesSearch && <TabContainer padding={0}>
            <SearchByRCName handleUpdateHeight={handleUpdateHeight}/>
          </TabContainer>*/}
        </SwipeableViews>
      </CardContent>
      {withDisplayChange && value !== 2 && (
        <CardActions className={styles.controls}>
          <Fab
            variant="extended"
            aria-label="Add"
            className={classnames(styles.buttons, styles.showBtn)}
            onClick={handleApply}
          >
            {searchCount !== null || Boolean(RCCount) ? (
              isComplexesSearch ? (
                <Trans>Show {RCCount} complexes</Trans>
              ) : (
                <Trans>Show {searchCount} apartments</Trans>
              )
            ) : (
              <Trans>Show</Trans>
            )}
          </Fab>
          <Button onClick={handleCancel} className={classnames(styles.buttons, styles.cancelBtn)}>
            <Trans>Cancel</Trans>
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default GeofilterPanel;
