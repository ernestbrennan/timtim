import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StyledLink from './StyledLink';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  breadcrumbs: {
    fontSize: '13px',
  },
  item: {
    '&:hover': {
      color: theme.palette.secondary.contrastText,
    },
  },
}));

const BreadcrumbsNavBar = ({ breadcrumbsItems, style }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} style={style}>
      <Breadcrumbs className={classes.breadcrumbs} separator={'›'} aria-label="breadcrumb">
        {breadcrumbsItems.map((item, index) =>
          index !== breadcrumbsItems.length - 1 ? (
            <Box className={classes.item} key={index}>
              <StyledLink key={index} to={item.path}>
                {item.title}
              </StyledLink>
            </Box>
          ) : (
            <Typography key={index} className={classes.breadcrumbs}>
              {item.title}
            </Typography>
          ),
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNavBar;
