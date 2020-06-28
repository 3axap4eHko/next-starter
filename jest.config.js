module.exports = {
  verbose: true,
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: [
    '*/**/*.js',
    'server.js'
  ],
  coveragePathIgnorePatterns: ['/.next', '/coverage', '/node_modules/', '__fixtures__', '__mocks__', '__tests__'],
  coverageDirectory: './coverage',
  setupFiles: ['dotenv/config', '<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  unmockedModulePathPatterns: [
    'node_modules/react/',
    'node_modules/enzyme/',
  ],
};
