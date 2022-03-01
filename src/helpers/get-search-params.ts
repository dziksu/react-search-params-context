export const getSearchParams = (): any | null => {
  if (typeof window === 'undefined' || !window.location.search) return null;

  const urlSearchQuery = new URLSearchParams(window.location.search);

  return Array.from(urlSearchQuery.entries()).reduce<{
    [key: string]: string | any;
  }>((acc, entry) => {
    const key = entry[0] || '';
    const value = decodeURIComponent(entry[1]);

    acc[key] = value;
    if (value.startsWith('{') || value.startsWith('[')) {
      acc[key] = JSON.parse(value);
    }
    if (value === 'true' || value === 'false') {
      acc[key] = Boolean(value === 'true');
    }
    return acc;
  }, {});
};
