import {MapPosition} from '../components/Map/MapGrid';

const distanceBetween = (
  {x: x1, y: y1}: MapPosition,
  {x: x2, y: y2}: MapPosition
): number => Math.hypot(x2 - x1, y2 - y1);

export {distanceBetween};
