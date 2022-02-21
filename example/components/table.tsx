import * as React from 'react';
import { RerenderCounter } from './rerender-counter';
import { useDataQuery } from '../hooks/use-data-query';

export const Table: React.FC = () => {
  const dataQuery = useDataQuery();

  return (
    <div>
      <h1>Table</h1>
      <RerenderCounter />
      <div>
        <ul>
          {dataQuery?.data?.results?.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
        {!dataQuery?.data?.results && <p>No results</p>}
      </div>
    </div>
  );
};
