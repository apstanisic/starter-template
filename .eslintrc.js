module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // My additional config
    '@typescript-eslint/no-unused-vars': 'off',
    // Disable next rule for now, but enable in future
    '@typescript-eslint/explicit-function-return-type': ['off', { allowExpressions: true }],
    // '@typescript-eslint/ban-ts-ignore': 'warn', // Warn when using ts ignore
    'no-unreachable': 'warn', // Warn on unreachable code
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // I don't know about this rule, check in the future
    '@typescript-eslint/ban-types': 'off',
  },
};
