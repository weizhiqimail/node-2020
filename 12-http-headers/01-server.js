const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer();

server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // ÉèÖÃ options µÄÆµÂÊ
  res.setHeader('Access-Control-Max-Age', '10');
  const {pathname} = url.parse(req.url);
  const method = req.method.toUpperCase();
  console.log('method', method);
  if (method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (pathname === '/post' && method === 'POST') {
    let arr = [];
    req.on('data', (chunk) => {
      arr.push(chunk);
    });
    req.on('end', () => {
      let result = querystring.parse(Buffer.concat(arr).toString());
      res.end(JSON.stringify(result));
    });
  }
  if (pathname === '/reg' && method === 'POST') {
    let arr = [];
    req.on('data', (chunk) => {
      arr.push(chunk);
    });
    req.on('end', () => {
      let result = querystring.parse(Buffer.concat(arr).toString());
      res.end(JSON.stringify(result));
    });

  }


}).listen(4200);



