import {
  grayColor,
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  blackColor,
  hexToRgb,
} from "$admin/assets/jss/index.js";

export default {
  button: {
    minHeight: "auto",
    minWidth: "auto",
    backgroundColor: grayColor[0],
    color: whiteColor,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.12)",
    border: "none",
    borderRadius: "3px",
    position: "relative",
    padding: "12px 30px",
    margin: ".3125rem 1px",
    fontSize: "12px",
    fontWeight: "400",
    textTransform: "none",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    '&.Mui-selected': {
      backgroundColor: grayColor[0],
      color: whiteColor,
      '&:hover': {
        backgroundColor: grayColor[0],
      },
    },
    '&:hover': {
      backgroundColor: grayColor[0],
      color: whiteColor,
    },

    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      display: "inline-block",
      top: "0",
      marginTop: "-1em",
      marginBottom: "-1em",
      fontSize: "1.1rem",
      marginRight: "4px",
      verticalAlign: "middle",
    },
    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      width: "18px",
      height: "18px",
      marginRight: "4px",
      verticalAlign: "middle",
    },
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginTop: "0px",
        position: "absolute",
        width: "100%",
        transform: "none",
        left: "0px",
        top: "0px",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px",
      },
    },
  },
  primary: {
    '&.Mui-selected': {
      backgroundColor: primaryColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.12)",
      '&:hover': {
        backgroundColor: primaryColor[0],
        boxShadow:
          "0 14px 26px -12px rgba(" +
          hexToRgb(primaryColor[0]) +
          ", 0.42), 0 4px 23px 0px rgba(" +
          hexToRgb(blackColor) +
          ", 0.12), 0 8px 10px -5px rgba(" +
          hexToRgb(primaryColor[0]) +
          ", 0.2)",
      },
    },
    '&:hover': {
      backgroundColor: primaryColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.2)",
    },
  },
  info: {
    '&.Mui-selected': {
      backgroundColor: infoColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.12)",
      '&:hover': {
        backgroundColor: infoColor[0],
        boxShadow:
          "0 2px 2px 0 rgba(" +
          hexToRgb(infoColor[0]) +
          ", 0.14), 0 3px 1px -2px rgba(" +
          hexToRgb(infoColor[0]) +
          ", 0.2), 0 1px 5px 0 rgba(" +
          hexToRgb(infoColor[0]) +
          ", 0.12)",
      },
    },
    '&:hover': {
      backgroundColor: infoColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.12)",
    },
  },
  success: {
    '&.Mui-selected': {
      backgroundColor: successColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.12)",
      '&:hover': {
        backgroundColor: successColor[0],
        boxShadow:
          "0 2px 2px 0 rgba(" +
          hexToRgb(successColor[0]) +
          ", 0.14), 0 3px 1px -2px rgba(" +
          hexToRgb(successColor[0]) +
          ", 0.2), 0 1px 5px 0 rgba(" +
          hexToRgb(successColor[0]) +
          ", 0.12)",
      },
    },
    '&:hover': {
      backgroundColor: successColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.12)",
    },
  },
  warning: {
    '&.Mui-selected': {
      backgroundColor: warningColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.12)",
      '&:hover': {
        backgroundColor: warningColor[0],
        boxShadow:
          "0 2px 2px 0 rgba(" +
          hexToRgb(warningColor[0]) +
          ", 0.14), 0 3px 1px -2px rgba(" +
          hexToRgb(warningColor[0]) +
          ", 0.2), 0 1px 5px 0 rgba(" +
          hexToRgb(warningColor[0]) +
          ", 0.12)",
      },
    },
    '&:hover': {
      backgroundColor: warningColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.12)",
    },
  },
  danger: {
    '&.Mui-selected': {
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.12)",
      '&:hover': {
        backgroundColor: dangerColor[0],
        boxShadow:
          "0 2px 2px 0 rgba(" +
          hexToRgb(dangerColor[0]) +
          ", 0.14), 0 3px 1px -2px rgba(" +
          hexToRgb(dangerColor[0]) +
          ", 0.2), 0 1px 5px 0 rgba(" +
          hexToRgb(dangerColor[0]) +
          ", 0.12)",
      },
    },
    '&:hover': {
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.12)",
    },
  },
  rose: {
    '&.Mui-selected': {
      backgroundColor: roseColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.12)",
      '&:hover': {
        backgroundColor: roseColor[0],
        boxShadow:
          "0 2px 2px 0 rgba(" +
          hexToRgb(roseColor[0]) +
          ", 0.14), 0 3px 1px -2px rgba(" +
          hexToRgb(roseColor[0]) +
          ", 0.2), 0 1px 5px 0 rgba(" +
          hexToRgb(roseColor[0]) +
          ", 0.12)",
      },
    },
    '&:hover': {
      backgroundColor: roseColor[0],
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.2), 0 1px 5px 0 rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.12)",
    },
  },
  simple: {
    "&,&:focus,&:hover": {
      color: whiteColor,
      background: "transparent",
      boxShadow: "none",
    },
    "&$primary": {
      "&,&:focus,&:hover,&:visited": {
        color: primaryColor[0],
      },
    },
    "&$info": {
      "&,&:focus,&:hover,&:visited": {
        color: infoColor[0],
      },
    },
    "&$success": {
      "&,&:focus,&:hover,&:visited": {
        color: successColor[0],
      },
    },
    "&$warning": {
      "&,&:focus,&:hover,&:visited": {
        color: warningColor[0],
      },
    },
    "&$rose": {
      "&,&:focus,&:hover,&:visited": {
        color: roseColor[0],
      },
    },
    "&$danger": {
      "&,&:focus,&:hover,&:visited": {
        color: dangerColor[0],
      },
    },
  },
  transparent: {
    "&,&:focus,&:hover": {
      color: "inherit",
      background: "transparent",
      boxShadow: "none",
    },
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none",
  },
  lg: {
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
        marginTop: "-4px",
      },
    },
    padding: "1.125rem 2.25rem",
    fontSize: "0.875rem",
    lineHeight: "1.333333",
    borderRadius: "0.2rem",
  },
  sm: {
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
        marginTop: "1px",
      },
    },
    padding: "0.40625rem 1.25rem",
    fontSize: "0.6875rem",
    lineHeight: "1.5",
    borderRadius: "0.2rem",
  },
  round: {
    borderRadius: "30px",
  },
  justIcon: {
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "20px",
    height: "41px",
    minWidth: "41px",
    width: "41px",
    "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
      marginRight: "0px",
    },
    "&$lg": {
      height: "57px",
      minWidth: "57px",
      width: "57px",
      lineHeight: "56px",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "32px",
        lineHeight: "56px",
      },
      "& svg": {
        width: "32px",
        height: "32px",
      },
    },
    "&$sm": {
      height: "30px",
      minWidth: "30px",
      width: "30px",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "17px",
        lineHeight: "29px",
      },
      "& svg": {
        width: "17px",
        height: "17px",
      },
    },
  },
};
