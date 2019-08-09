module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: [
    'import',
    'node',
    'promise',
    'standard',
    'prettier'
  ],
  rules: {
    'no-console': 'off',
    'nuxt/no-cjs-in-config': 'off'
  }
}
