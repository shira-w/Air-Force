import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";

//Todo - add the mutation

interface Variables {
  id: number;
  x: number;
  y: number;
}

const useCreateEvent = () => {
  return useMutation<{}, Variables>(CREATE_EVENT);
};

export {useCreateEvent};
