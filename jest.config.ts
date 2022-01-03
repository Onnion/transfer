export default {
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['text', 'lcov'],
  collectCoverage: true,
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  verbose: true,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.dto.ts',
    '.entity.ts',
    '.module.ts',
    '.interface.ts',
    '.type.ts',
    '<rootDir>/src/main.ts',
    '<rootDir>/src/app.controller.ts',
    '<rootDir>/src/app.controller.spec.ts',
    '<rootDir>/src/app.service.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 100,
      lines: 80,
      statements: 80,
    },
  },
};
