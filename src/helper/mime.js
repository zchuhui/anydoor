const path = require('path');

const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'png': 'image/png',
  'json': 'application/json',
  'js': 'text/javascript',
  'txt': 'text/plain',
}

module.exports = (filePath) => {
  let extname = path.extname(filePath).split('.').pop().toLowerCase();

  if (!extname) {
    extname = filePath;
  }

  return mimeTypes[extname] || mimeTypes['txt'];
}
