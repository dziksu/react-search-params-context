import * as React from 'react';
import { useSetValues, useValueSelector } from '../../index';

export const NameFilter: React.VFC = () => {
  const setValues = useSetValues();
  const name = useValueSelector((x) => x.name || '');

  return (
    <div>
      <label>Name</label>
      <input
        value={name}
        onChange={(e) => setValues({ name: e.target.value || '' })}
      />
    </div>
  );
};
