const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  console.log(req.httpVersion);
  console.log(req.httpVersionMajor);
  console.log(req.httpVersionMinor);
  let urlInfo = url.parse(req.url, true);
  console.log(urlInfo.search);
  console.log(urlInfo.query);
  console.log(req.method);
  res.end('<h1>hello world</h1>');
});

let PORT = 5000;

function listen(port) {
  server.listen(port, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`server is running at http://localhost:${port}`);
    }
  });
}

listen(PORT);

server.on("error", err => {
  if (err.errno === 'EADDRINUSE') {
    listen(++PORT);
  }
})

