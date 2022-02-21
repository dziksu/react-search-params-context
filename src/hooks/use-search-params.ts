import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { debounce } from 'ts-debounce';
import { setSearchParams } from '../helpers/set-search-params';
import { getSearchParams } from '../helpers/get-search-params';
import { useSearchParamsReducer } from '../reducers';
import {
  SearchQueryAction,
  UseSearchParamsConfig,
  UseSearchParamsResult,
} from '../types';

export const useSearchParams = <TValues extends {}>(
  config?: UseSearchParamsConfig<TValues>
): UseSearchParamsResult<TValues> => {
  const [state, dispatch] = useReducer<
    Reducer<TValues | null, SearchQueryAction<TValues>>
  >(
    useSearchParamsReducer,
    !!config?.sync
      ? getSearchParams() || config?.defaultValues || null
      : config?.defaultValues || null
  );

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

  const setValuesDebounced = useRef(
    debounce(setValues, config?.debouncedMilliseconds || 0)
  );

  useEffect(() => {
    if (typeof config?.sync !== 'undefined' && !config?.sync) return;
    setSearchParams({ ...state }, config?.omitEmpty);
  }, [state]);

  return {
    values: state,
    setValues: setValuesDebounced.current,
    resetValues,
  };
};
