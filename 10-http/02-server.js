const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const PORT = 4200;

const server = http.createServer((req, res) => {
  const {pathname} = url.parse(req.url);
  const filePath = path.join(__dirname, pathname);
  res.end(filePath);
}).listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
