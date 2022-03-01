import * as React from 'react';
import { NameFilter } from './filters/name-filter';
import { StatusFilter } from './filters/status-filter';
import { GenderFilter } from './filters/gender-filter';

export const Filters: React.VFC = () => {
  return (
    <div>
      <h1>Filters</h1>
      <div>
        <NameFilter />
        <StatusFilter />
        <GenderFilter />
      </div>
      <hr />
    </div>
  );
};
