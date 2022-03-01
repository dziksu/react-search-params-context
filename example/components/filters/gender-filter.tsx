import * as React from 'react';
import { useSetValues, useValueSelector } from '../../index';

export const GenderFilter: React.VFC = () => {
  const setValues = useSetValues();
  const gender = useValueSelector((x) => x.gender || '');

  return (
    <div>
      <label>Gender</label>
      <select
        value={gender || ''}
        onChange={(e) => setValues({ gender: e.target.value as any })}
      >
        <option value="">No selected</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
    </div>
  );
};
