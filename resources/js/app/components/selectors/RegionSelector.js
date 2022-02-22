import React, { useMemo } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    lineHeight: 1.2,
  },
}));

const RegionSelectorControl = React.memo(({ isSelected, columns, value, label, onChange }) => {
  const styles = {
    label: {
      fontSize: 14,
      lineHeight: 1.2,
    },
  };

  return (
    <Grid item xs={12} md={12 / columns} style={{ textAlign: 'left' }}>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={isSelected}
            value={value}
            onChange={() => onChange(value)}
          />
        }
        label={<Typography style={styles.label}>{label}</Typography>}
      />
    </Grid>
  );
});
const RegionSelectorGroup = React.memo(
  ({ name, regions, showHeader, columns, selectedRegions, onChange }) => {
    const classes = useStyles();
    const selectors = regions.map((region, i) => {
      return (
        <RegionSelectorControl
          key={i}
          columns={columns}
          label={region.name}
          value={region.id}
          onChange={onChange}
          isSelected={selectedRegions.has(region.id)}
        />
      );
    });
    return (
      <section>
        {showHeader && <h3 className={classes.header}>{name}</h3>}
        <Grid container item xs={12} spacing={0} justify="space-between">
          {selectors}
        </Grid>
      </section>
    );
  },
);

let regionsByCategories;
const RegionSelector = React.memo(
  ({ regions, regionCategories, selectedRegions, onRegionSelected, altView }) => {
    regionsByCategories = useMemo(() => {
      return regionCategories.reduce((acc, c) => {
        acc[c.id] = regions
          .filter((r) => r.category === c.id)
          .sort((a, b) => a.name.localeCompare(b.name));

        return acc;
      }, {});
    }, [regionCategories, regions]);

    return (
      <div>
        {regionCategories.map((item, i) => (
          <RegionSelectorGroup
            key={i}
            name={item.name}
            regions={regionsByCategories[item.id]}
            showHeader
            columns={item.id > 1 ? 2 : 3}
            selectedRegions={selectedRegions}
            onChange={onRegionSelected}
          />
        ))}
      </div>
    );
  },
);
const regionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  is_active: PropTypes.bool.isRequired,
  city: PropTypes.number.isRequired,
  category: PropTypes.number.isRequired,
});

const regionCategoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  is_active: PropTypes.bool.isRequired,
  short_name: PropTypes.string.isRequired,
});
RegionSelector.propTypes = {
  regions: PropTypes.arrayOf(regionPropType).isRequired,
  regionCategories: PropTypes.arrayOf(regionCategoryPropType).isRequired,
  onRegionSelected: PropTypes.func.isRequired,
  selectedRegions: PropTypes.object.isRequired,
};

export default RegionSelector;
