import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { ListItemIcon, makeStyles } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import classnames from 'classnames';
import Cookies from 'js-cookie';

import { SupportedLanguageCodes } from '$app/utlis/localization';
import { TIMTIM_ALREADY_SELECTED_LANGUAGE_COOKIE } from '$app/utlis/const';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    marginTop: 16,
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    background: theme.palette.primary.white,
    color: theme.palette.primary.main,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: 20,
    fontSize: 13,
    '&.MuiSelect-select': {
      paddingRight: 30,
    },
    '&:focus': {
      borderRadius: 24,
      background: theme.palette.primary.white,
      borderColor: '#EDEDED',
    },
    '&:hover': {
      background: '#EDEDED',
      borderColor: '#EDEDED',
    },
  },
  expandIcon: {
    color: theme.palette.primary.main,
    top: 10,
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
    fontSize: 17,
  },
  languageIcon: {
    minWidth: 24,
    color: theme.palette.primary.main,
    // color: '#879097',
    fontSize: 17,
  },
  paper: {
    borderRadius: 8,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: theme.palette.primary.white,
    '& li': {
      fontSize: 14,
      paddingTop: 12,
      paddingBottom: 12,
    },
    '& li:hover': {
      background: '#EDEDED',
    },
    '& li.Mui-selected': {
      // color: theme.palette.secondary.contrastText,
      background: '#EDEDED',
    },
    '& li.Mui-selected:hover': {
      background: '#EDEDED',
    },
    '& li .MuiListItemIcon-root': {
      display: 'none',
    },
  },
}));

const selectItems = [
  { label: "O'zbekcha", slug: SupportedLanguageCodes.uz },
  { label: 'Русский', slug: SupportedLanguageCodes.ru },
].filter((item) => Object.values(SupportedLanguageCodes).includes(item.slug));

const LanguageSelect = ({ style }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const currentLanguage = useSelector((state) => state.ui.language);
  const currentLanguageIndex = selectItems.findIndex((item) => item.slug === currentLanguage);
  const [val, setVal] = useState(currentLanguageIndex !== -1 ? currentLanguageIndex : 0);

  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list,
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    getContentAnchorEl: null,
  };

  const handleChange = (event) => {
    const newLanguageSlug = selectItems[event.target.value].slug;
    const newRoute = location.pathname.replace(selectItems[val].slug, newLanguageSlug);
    Cookies.set(TIMTIM_ALREADY_SELECTED_LANGUAGE_COOKIE, newLanguageSlug);
    history.push(newRoute);
    setVal(event.target.value);
  };

  const iconComponent = (props) => {
    return <ArrowDropDownSharpIcon className={classnames(props.className, classes.expandIcon)} />;
  };

  return (
    <FormControl style={style}>
      <Select
        disableUnderline
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={val}
        onChange={handleChange}
      >
        {selectItems.map((item, index) => (
          <MenuItem key={index} value={index}>
            <ListItemIcon className={classes.languageIcon}>
              <LanguageIcon fontSize="inherit" />
            </ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
