import sonarjs from 'eslint-plugin-sonarjs';

export default [
  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
      },
    },
    plugins: {
      sonarjs,
    },
    rules: {
      'sonarjs/no-duplicate-string': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/cognitive-complexity': ['error', 10],  // Limit complexity
      'complexity': ['error', { 'max': 10 }],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-extra-semi': 'error',
      'curly': ['error', 'all'],
      'eqeqeq': ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-alert': 'warn',
      'no-unused-vars': ['error', { 'args': 'after-used', 'ignoreRestSiblings': true }],
      'no-shadow': 'warn',
      'consistent-return': 'error',
      'default-case': 'warn',
      'no-undef': 'error',
      'no-use-before-define': ['error', { 'functions': false, 'classes': true }],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }],
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-parens': ['error', 'always'],
      'no-duplicate-imports': 'error',
      'no-new-symbol': 'error',
      'object-shorthand': ['error', 'always'],
    },
  },
];
