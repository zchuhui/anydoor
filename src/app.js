
const http = require('http');       // 请求
const path = require('path');       // 路劲
const chalk = require('chalk');     // 打印
const conf = require('./config/default-config');
const route = require('./config/route');

const server = http.createServer((req,res)=>{
  // 获取当前目录
  const filePath = path.join(process.cwd(),req.url);
  // 读取目录
  route(req,res,filePath);


});


server.listen(conf.port,conf.hostname,()=>{
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});






