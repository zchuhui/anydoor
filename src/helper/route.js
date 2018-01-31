const fs = require('fs');                     // 文件读取
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// 配置
const config = require('../config/default-config');
// 文件类型
const mimeType = require('../helper/mime');
// 压缩
const compress = require('../helper/compress');
// 设置请求范围
const range = require('../helper/range');
// 缓存
const isFresh = require('../helper/cache');

// 读取模块
const tplPath = path.join(__dirname, '../templates/dir.tpl');
const source = fs.readFileSync(tplPath, 'utf-8');
const template = Handlebars.compile(source);

module.exports = async function (req, res, filePath) {
  try {
    // 读取路径
    const stats = await stat(filePath);
    const contentType = mimeType(filePath);

    // 文件
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);

      // 已存在缓存，所以不在发送
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      let rs;
      // 设置请求范围
      const { code, start, end } = range(stats.size, req, res);
      if (code == 200) {
        rs = fs.createReadStream(filePath);
      }
      else {
        rs = fs.createReadStream(filePath, { start, end });
      }

      // 压缩
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }

      rs.pipe(res);
    }

    // 文件夹
    else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      // 读取相对路径
      const dir = path.relative(config.root, filePath)

      // 定义数据
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : null,
        files: files.map((file) => {
          return {
            file,
            icon: mimeType(file)
          }
        })
      };

      // 嵌入模块
      res.end(template(data));
    }

  } catch (error) {
    console.warn(error);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file \n ${error}`);
  }
}
