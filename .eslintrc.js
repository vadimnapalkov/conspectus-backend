module.exports = {
  extends: [
    require.resolve('eslint-config-standard'),
    require.resolve('eslint-config-prettier'),
    require.resolve('eslint-config-prettier/standard')
  ],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index']]
      }
    ],
    'prettier/prettier': 'error',
    'import/newline-after-import': ['error', { count: 1 }]
  }
};
