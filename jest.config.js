module.exports = {
    testEnvironment: 'node', // Set environment to Node for backend tests
    testMatch: [
      "<rootDir>/server/unit_tests/**/*.test.js",  // Backend test files in server/unit_tests
    ],
    testPathIgnorePatterns: [
        "<rootDir>/client/",  // Ignore all tests in the client folder
      ],      
    moduleFileExtensions: ['js', 'json', 'node'],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",  // Transform JavaScript/TypeScript files
    },
  };
  