module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native|@expo|@expo/vector-icons|react-navigation)/',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
