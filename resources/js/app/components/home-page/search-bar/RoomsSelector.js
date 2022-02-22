import {getRoomValues} from "$app/components/searchPanel/FilterPanel";
import {roomCounts} from "$js/utils/realty";
import Box from "@material-ui/core/Box";
import CircleSelector from "$app/components/selectors/CircleSelector";
import React from "react";

export default ({rooms, onRoomFilterValueAdded, onRoomFilterValueRemoved, embedded, ...props}) => {
  const roomValues = getRoomValues(roomCounts, rooms);
  const roomsSelectorStyle = {
    background: '#fff',
    borderRadius: '16px',
    position: embedded ? undefined : 'absolute',
    top: embedded ? undefined : 350,
    left: embedded ? undefined : 'calc(50vw - 590px)',
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    padding: embedded ? '24px 0' : '8px 0 16px 16px',
    boxShadow: embedded ? undefined : '0px 10px 20px rgba(0, 0, 0, 0.06)',
    zIndex: 1
  };

  return (
    <Box style={roomsSelectorStyle}>
      <CircleSelector
        values={roomValues}
        onSelect={onRoomFilterValueAdded}
        onDeselect={onRoomFilterValueRemoved}
        altView
        {...props}
      >
      </CircleSelector>
    </Box>
  );
}