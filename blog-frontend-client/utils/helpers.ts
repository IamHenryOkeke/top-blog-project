// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function paramsObjectToQueryString(params: Record<string, any>): string {
  if (!params || typeof params !== 'object') return '';

  const queryString = Object.entries(params)
    .flatMap(([key, value]) => {
      if (value === undefined || value === null) return [];

      if (Array.isArray(value)) {
        return value.map(
          (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
        );
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  return `?${queryString}`;
}

