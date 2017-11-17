# sell

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 文件说明

###.babelrc文件
- 该文件用来设置转码规则和插件，presets字段设定转码规则，官方提供的有es2015，react这些转码规则
- npm install之后，添加到presets集合中即可
- stage-2表示这是ES7第二阶段语法提案的转码规则，共有4个阶段
- 所有Babel工具和模块的使用，都必须先写好.babelrc
- 详见 http://www.ruanyifeng.com/blog/2016/01/babel.html

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).