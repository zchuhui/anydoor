# 用nodejs搭建一个静态站点

## 1. 配置环境

### 1.1 `.**ignore`

`.**ignore`文件是为了忽视一些文件配置而使用，常用如下：

- `.gitignore`, 忽视`git`文件，该文件里面的所配置的文件与目录，git都是不操作的。这代表着这些文件只在本地使用。

```bash
logs
*.log
npm-debug.log*
node_modules/
*.swp
.idea/
.DS_Store
build/
```

`.eslintgnore`同样，表示全局配置的`eslint`规范，对`.eslintgnore`里面的文件是无效的。

### 1.2 EditorConfig

使用 `EditorConfig`，可以统一代码格式的规范，比如去尾部空号、缩进等。

使用方法：

1. 在编辑器安装插件`EditorConfig for VS Code`.
1. 在项目根目录添加`.editorconfig`，并进行配置.

`.editorconfig`文件如下：

```bash
root = true
[*]
charset = utf-8

# 代码行字符间距
indent_style = space
indent_size = 2

end_of_line = lf
insert_final_newline = true

trim_trailing_whitespace = true

[*.json]
indent_size = 4
```

### 1.3 eslint

使用`Editorconfig`是为了统一代码的格式，而使用 `eslint`，则是为了统一代码的编码规范，比如不能使用`window.name`,`console.log()`等等。

使用方法：

1. 在编辑器安装`ESLint`
1. 在项目添加`.eslintrc.js`，在里面配置规范即可
1. 当然，还得再项目安装依赖：

```bash
npm i --save-dev eslint
npm i --save-dev babel-eslint
```

## 2. 编写 `http` 服务器

```bash
const http = require('http');
const conf = require('./config/default-config');
const chalk = require('chalk');

const server = http.createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type','text/html');
  res.write('<html><body><h1>Hello, HTTP! 123456 </h1></body></html>');
  res.end();
});


server.listen(conf.port,conf.hostname,()=>{
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});

```

> 每修改一次都得运行 `node app.js` 会非常繁琐，可以使用 `supervisor app.js`，每次修改后，都会帮你自动启动。
> 具体用法：使用`npm i -g supervisor`全局安装后即可使用。

## 3.压缩

如果文件不压缩就传输，会显得文件很大，但传输的文件很大时，性能就会受到很大的影响。所有有必要在传输的时候压缩，即`request`跟`response`时，对文件进行压缩跟解压，以达到优化的效果。

压缩函数封装在：`src/helper/compress` 里面

## 4.range——请求范围设置

客户端在请求的时候，可以设置请求的字节范围，服务器也根据请求那对应的文件跟字节，而不是一下把所有的内容都返回，利于站点的优化。

实现这一点，需要三步：

- range:bytes=[start]-[end]   // 设置字节范围
- Accept-Ranges: bytes        // 设置响应头，即服务器可以处理的格式，这是格式是字节
- Content-Range:bytes start-end/total   //服务器返回的格式

## 5. 缓存

