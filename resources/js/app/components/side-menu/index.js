import React, {useCallback} from 'react';
import {SwipeableDrawer} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {onSideMenuDisplayChange} from '$app/redux/actions/uiActions';
import MenuPanel from './MenuPanel';

const drawerStateSelector = (state) => state.ui.isMenuDrawerOpen;
const paperStyle = {
  style: {
    overflowY: 'unset',
  },
};
export default () => {
  const isPanelOpen = useSelector(drawerStateSelector);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(onSideMenuDisplayChange(false));
  }, [dispatch]);
  const onOpen = useCallback(() => {
    dispatch(onSideMenuDisplayChange(true));
  }, [dispatch]);

  const onFavorites = useCallback(() => {
  }, []);

  return (
    <SwipeableDrawer
      anchor="right"
      open={isPanelOpen}
      onOpen={onOpen}
      onClose={onClose}
      PaperProps={paperStyle}
    >
      <MenuPanel onClose={onClose} onShowFavorites={onFavorites}/>
    </SwipeableDrawer>
  );
};