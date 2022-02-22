import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles, Grid} from "@material-ui/core";
import classnames from "classnames";



const useStyles = (embedded) => makeStyles((theme) => ({
  root: {
    width: embedded ? 330 : 450,
    background: '#fff',
    borderRadius: '16px',
    position: embedded ? undefined : 'absolute',
    top: embedded ? undefined : 350,
    left: embedded ? undefined : 'calc(50vw - 100px)',
    justifyItems: 'center',
    alignItems: 'center',
    padding: embedded ? '24px 0' : 15,
    boxShadow: embedded ? undefined : '0px 10px 20px rgba(0, 0, 0, 0.06)',
    zIndex: 1,

  },
  type: {
    width: 200,
    backgroundColor: theme.palette.primary.lightGrey,
    borderRadius: 50,
    color: theme.palette.primary.darkGrey,
    fontSize: 13,
    fontWeight: 400,
    cursor: 'pointer',
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: 15,
      height: 15,
      marginRight: 10
    },

    [theme.breakpoints.down('md')]: {
      width: 160,
    },
  },
  selected: {
    background: theme.palette.primary.gradient,
    color: theme.palette.primary.white,
  },
}));

export default ({realtyTypes, realtyTypesSelected, onRealtyTypesSelectChange, embedded}) => {
  const classes = useStyles(embedded)();

  return (
    <Grid spacing={2} container className={classes.root}>
      {realtyTypes.map((type, index) => (
          <Grid item key={index} xs={6} >
            <div
              onClick={() => onRealtyTypesSelectChange(type.value)}
              className={classnames(classes.type, { [classes.selected]: realtyTypesSelected.has(type.value) })}
            >
              <svg data-src={type.icon}/>{type.label}
            </div>
          </Grid>
        )
      )}
    </Grid>
  );
}