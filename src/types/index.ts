import React from 'react';

export type UseSearchParamsConfig<T> = {
  defaultValues?: T;
  sync?: boolean; // default true
  omitEmpty?: boolean; // default false
};

export type UseSearchParamsResult<T> = {
  values: T | null;
  setValues: (input: ((values: T | null) => Partial<T>) | Partial<T>) => void;
  resetValues: () => void;
};

export type SearchParamsActionType = 'change';

export type SearchParamsAction<T> = {
  type: SearchParamsActionType;
  payload: Partial<T>;
};

export type CreateUseSearchParamsContextResult<TValues> = {
  Provider: React.FC;
  useValueSelector: <TSelected>(
    selector?: (state: TValues) => TSelected
  ) => TSelected;
  useDebouncedValueSelector: <TSelected>(
    selector?: (state: TValues) => TSelected,
    debounceMilliseconds?: number
  ) => TSelected;
  useSetValues: () => (
    input: ((values: TValues | null) => Partial<TValues>) | Partial<TValues>
  ) => void;
  useResetValues: () => void;
};
