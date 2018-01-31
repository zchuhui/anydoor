module.exports = {
  root:process.cwd(),
  hostname:'127.0.0.1',
  port:8081,
  compress:/\.(html|js|css|md)/,  // 压缩文件格式
  cache:{
    maxAge:600,         // 缓存时间，单位是毫秒
    expires:true,       // 是否支持expires
    cacheControl:true,  // 是否支持 cacheControl
    lastModified:true,  // 是否支持 lastModified
    etag:true,          // 是否支持etag
  }
}
