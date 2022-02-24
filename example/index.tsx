import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createSearchParamsContext, useSearchParams } from '../src';
import { Filters } from './components/filters';
import { Table } from './components/table';
import { RerenderCounter } from './components/rerender-counter';

type SearchQueryParams = {
  page: number;
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
};

const { values, setValues, resetValues } = useSearchParams({
  sync: true,
  omitEmpty: true,
  defaultValues: {
    page: 1,
    search: 'john',
    age: 24,
  },
});

export const {
  Provider: SearchParamsProvider,
  useValueSelector,
  useDebouncedValueSelector,
  useSetValues,
} = createSearchParamsContext<SearchQueryParams>({
  sync: true,
  omitEmpty: true,
  defaultValues: {
    page: 1,
  },
});

export const {
  Provider: ASearchParamsProvider,
  useValueSelector: a,
  useDebouncedValueSelector: b,
  useSetValues: c,
} = createSearchParamsContext<SearchQueryParams>({
  sync: false,
  omitEmpty: true,
  defaultValues: {
    page: 3,
  },
});

const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 20000,
    },
  },
});

const App: React.VFC = () => {
  return (
    <QueryClientProvider client={clientQuery}>
      <RerenderCounter />
      <SearchParamsProvider>
        <Filters />
        <Table />
      </SearchParamsProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
