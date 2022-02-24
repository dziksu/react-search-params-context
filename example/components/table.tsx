import * as React from 'react';
import { RerenderCounter } from './rerender-counter';
import { useDataQuery } from '../hooks/use-data-query';

export const Table: React.VFC = () => {
  const { data } = useDataQuery();

  return (
    <div>
      <h1>Table</h1>
      <RerenderCounter />
      <div>
        <ul>
          {data?.results?.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
        {!data?.results && <p>No results</p>}
      </div>
    </div>
  );
};
