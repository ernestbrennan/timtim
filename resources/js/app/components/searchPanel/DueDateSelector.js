import { makeStyles, Slider, withStyles } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { Trans } from '@lingui/macro';

const useDueDateStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '75px',
  },
  textContainer: {
    minWidth: 110,
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    flexGrow: 1,
    marginRight: '12px',
  },
  sliderLabel: {
    marginLeft: 110,
  },
}));

const DueDateSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '0.5px solid rgba(0, 0, 0, 0.04)',
    boxShadow:
      '0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 1px rgba(0, 0, 0, 0.16), 0px 3px 1px rgba(0, 0, 0, 0.1)',
    marginTop: -12,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 1px rgba(0, 0, 0, 0.16), 0px 3px 1px rgba(0, 0, 0, 0.1)',
    },
  },
})(Slider);

const romanNumbersDict = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
};

class YearQuarterDescriptor {
  year;
  quarter;

  constructor(year, quarter) {
    this.quarter = quarter;
    this.year = year;
  }

  toString() {
    return (
      <Trans>
        {romanNumbersDict[this.quarter]} quarter of {this.year}
      </Trans>
    );
  }
}

const currentLuxonDate = DateTime.local();

function getQuarterDescriptorForIndex(index) {
  const yearsInIndex = Math.floor(index / 4);
  const quarterInIndex = index - yearsInIndex * 4;
  const finalDate = currentLuxonDate.plus({
    years: yearsInIndex,
    quarter: quarterInIndex,
  });
  if (index === 24) {
    new YearQuarterDescriptor(3000, 4);
  }
  return new YearQuarterDescriptor(finalDate.year, finalDate.quarter);
}

function getSliderMarks() {
  return Array(26)
    .fill(1)
    .map((_value, index) => ({
      value: index * 4,
      quarter: getQuarterDescriptorForIndex(index),
    }));
}

function convertSliderValueToFilter(value, marks) {
  if (value === 100) {
    return {
      year_max: 3000,
      year_min: 2000,
      quarter_max: 4,
      quarter_min: 1,
    };
  }
  const valueQuarterDescriptor = marks.find((mark) => mark.value === value)?.quarter;

  return {
    year_max: valueQuarterDescriptor.year,
    year_min: 2000,
    quarter_max: valueQuarterDescriptor.quarter,
    quarter_min: 1,
  };
}

function getValueFromDueDate(dueDate, marks) {
  const markIndexForDueDate = marks.findIndex(
    (mark) =>
      dueDate.year_max === mark.quarter.year && dueDate.quarter_max === mark.quarter.quarter,
  );
  return markIndexForDueDate === -1 ? 100 : markIndexForDueDate * 4;
}

let latestTimeoutId;

const DueDateSelector = ({ onChange, dueDate }) => {
  const styles = useDueDateStyles();
  const marks = useMemo(getSliderMarks, []);
  const [shouldCallOnChange, setShouldCallOnChange] = useState(false);
  const [value, setValue] = useState(() => {
    if (!dueDate || dueDate.year_max >= 3000) {
      return 100;
    }
    return getValueFromDueDate(dueDate, marks);
  });
  const onSliderMove = (_event, newValue) => {
    setValue(newValue);
    window.clearTimeout(latestTimeoutId);
    latestTimeoutId = window.setTimeout(() => setShouldCallOnChange(true), 300);
  };
  useEffect(() => {
    if (shouldCallOnChange) {
      onChange(convertSliderValueToFilter(value, marks));
      setShouldCallOnChange(false);
    }
    // eslint-disable-next-line
  }, [onChange, shouldCallOnChange, marks]);
  return (
    <div className={styles.root}>
      <div className={styles.sliderLabel}>
        {value === 100 ? <Trans>Any</Trans> : marks[value / 4].quarter.toString()}
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.textContainer}>
          <Trans>Completion</Trans>
        </div>
        <div className={styles.sliderContainer}>
          <DueDateSlider value={value} marks={marks} step={null} onChange={onSliderMove} />
        </div>
      </div>
    </div>
  );
};

export default DueDateSelector;
