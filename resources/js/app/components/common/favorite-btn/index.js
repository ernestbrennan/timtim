import React from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: 7,
    color: 'rgb(119, 130, 141)',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&.favorite' : {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down('xs')]: {
      top: 280,
    },
    '& svg': {
      fontSize: 15
    }
  },
}));

export default ({isFavorite, className, ...rest}) => {
  const classes = useStyles()

  return (
    <IconButton
      {...rest}
      variant="outlined"
      className={classNames(className, classes.icon, isFavorite && 'favorite')}
    >
      <FavoriteIcon/>
    </IconButton>
  );
};
