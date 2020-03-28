module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': ['warn'],
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    indent: ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single', 'avoid-escape'],
    semi: ['error', 'always'],
    'no-console': ['warn', { allow: ['info', 'error'] }],
    curly: 'error',
    'no-else-return': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    strict: 'error',
    'symbol-description': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    yoda: ['error', 'never', { exceptRange: true }]
  }
};
