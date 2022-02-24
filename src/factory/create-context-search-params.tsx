import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import {
  CreateUseSearchParamsContextResult,
  UseSearchParamsConfig,
  UseSearchParamsResult,
} from '../types';
import { useSearchParams } from '../hooks/use-search-params';
import { debounce } from 'ts-debounce';

export function createSearchParamsContext<TValues>(
  config: UseSearchParamsConfig<TValues>
): CreateUseSearchParamsContextResult<TValues> {
  const Context = createContext<UseSearchParamsResult<TValues>>({
    values: config.defaultValues || null,
    setValues: () => null,
    resetValues: () => null,
  });

  const useValueSelector = (
    selector?: (state: TValues) => Partial<TValues>
  ): any | null => {
    return useContextSelector(Context, (s) =>
      !selector ? s.values : selector(s.values as TValues)
    );
  };

  const useDebouncedValueSelector = (
    selector?: (state: TValues) => Partial<TValues>,
    debounceMilliseconds?: number
  ): any | null => {
    const value = useContextSelector(Context, (s) =>
      !selector ? s.values : selector(s.values as TValues)
    );

    const [debouncedValues, setDebouncedValues] = useState(value);

    const debounced = useRef(
      debounce((params) => {
        return setDebouncedValues(params);
      }, debounceMilliseconds || 500)
    );

    useEffect(() => {
      debounced.current(value);
    }, [value]);

    return useMemo(() => debouncedValues, [debouncedValues]);
  };

  const useSetValues = () => {
    return useContextSelector(Context, (s) => s.setValues);
  };

  const useResetValues = () => {
    return useContextSelector(Context, (s) => s.resetValues);
  };

  return {
    Provider: (props) => {
      const searchQueryHook = useSearchParams<TValues>(config);
      return (
        <Context.Provider value={searchQueryHook}>
          {props.children}
        </Context.Provider>
      );
    },
    useValueSelector,
    useDebouncedValueSelector,
    useSetValues,
    useResetValues,
  };
}
