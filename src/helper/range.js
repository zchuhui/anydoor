module.exports = (totalSize, req, res) => {
  const range = req.headers['range'];  // 设置请求头
  if (!range) {
    return { code: 200 };
  }

  const sizes = range.match(/bytes=(\d*)-(\d*)/);   // start,end,total
  const end = sizes[2] || totalSize - 1;
  const start = sizes[1] || totalSize - end;

  if (start > end || start < 0 || end > totalSize) {
    return { code: 200 };
  }

  res.setHeader('Accept-Ranges', 'byptes');
  res.setHeader('Content-Range', `bypes ${start}-${end}/${totalSize}`);

  return {
    code: 206,
    start: parseInt(start),
    end: parseInt(end)
  }
}
