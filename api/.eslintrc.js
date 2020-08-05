module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: ['../.eslintrc.js'],
  env: { browser: false },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
