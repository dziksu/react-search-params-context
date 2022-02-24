import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { setSearchParams } from '../helpers/set-search-params';
import { getSearchParams } from '../helpers/get-search-params';
import { searchParamsReducer } from '../reducers';
import {
  SearchParamsAction,
  UseSearchParamsConfig,
  UseSearchParamsResult,
} from '../types';

const currentSearchParamsUpdater: { id?: number } = {
  id: undefined,
};

export const useSearchParams = <TValues extends {}>(
  config?: UseSearchParamsConfig<TValues>
): UseSearchParamsResult<TValues> => {
  const id = useRef(Math.ceil(Math.random() * 9999));
  const initialStoreValue = useRef(
    !!config?.sync
      ? getSearchParams() || config?.defaultValues || null
      : config?.defaultValues || null
  );

  const [state, dispatch] = useReducer<
    Reducer<TValues, SearchParamsAction<TValues>>
  >(searchParamsReducer, initialStoreValue.current || null);

  const setValues = useCallback(
    (
      input: ((values: TValues | null) => Partial<TValues>) | Partial<TValues>
    ) => {
      const payload = typeof input === 'function' ? input(state) : input;
      dispatch({ type: 'change', payload });
    },
    [state, dispatch]
  );

  const resetValues = useCallback(() => {
    dispatch({ type: 'change', payload: config?.defaultValues || {} });
  }, [state, dispatch, config?.defaultValues]);

  useEffect(() => {
    if (!config?.sync) return;
    if (!!currentSearchParamsUpdater.id) {
      console.error('You are using at least 2 contexts with flag sync as true');
    } else {
      currentSearchParamsUpdater.id = id.current;
    }
    return () => {
      if (!config?.sync) return;
    };
  }, []);

  useEffect(() => {
    if (typeof config?.sync !== 'undefined' && !config?.sync) return;
    if (
      !!currentSearchParamsUpdater.id &&
      currentSearchParamsUpdater.id !== id.current
    )
      return;
    setSearchParams({ ...state }, config?.omitEmpty);
  }, [state]);

  return {
    values: state,
    setValues,
    resetValues,
  };
};
