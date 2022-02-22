import React from 'react';
import RealtyProperty from './RealtyProperty';
import { getFloorText, getSizeText, getRoomsText } from '$app/utlis/flat';
import SizeIcon from '$app/icons/SizeIcon';
import RoomIcon from '$app/icons/RoomIcon';
import FloorIcon from '$app/icons/FloorIcon';

const FlatProperties = ({ roomCount, sizeTotal, floor, floorCount }) => {
  const properties = [
    { icon: RoomIcon, value: getRoomsText(roomCount) },
    { icon: SizeIcon, value: getSizeText(Math.round(sizeTotal)) },
    { icon: FloorIcon, value: getFloorText(floor, floorCount) },
  ].filter((p) => p.value !== null);
  return (
    <>
      {properties.map((p, index) => {
        return (
          <RealtyProperty key={index} Icon={p.icon}>
            {p.value}
          </RealtyProperty>
        );
      })}
    </>
  );
};

export default FlatProperties;
