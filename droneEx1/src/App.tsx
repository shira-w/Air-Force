import React, {FC} from 'react';
import DroneLayer from './components/DroneLayer/DroneLayer';
import {ApolloProvider} from '@apollo/react-hooks';
import {getClient} from './graphql/graphql-client/graphql-client';
import './App.css';

// Drone Layer Project
const App: FC = () => {
  return (
    <ApolloProvider client={getClient()}>
      <div className="App">
        <DroneLayer />
      </div>
    </ApolloProvider>
  );
};

export default App;
