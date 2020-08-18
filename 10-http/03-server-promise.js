const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const PORT = 4200;

class Server {

  handleRequest(req, res) {
    console.log(this);
    console.log(req, res);
  }

  start(port, cb) {
    http.createServer(this.handleRequest.bind(this)).listen(port, cb);
  }

}

const server = new Server();

server.start(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
})



