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


export function calculateReadTime(text: string) {
  // Average reading speed 
  const wordsPerMinute = 250;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}
