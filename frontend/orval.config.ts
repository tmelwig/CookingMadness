const orvalConfig = {
  gourmet: {
    output: {
      target: './api',
      client: 'fetch',
      baseUrl: 'https://gourmet.cours.quimerch.com',
      override: {
        mutator: {
          path: './api/orvalCustomClient.ts',
          name: 'httpClient',
        },
      },
    },
    input: {
      target: 'https://gourmet.cours.quimerch.com/swagger/openapi.json',
    },
  },
};

export default orvalConfig;
