module.exports = {
  "extends": ["eslint:recommended"],                         // 使用推荐的配置
  "rules": {
    // 定义规则，覆盖推荐的配置
    // 规则有三个赋值选项：off(关闭规则)/warn（提醒）/error（报错）
    "no-console": ["error", {                               // 不允许使用console.xx，但可以使用warn/error/info这三个
      "allow": ["warn", "error", "info"]
    }]
  },
  "parser": "babel-eslint",                                  // 指定解析器，分别有：Espree（默认）、Esprima、Babel-ESLint、typescript-eslint-parser
  "parserOptions": {                                         // 解析器配置
    "ecmaVersion": 6,                                        // 设置为 3， 5 (默认)， 6、7 或 8 指定你想要使用的 ECMAScript 版本
    "sourceType": "script"                                   // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
  },
  "globals": {
    // 全局变量默认是不能用的
    "window": true,                                          // 这里开启window
  },
  "env": {
    // 开发环境，
    "node": true,                                            // 这里使用node
    "browser": false,                                        // 浏览器环境
    "es6": true,
    "mocha": true
  }
};
