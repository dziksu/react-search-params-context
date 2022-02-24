import { useQuery } from 'react-query';
import { useDebouncedValueSelector } from '../index';

export const useDataQuery = () => {
  const values = useDebouncedValueSelector((x) => x, 500);

  return useQuery(
    ['characters', values?.page, values?.name, values?.status],
    async () => {
      const [response] = await Promise.all([
        fetch(
          `https://rickandmortyapi.com/api/character?page=${
            values.page || ''
          }&name=${values.name || ''}&status=${values.status || ''}`
        ).then((x) => x.json()),
      ]);
      return response;
    }
  );
};
