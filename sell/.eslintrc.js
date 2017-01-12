module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //允许new Vue(),而不用将结果强制赋给某个变量
    "no-new": 0,
    //允许使用单双引号表示字符串,数组的第一个参数表示对错误是否警告，第二个参数定义规则
    "quotes": ["off", "double"],
    //要求代码结尾要加分号,数组的第一个参数表示对错误是否警告，第二个参数定义规则
    "semi": ["off", "always"],
    //是否强制要求在文件中最后一行代码末尾留一个空行，高版本的eslint写法是["off","never"]
    "eol-last": "off",
    //注释符号与注释语句之间需要一个空格
    "spaced-comment": ["off", "always"],
    //限制空白行数量
    "no-multiple-empty-lines":"off"
  }
};
