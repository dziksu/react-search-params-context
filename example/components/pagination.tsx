import * as React from 'react';
import { useSetValues, useValueSelector } from '../index';
import { useDataQuery } from '../hooks/use-data-query';

export const Pagination: React.VFC = () => {
  const { data } = useDataQuery();
  const page = useValueSelector((x) => x.page);
  const setValues = useSetValues();

  const totalPages = Math.ceil(Number(data?.info?.count || 1) / 20);

  return (
    <div>
      <button
        disabled={page <= 1}
        onClick={() => {
          setValues((state) => ({ page: Number(state?.page || 0) - 1 }));
        }}
      >
        {'<'}
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => {
          setValues((state) => ({ page: Number(state?.page || 0) + 1 }));
        }}
      >
        {'>'}
      </button>
    </div>
  );
};
