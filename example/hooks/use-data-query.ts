import { useQuery, UseQueryResult } from 'react-query';
import { useValueSelector } from '../index';
import { Character, PaginatedData } from '../types';

const API_URL = 'https://rickandmortyapi.com/api';

export const useDataQuery = (): UseQueryResult<PaginatedData<Character>> => {
  const values = useValueSelector((x) => x);

  return useQuery(
    ['characters', values?.page, values?.name, values?.status, values?.gender],
    async () => {
      const urlSearchParams = new URLSearchParams({
        page: (values.page || '').toString(),
        name: (values.name || '').toString(),
        status: (values.status || '').toString(),
        gender: (values.gender || '').toString(),
      }).toString();

      const [response] = await Promise.all([
        fetch(`${API_URL}/character?${urlSearchParams}`).then((x) => x.json()),
      ]);
      return response;
    }
  );
};
