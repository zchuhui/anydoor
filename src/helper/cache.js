const config = require('../config/default-config');

const refreshRes = (stats, res) => {
  const { maxAge, expires, cacheControl, lastModified, etag } = config.cache;

  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());
  }

  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  }

  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }

  if (etag) {
    //res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`);
  }

}

module.exports = function isFresh(stats, req, res) {

  refreshRes(stats, res);

  // 读取浏览器发过来的信息
  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];

  // 如果都没有，说明没缓存
  if (!lastModified && !etag) {
    return false;
  }

  // 客户端跟我们服务器设置的不一样
  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false;
  }

  // 客户端跟我们服务器设置的不一样
  if (etag && etag !== res.getHeader('Etag')) {
    return false;
  }

  return true;
}
