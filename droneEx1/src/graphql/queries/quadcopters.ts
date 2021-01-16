import gql from 'graphql-tag';
import {useQuery, QueryHookOptions} from '@apollo/react-hooks';

export interface Quadcopter {
  id: number;
  name: string;
  launchtime: string;
  isfree: boolean;
  battery: number;
  x: number;
  y: number;
}

interface Data {
  allQuadcopters: Quadcopter[];
}

//TODO - add the query here



const options: QueryHookOptions = {
  pollInterval: 1000,
};

const useQuadcopterQuery = () => {
  return useQuery<Data, {}>(GET_QUADCOPTERS, options);
};

export {useQuadcopterQuery};
