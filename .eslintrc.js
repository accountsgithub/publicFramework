// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: false
  },

  env: {
    browser: true,
    node: true
  },

  globals: {
    __dirname: false,
    require: false,
    document: false,
    window: false,
    console: false,
    module: false,
    moment: true,
    lodash: true,
    _: true,
    $: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['plugin:vue/essential', 'eslint:recommended'],

  // required to lint *.vue files
  plugins: ['vue', 'babel', 'import'],

  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'arrow-spacing': 2, //函数的箭头之前或之后有空格
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ], // 对象字面量中冒号的后面必须有空格，前面不允许有空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ], // 关键字前后必须存在空格
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-dupe-args': 2, //函数定义的时候不允许出现重复的参数
    // eqeqeq
    eqeqeq: 0,
    // indent
    indent: 2,
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'space-before-blocks': [1, 'always'],
    quotes: [1, 'single'],
    'prefer-template': 1, //es6中``操作符优先，替代+操作符
    'max-params': [2, 5], //限制函数的最大参数个数,
    'for-direction': 'error', // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
    'getter-return': ['error', { allowImplicit: false }], // getter 必须有返回值，并且禁止返回空，比如 return;
    //vue 的设置
    'vue/html-self-closing': 0,
    'vue/html-indent': [
      1,
      4,
      {
        attribute: 1,
        closeBracket: 0
      }
    ],
    'vue/html-quotes': 2, // html 属性值必须用双引号括起来
    'vue/no-multi-spaces': 2, //禁止出现连续空格
    'vue/no-async-in-computed-properties': 2, // 计算属性禁止包含异步方法
    'vue/no-duplicate-attributes': 2, //禁止出现重复的属性
    'vue/no-use-v-if-with-v-for': 0
  }
}
