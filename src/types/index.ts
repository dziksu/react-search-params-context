export type UseSearchParamsConfig<T> = {
  defaultValues?: T;
  sync?: boolean; // default true
  omitEmpty?: boolean; // default false
  debouncedMilliseconds?: number; // default 0
};

export type UseSearchParamsResult<T> = {
  values: T | null;
  setValues: (input: ((values: T | null) => Partial<T>) | Partial<T>) => void;
  resetValues: () => void;
};

export type SearchParamsActionType = 'change';

export type SearchQueryAction<T> = {
  type: SearchParamsActionType;
  payload: Partial<T>;
};
