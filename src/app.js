
const http = require('http');       // 请求
const path = require('path');       // 路劲
const chalk = require('chalk');     // 打印
const conf = require('./config/default-config');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');

class Server{
  constructor(config){
    this.conf = Object.assign({},conf,config);
  }

  start(){
    const server = http.createServer((req, res) => {
      // 获取当前目录
      const filePath = path.join(process.cwd(), req.url);
      // 读取目录
      route(req, res, filePath,this.conf);
    });

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.info(`Server started at ${chalk.green(addr)}`);
      openUrl(addr);

    });
  }
}

module.exports = Server;








