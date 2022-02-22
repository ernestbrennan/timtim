import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { t } from '@lingui/macro';
import DimSlider from '../common/slider/DimSlider';

const StyledCheckbox = (checkboxColor) => {
  return withStyles({
    root: {
      color: '#' + checkboxColor,
      '&$checked': {
        color: '#' + checkboxColor,
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
};

const useStyles = (color) =>
  makeStyles((theme) => ({
    subwayLine: {
      display: 'flex',
      flexDirection: 'column',
      '& label:nth-child(1) p': {
        fontWeight: 'bold',
      },
    },
    label: {
      fontSize: 13,
      lineHeight: 1.2,
    },
    checkbox: {
      position: 'relative',
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: 1,
        left: 18,
        top: 26,
        bottom: -12,
        border: '1px solid',
        borderColor: color,
        borderWidth: '0 0 0 1px',
      },
    },
  }));

const SubwayLine = ({
  subwayLine,
  subways,
  selectedSubways,
  onSubwaySelected,
  isLineSelected,
  onSubwayLineSelected,
  isDesktopView,
  onExpand,
  // byABC = false,
}) => {
  const handleChange = (id) => () => {
    onSubwaySelected(id);
  };

  const handleLineChange = (id) => () => {
    onSubwayLineSelected(id);
  };
  const classes = useStyles(subwayLine.color)();
  const CustomCheckbox = StyledCheckbox(subwayLine.color);

  const selectors = subways.map((subway, i) => {
    return (
      <FormControlLabel
        key={subway.id}
        control={
          <CustomCheckbox
            checked={selectedSubways.has(subway.id)}
            value={subway.id}
            onChange={handleChange(subway.id)}
            icon={<CheckBoxOutlineBlankIcon className={classes.checkbox} fontSize="small" />}
            className={i !== subways.length - 1 ? classes.checkbox : null}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        }
        label={<Typography className={classes.label}>{subway.name}</Typography>}
      />
    );
  });
  // const rednerDeviceSpeceficView(isDesktopView, children) {
  //   return
  // }
  isDesktopView = true;
  return (
    <section className={classes.subwayLine}>
      {isDesktopView ? (
        <>
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={isLineSelected}
                onChange={handleLineChange(subwayLine.id)}
                icon={<CheckBoxOutlineBlankIcon className={classes.checkbox} fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
              />
            }
            label={<Typography className={classes.label}>{subwayLine.name}</Typography>}
          />
          {selectors}
        </>
      ) : (
        <ExpansionPanel onChange={onExpand}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={isLineSelected}
                  onChange={handleLineChange(subwayLine.id)}
                  icon={<CheckBoxOutlineBlankIcon className={classes.checkbox} fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                />
              }
              label={<Typography className={classes.label}>{subwayLine.name}</Typography>}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column' }}>
            {selectors}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </section>
  );
};

const getLineSubways = (lineId, subways) => {
  return subways.filter((s) => s.subway_line === lineId).sort((a, b) => a.order - b.order);
};

const isSubwayLineSelected = (subwayLineId, subways, selectedSubways) => {
  return subways
    .filter((s) => s.subway_line === subwayLineId)
    .every((s) => selectedSubways.has(s.id));
};

const SubwaySelector = React.memo(
  ({
    subways,
    subwayLines,
    selectedSubways,
    onSubwaySelected,
    onSubwayLineSelected,
    subwayDistance,
    onSubwayDistanceChanged,
    onExpand,
    altView,
  }) => {
    const onDistanceChange = useCallback(
      (event, value) => {
        onSubwayDistanceChanged(value);
      },
      [onSubwayDistanceChanged],
    );
    const theme = useTheme();
    const isDesktopView = useMediaQuery(theme.breakpoints.up('md'));

    return (
      <Grid container item xs={12} spacing={1} justify="space-between">
        <DimSlider
          onChangeCommitted={onDistanceChange}
          defaultValue={subwayDistance}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          valueLabelFormat={(x) => t`${x} min`}
          step={5}
          min={5}
          marks
          max={40}
        />
        {subwayLines.map((item, i) => (
          <Grid item xs={12} md={12 / subwayLines.length} key={i} style={{ textAlign: 'left' }}>
            <SubwayLine
              key={i}
              subwayLine={item}
              subways={getLineSubways(item.id, subways)}
              selectedSubways={selectedSubways}
              onSubwayLineSelected={onSubwayLineSelected}
              onExpand={onExpand}
              onSubwaySelected={onSubwaySelected}
              isDesktopView={isDesktopView}
              isLineSelected={isSubwayLineSelected(item.id, subways, selectedSubways)}
              //   byABC={item.id > 1}
            />
          </Grid>
        ))}
      </Grid>
    );
  },
);
const subwayPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  is_active: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  subway_line: PropTypes.number.isRequired,
});

const subwayLinePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  is_active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  city: PropTypes.number.isRequired,
});
SubwayLine.propTypes = {
  subways: PropTypes.arrayOf(subwayPropType).isRequired,
  subwayLine: subwayLinePropType.isRequired,
  selectedSubways: PropTypes.object.isRequired,
  onSubwaySelected: PropTypes.func.isRequired,
  onSubwayLineSelected: PropTypes.func.isRequired,
  isLineSelected: PropTypes.bool.isRequired,
};

export default SubwaySelector;
