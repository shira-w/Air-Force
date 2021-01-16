import React, { FC, useState, Fragment } from 'react';
import MapGrid, { MapItemDesc, MapPosition } from '../Map/MapGrid';
import { MdLocationSearching } from 'react-icons/md';
import DrawerContentLayout from '../DrawerContent/DrawerContentLayout';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useCreateEvent } from '../../graphql/mutations/create-event';
import {
  useQuadcopterQuery,
  Quadcopter,
} from '../../graphql/queries/quadcopters';
import { useMapDataLazyQuery } from '../../graphql/queries/map-data';
import DroneItem from '../DroneItem/DroneItem';
import PositionData from '../PositionData/PositionData';
import AppLayout from '../AppLayout/AppLayout';
import { distanceBetween } from '../../utils/map-utils';
import DroneIcon from '../DroneIcon/DroneIcon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles } from '@material-ui/core/styles/';

const BACKGROUND_IMAGE =
  'https://previews.123rf.com/images/pbardocz/pbardocz1905/pbardocz190500880/122638204-black-and-white-vector-city-map-of-berlin-with-well-organized-separated-layers-.jpg';

export interface Drone extends Quadcopter {
  distance: number;
}
const useStyles = makeStyles(
  createStyles({

    head: {
      textAlign: 'center',
      margin: '0 auto'
    },
  })
);

const droneToMapItem = ({ id, x, y, name, distance }: Drone): MapItemDesc => ({
  id,
  position: {
    x,
    y,
  },
  icon: DroneIcon,
  offsetElement: (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="caption">{name}</Typography>
      </Grid>
      {distance !== 0 && (
        <Grid item>
          <Typography variant="caption">{`מרחק: ${distance.toFixed(
            1
          )} קײמ`}</Typography>
        </Grid>
      )}
    </Grid>
  ),
});

const DroneLayer: FC<{}> = () => {
  const { head } = useStyles();

  const [pinPosition, setPinPosition] = useState<MapPosition>();
  const [filteredDrones, setFilteredDrones] = useState<number[]>([]);

  const [createEvent] = useCreateEvent();

  const [
    getMapData,
    { data: mapDataResult, loading: mapDataLoading },
  ] = useMapDataLazyQuery();

  const { data: droneData } = useQuadcopterQuery();
  const drones: Drone[] = droneData
    ? droneData.allQuadcopters.map(quad => {
      const { x, y } = quad;

      return {
        ...quad,
        distance: pinPosition ? distanceBetween({ x, y }, pinPosition) : 0,
      };
    })
    : [];

  const onMapClick = (position: MapPosition) => {
    const { x, y } = position;

    getMapData({ variables: { x, y } });
    setPinPosition(position);
  };

  const onEyeClick = (id: number) => {
    const index = filteredDrones.indexOf(id);

    if (index > -1) {
      filteredDrones.splice(index, 1);
      setFilteredDrones([...filteredDrones]);
    } else {
      setFilteredDrones([...filteredDrones, id]);
    }
  };

  const onTargetClick = (id: number) => {
    if (pinPosition) {
      createEvent({ variables: { id, ...pinPosition } });
    }
  };

  return (
    <>
    {/* */}
      <AppBar position="static" >
        <Toolbar variant="dense" >
        <img src="ofekIcon.svg" alt='icon' style={{height:'50px', width:'auto'}}></img>

          <Typography  variant="h6" color="textSecondary">
         DRONES MANAGEMMENT

          </Typography>
        </Toolbar>
      </AppBar>

      {/*Add MapGrid component inside AppLayout dim is 100 * 100 
      <AppLayout
          map={
          <>
            <MapGrid
              mapSrc={BACKGROUND_IMAGE}
              dimX={100}
              dimY={100}
              todo - add the rest of the map params
            />
          </>
        }
        drawer={
          <DrawerContentLayout
            listHeader="רחפנים"
            listElements={
              <>
              todo -- add the list of quad and all the params
              </>
            }
            positionData={
              <PositionData
                loading={mapDataLoading}
                mapData={mapDataResult && mapDataResult.mapData}
              />
            }
          />
        }
      />
        
      */}


    </>
  );
};

export default DroneLayer;
