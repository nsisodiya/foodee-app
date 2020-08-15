const ERROR = 2;
const WARN = 1;
const IGNORE = 0;

module.exports = {
  root: true,
  env: { es6: true, browser: false, jest: true, node: true },
  plugins: ['import', 'babel', 'prettier'],
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  globals: {
    L: true
  },
  rules: {
    strict: IGNORE,
    'no-dupe-keys': ERROR,
    'no-irregular-whitespace': [ERROR, { skipStrings: false }],
    'no-undef': ERROR,
    'no-global-assign': ERROR,
    'babel/semi': [ERROR, 'always'],
    curly: WARN,
    eqeqeq: ERROR,
    //'no-console': [ERROR, { allow: ['log', 'info', 'warn', 'error'] }],
    'babel/new-cap': IGNORE,
    'no-underscore-dangle': WARN,
    quotes: [
      ERROR,
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'no-magic-numbers': [ERROR, { ignore: [0, 1, 2, 10, 404, 500] }],
    'import/imports-first': [ERROR, 'absolute-first'],
    'import/newline-after-import': ERROR,
    'import/no-duplicates': ERROR,
    'import/no-namespace': ERROR,
    'import/order': ERROR,
    'import/no-default-export': ERROR,
    'array-callback-return': ERROR,
    'dot-notation': ERROR,
    'no-alert': ERROR,
    'no-eq-null': ERROR,
    'no-cond-assign': ERROR,
    'no-unsafe-negation': ERROR,
    'no-empty': ERROR,
    'no-ternary': ERROR,
    'no-implicit-coercion': ERROR,
    'no-multiple-empty-lines': [
      ERROR,
      {
        max: 1
      }
    ],
    'no-duplicate-imports': ERROR,
    'no-empty-function': ERROR,
    'no-eval': ERROR,
    'no-extend-native': ERROR,
    'no-floating-decimal': ERROR,
    'babel/no-invalid-this': ERROR,
    'no-lone-blocks': ERROR,
    'no-loop-func': ERROR,
    'no-multi-spaces': ERROR,
    'no-multi-str': ERROR,
    'no-native-reassign': ERROR,
    'no-param-reassign': ERROR,
    'no-proto': ERROR,
    'no-redeclare': ERROR,
    'no-script-url': ERROR,
    'no-self-assign': ERROR,
    'no-self-compare': ERROR,
    'no-sequences': ERROR,
    'no-throw-literal': ERROR,
    'no-unused-expressions': WARN,
    'no-void': ERROR,
    yoda: ERROR,
    'no-shadow': ERROR,
    'no-else-return': ERROR,
    // 'no-lonely-if': ERROR,
    'no-dupe-else-if': ERROR,
    'no-unused-vars': [
      ERROR,
      {
        vars: 'all',
        args: 'after-used'
      }
    ],
    'no-use-before-define': WARN,
    'array-bracket-spacing': [ERROR, 'never'],
    camelcase: [
      ERROR,
      {
        properties: 'always',
        ignoreDestructuring: false,
        ignoreImports: true
      }
    ],
    'brace-style': ERROR,
    'quote-props': [
      'error',
      'as-needed',
      {
        keywords: false
      }
    ],
    'comma-spacing': [
      ERROR,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [ERROR, 'last'],
    'eol-last': ERROR,
    'key-spacing': [
      ERROR,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      ERROR,
      {
        overrides: {
          for: {
            after: true
          }
        }
      }
    ],
    'no-trailing-spaces': ERROR,
    'linebreak-style': [ERROR, 'unix'],
    'new-parens': ERROR,
    'no-confusing-arrow': ERROR,
    'no-const-assign': ERROR,
    'no-dupe-class-members': ERROR,
    'prefer-template': ERROR,
    'no-debugger': ERROR,
    indent: [ERROR, ERROR, { SwitchCase: WARN }],
    semi: [ERROR, 'always'],
    'babel/camelcase': ERROR,
    'babel/object-curly-spacing': IGNORE,
    'babel/quotes': IGNORE,
    'babel/no-unused-expressions': ERROR,
    'babel/valid-typeof': ERROR,
    'prettier/prettier': ERROR,
    'react/jsx-props-no-spreading': 0,
    'no-mixed-operators': ERROR,
    'no-plusplus': ERROR,
    'no-bitwise': ERROR,
    'sort-imports': IGNORE
  }
};
