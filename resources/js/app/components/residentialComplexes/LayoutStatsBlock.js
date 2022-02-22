import React from 'react';
import Text, { TextWeight } from '../common/Text';
import { Trans } from '@lingui/macro';

import { ReactComponent as DoorIcon } from '$app/icons/DoorIcon.svg';
import { ReactComponent as AngleIcon } from '$app/icons/AngleIcon.svg';
import { ReactComponent as BuildingIcon } from '$app/icons/BuildingIcon.svg';

function RoomsNumberFragment({ roomsNumber }) {
  return (
    <>
      <DoorIcon style={{ paddingBottom: '2px' }} /> <Trans>{roomsNumber} r</Trans>
    </>
  );
}

function AreaFragment({ area }) {
  return (
    <>
      <AngleIcon style={{ paddingBottom: '2px', marginLeft: '12px' }} />{' '}
      <Trans>
        {area} m{'\u00B2'}
      </Trans>
    </>
  );
}

class FloorRange {
  min;
  max;

  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  toString() {
    return `${this.min}-${this.max}`;
  }
}

function getFloorsRangesFromFloors(floors) {
  const sortedFloors = [...floors].sort((a, b) => Number(a) - Number(b));
  let ranges = [];
  let currentRangeStart = sortedFloors[0];
  let currentRangeEnd = sortedFloors[1];
  sortedFloors.forEach((floorNumber, index) => {
    currentRangeEnd = floorNumber;
    if (!sortedFloors[index + 1] || sortedFloors[index + 1] > floorNumber + 1) {
      ranges.push(new FloorRange(currentRangeStart, currentRangeEnd));
      currentRangeStart = sortedFloors[index + 1];
    }
  });
  if (ranges.length === 0) {
    ranges.push(new FloorRange(currentRangeStart, currentRangeStart));
  }
  return ranges;
}

function FloorsFragment({ floors }) {
  const floorsRangesString = getFloorsRangesFromFloors(floors)
    .reduce(
      (acc, range) =>
        range.min === range.max ? acc + ` ${range.min},` : acc + ` ${range.toString()},`,
      '',
    )
    .slice(0, -1);
  return (
    <>
      <BuildingIcon style={{ paddingBottom: '2px', marginLeft: '12px' }} />{' '}
      <Trans>{floorsRangesString} floor</Trans>
    </>
  );
}

export default function LayoutStatsBlock({ layout }) {
  return (
    <Text size={13} weight={TextWeight.bold}>
      <RoomsNumberFragment roomsNumber={layout.rooms_num} />,
      <AreaFragment area={layout.size_total} />,
      <FloorsFragment floors={layout.floors_range} />
    </Text>
  );
}
