import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createSearchParamsContext } from '../src';
import { Filters } from './components/filters';
import { Table } from './components/table';
import { Gender, Status } from './types';
import { Pagination } from './components/pagination';

type SearchParams = {
  page: number;
  name?: string;
  status?: Status;
  gender?: Gender;
};

export const {
  Provider: UserSearchParamsProvider,
  useValueSelector,
  useDebouncedValueSelector,
  useSetValues,
} = createSearchParamsContext<SearchParams>({
  sync: true,
  omitEmpty: true,
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
      <UserSearchParamsProvider>
        <Filters />
        <Pagination />
        <Table />
      </UserSearchParamsProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
