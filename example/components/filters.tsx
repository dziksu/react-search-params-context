import * as React from 'react';
import { useSetValues, useValueSelector } from '../index';
import { RerenderCounter } from './rerender-counter';

export const Filters: React.VFC = () => {
  const setValues = useSetValues();
  const values = useValueSelector((x) => x);

  return (
    <div>
      <h1>Filters</h1>
      <RerenderCounter />
      <div>
        <div>
          Page
          <input
            min={1}
            value={values?.page}
            type="number"
            onChange={(e) => setValues({ page: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          Name
          <input
            value={values?.name || ''}
            onChange={(e) => setValues({ name: e.target.value || '' })}
          />
        </div>
        <div>
          Status
          <select
            value={values?.status || ''}
            onChange={(e) => setValues({ status: e.target.value as any })}
          >
            <option value="">No selected</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
        </div>
      </div>
      <hr />
    </div>
  );
};
