import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createUseSearchParamsContext } from '../src';
import { Filters } from './components/filters';
import { Table } from './components/table';
import { RerenderCounter } from './components/rerender-counter';

type SearchQueryParams = {
  page: number;
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
};

export const {
  Provider: UseSearchParamsProvider,
  useValueSelector,
  useSetValues,
} = createUseSearchParamsContext<SearchQueryParams>({
  sync: true,
  omitEmpty: true,
  debouncedMilliseconds: 0,
  defaultValues: {
    page: 1,
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
      <UseSearchParamsProvider>
        <RerenderCounter />
        <Filters />
        <Table />
      </UseSearchParamsProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
