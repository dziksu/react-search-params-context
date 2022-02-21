export const setSearchParams = <T = {}>(
  searchQueryData: T,
  omitEmpty?: boolean
): void => {
  const searchQuery = new URLSearchParams();

  Object.entries(searchQueryData).forEach(([key, value]) => {
    if (
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      typeof value === 'number'
    ) {
      if ((omitEmpty && !!String(value)) || !omitEmpty) {
        searchQuery.set(key, String(value));
      }
      return;
    }
    if ((omitEmpty && !!value) || !omitEmpty) {
      searchQuery.set(key, encodeURIComponent(JSON.stringify(value)));
    }
  });

  window.history.replaceState(
    {},
    '',
    `${window.location.origin}${
      window.location.pathname
    }?${searchQuery.toString()}`
  );
};
