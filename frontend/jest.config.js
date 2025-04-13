module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: './babel.jest.config.js' },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
