import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { UseSearchParamsConfig, UseSearchParamsResult } from '../types';
import { useSearchParams } from '../hooks/use-search-params';

export function createUseSearchParamsContext<TValues>(
  config: UseSearchParamsConfig<TValues>
) {
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

  const useSetValues = () => {
    return useContextSelector(Context, (s) => s.setValues);
  };

  const useResetValues = () => {
    return useContextSelector(Context, (s) => s.resetValues);
  };

  const result: {
    Provider: React.FC;
    useValueSelector: <TSelected>(
      selector?: (state: TValues) => TSelected
    ) => TSelected;
    useSetValues: () => (
      input: ((values: TValues | null) => Partial<TValues>) | Partial<TValues>
    ) => void;
    useResetValues: () => void;
  } = {
    Provider: (props) => {
      const searchQueryHook = useSearchParams<TValues>(config);
      return (
        <Context.Provider value={searchQueryHook}>
          {props.children}
        </Context.Provider>
      );
    },
    useValueSelector,
    useSetValues,
    useResetValues,
  };

  return result;
}
