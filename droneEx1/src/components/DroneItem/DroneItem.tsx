import React, {FC} from 'react';
import ListItem from '../ListItem/ListItem';
import {IconType} from 'react-icons';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import {
  FaBatteryEmpty,
  FaBatteryQuarter,
  FaBatteryHalf,
  FaBatteryThreeQuarters,
  FaBatteryFull,
} from 'react-icons/fa';
import {MdLocationSearching} from 'react-icons/md';

interface DroneItemProps {
  id: number;
  battery: number;
  name: string;
  distance: number;
  departureTime: string;
  hidden: boolean;
  available: boolean;
  onTargetClick: (id: number) => void;
  onEyeClick: (id: number) => void;
}

const getBatteryIcon = (batteryValue: number): IconType => {
  if (batteryValue === 0) {
    return FaBatteryEmpty;
  }

  if (batteryValue < 25) {
    return FaBatteryQuarter;
  }

  if (batteryValue < 50) {
    return FaBatteryHalf;
  }

  if (batteryValue < 75) {
    return FaBatteryThreeQuarters;
  }

  return FaBatteryFull;
};

const formatDate = (date: string): string => {
  const time = new Date(date).toTimeString();

  return time.split(' ')[0];
};

const DroneItem: FC<DroneItemProps> = ({
  id,
  battery,
  name,
  distance,
  hidden,
  available,
  departureTime,
  onTargetClick,
  onEyeClick,
}) => {
  const droneActions = [
    {
      icon: MdLocationSearching,
      onClick: () => onTargetClick(id),
      disabled: !available,
    },
    {
      icon: hidden ? AiFillEyeInvisible : AiFillEye,
      onClick: () => onEyeClick(id),
    },
  ];

  return (
    <ListItem
      icon={getBatteryIcon(battery)}
      heading={name}
      subtitle1={`מרחק מהמטרה: ${distance.toFixed(1)} קײמ`}
      subtitle2={`שעת המראה: ${formatDate(departureTime)}`}
      actions={droneActions}
    />
  );
};

export default DroneItem;
