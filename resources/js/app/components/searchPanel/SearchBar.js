import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, IconButton, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import { Trans } from '@lingui/macro';
import clsx from 'clsx';

import useIsMobile from '$app/hooks/useIsMobile';
import SearchIcon from '$app/icons/SearchIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.white,
    borderColor: '#D3C18D',
    borderRadius: 8,
    border: '1px solid',
    height: 48,
    minHeight: 48,
    marginBottom: 6,
    lineHeight: 3,
    textAlign: 'left',
    padding: '0 15px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    cursor: 'pointer',
    // paddingLeft: 50,
  },
  placeholder: {
    color: '#77828D',
  },
  searchText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  resetButton: {
    color: '#77828D',
    '&:hover': {
      color: '#52575C',
    },
  },
  selectionText: {
    marginLeft: 20,
  },
}));

const SearchBar = React.memo(
  ({
    regions,
    selectedRegions,
    subways,
    subwayLines,
    subwayDistance,
    selectedSubways,
    onGeofilterPanelDisplayChange,
    onClick,
    onGetResetSubwayFilters,
    onGetResetRegionsFilters,
  }) => {
    const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);
    const isMobile = useIsMobile();

    const handleClick = () => {
      if (onGeofilterPanelDisplayChange) {
        onGeofilterPanelDisplayChange(true);
      } else {
        onClick();
      }
    };

    const resetFilters = () => {
      if (selectedRegions.size) {
        onGetResetRegionsFilters();
      } else if (selectedSubways.size) {
        onGetResetSubwayFilters();
      }
    };

    const isSubwayLineSelected = (subwayLineId, subways, selectedSubways) => {
      return subways
        .filter((s) => s.subway_line === subwayLineId)
        .every((s) => selectedSubways.has(s.id));
    };
    const getSubwaysText = () => {
      const selectedLines = subwayLines
        .filter((l) => isSubwayLineSelected(l.id, subways, selectedSubways))
        .map((l) => l.id);
      const selectedLinesSet = new Set(selectedLines);

      const lineNames = subwayLines.filter((l) => selectedLinesSet.has(l.id)).map((l) => l.name);

      const subwayNames = subways
        .filter((r) => selectedSubways.has(r.id) && !selectedLinesSet.has(r.subway_line))
        .map((r) => r.name);
      return [...lineNames, ...subwayNames].join(', ');
    };
    const placeholderText = subways.length ? (
      <Trans>District, subway station</Trans>
    ) : (
      <Trans>District</Trans>
    );
    const getSelectionText = () => {
      let text;
      if (selectedRegions.size) {
        text = regions
          .filter((r) => selectedRegions.has(r.id))
          .map((r) => r.name)
          .join(', ');
      } else if (selectedSubways.size) {
        text = `${subwayDistance} мин. до: ${getSubwaysText()}`;
      }
      return text;
    };
    const classes = useStyles();
    const selectionText = getSelectionText();
    return (
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        className={clsx(classes.root, {
          [classes.placeholder]: !selectionText,
        })}
        onClick={handleClick}
      >
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={selectionText || placeholderText}
          open={tooltipIsOpen}
          onOpen={() => setTooltipIsOpen(true)}
          onClose={() => setTooltipIsOpen(false)}
          leaveDelay={isMobile ? 3000 : 0}
          placement="bottom-end"
          interactive
        >
          <Box
            className={classes.searchText}
            onClick={() => isMobile && selectionText && setTooltipIsOpen(!tooltipIsOpen)}
          >
            <SearchIcon />
            <span className={classes.selectionText}>{selectionText || placeholderText}</span>
          </Box>
        </Tooltip>
        <Box>
          <IconButton
            className={classes.resetButton}
            aria-label="delete"
            size="small"
            onClick={resetFilters}
          >
            {selectionText && <CancelIcon fontSize="inherit" />}
          </IconButton>
        </Box>
      </Box>
    );
  },
);

export default SearchBar;
