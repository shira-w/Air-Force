import React, {FC, useEffect, useState} from 'react';
import ContentWrapper from '../content-wrapper/content-wrapper';
import HistoryChart, {HistoryData} from '../history-chart/history-chart';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {MapData} from '../../graphql/queries/map-data';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(
  createStyles({
    fullHeight: {
      height: '100%',
    },
    imageContainer: {
      height: '40%',
    },
    historyContainer: {
      height: '60%',
    },
    image: {
      borderRadius: '30%',
      width: '60%',
      maxHeight: '80%',
      padding: '0 20%',
    },
    message: {
      textAlign: 'center',
      padding: '20%',
      fontStyle: 'italic',
    },
  })
);

interface PositionDataProps {
  loading: boolean;
  mapData?: MapData | null;
}

const mapDataToHistory = (mapData: MapData): HistoryData[] =>
  mapData.history.map(({amount, petType: {description}}) => ({
    text: description,
    value: amount,
  }));

const PositionData: FC<PositionDataProps> = ({loading, mapData}) => {
  const {
    image,
    message,
    fullHeight,
    imageContainer,
    historyContainer,
  } = useStyles();
  const [history, setHistory] = useState<HistoryData[]>([]);

  useEffect(() => {
    if (mapData !== undefined && mapData !== null) {
      setHistory(mapDataToHistory(mapData));
    }
  }, [mapData]);

  if (loading) {
    return (
      <div className={message}>
        <CircularProgress
          style={{
            height: '80px',
            width: '80px',
          }}
        />
      </div>
    );
  }

  // No selected point
  if (mapData === undefined) {
    return (
      <Typography variant="h4" className={message}>
        לחץ על המפה
      </Typography>
    );
  }

  // No animal exists at location
  if (mapData === null) {
    return (
      <Typography variant="h4" className={message}>
        אין בעלי חיים בקואורדינטה הזו
      </Typography>
    );
  }

  return (
    <Grid className={fullHeight} container direction="column">
      <Grid item className={imageContainer}>
        <hr />
        <img className={image}
             src={mapData.lastPictureUrl === null ? process.env.PUBLIC_URL + '/noImage.png' : mapData.lastPictureUrl}
             alt="נקודה לא נחקה עדיין"
        />
        <hr />
      </Grid>
      <Grid item className={historyContainer}>
        <ContentWrapper header="היסטוריה" variant="body1">
          <HistoryChart history={history} />
        </ContentWrapper>
      </Grid>
    </Grid>
  );
};

export default PositionData;
