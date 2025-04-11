const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export const httpClient = async <T>(
  path: string,
  options: RequestInit
): Promise<T> => {
  const requestHeaders = getHeaders(options.headers);

  const response = await fetch(path, {
    ...options,
    headers: requestHeaders,
  });

  if (!response.ok) {
    return {
      status: response.status,
      data: null,
      headers: response.headers,
    } as T;
  }

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');

  let data = null;

  if (isJson) {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  }

  return {
    status: response.status,
    data: data,
    headers: response.headers,
  } as T;
};
