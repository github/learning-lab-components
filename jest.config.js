module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/lib/'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/tests/mockContext.js',
    '<rootDir>/src'
  ],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$'
}
