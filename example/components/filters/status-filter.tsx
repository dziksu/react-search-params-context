import * as React from 'react';
import { useSetValues, useValueSelector } from '../../index';

export const StatusFilter: React.VFC = () => {
  const setValues = useSetValues();
  const status = useValueSelector((x) => x.status || '');

  return (
    <div>
      <label>Status</label>
      <select
        value={status || ''}
        onChange={(e) => setValues({ status: e.target.value as any })}
      >
        <option value="">No selected</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">unknown</option>
      </select>
    </div>
  );
};
