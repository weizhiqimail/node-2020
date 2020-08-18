const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const mime = require('mime');

const ejs = require('ejs');
const debug = require('debug')('development');
const chalk = require('chalk');

const {createReadStream} = fs;

let template = fs.readFileSync(path.resolve(__dirname, './template.ejs'), 'utf8');

class Server {

  constructor(config) {
    this.port = config.port;
    this.host = config.host;
    this.directory = config.directory;
    this.template = template;
  }

  handleRequest(req, res) {
    let {pathname} = url.parse(req.url);
    pathname = decodeURIComponent(pathname);
    let filePath = path.join(this.directory, pathname);
    fs.stat(filePath, (err, statObj) => {
      if (err) {
        return this.sendError(req, res, err);
      }
      if (statObj.isFile()) {
        this.sendFile(req, res, filePath, statObj);
      } else {
        fs.stat(filePath, (err, statObj) => {
          if (err) {
            return this.sendError(req, res, err);
          }
          if (statObj.isFile()) {
            this.sendFile(req, res, filePath, statObj);
          } else {
            this.showDirList(req, res, filePath, statObj, pathname);
          }
        });
      }
    });
  }

  start() {
    http.createServer(this.handleRequest.bind(this)).listen(this.port, this.host, () => {
      console.log(chalk.yellow('Starting up http-server, serving') + chalk.blueBright(`./${this.directory.split('\\').pop()}`));
      console.log(chalk.yellow('Available on:'));
      console.log(`  http://${this.host}:${this.port}`);
      console.log('Hit CTRL-C to stop the server');
    });
  }

  sendFile(req, res, filePath, stat) {
    let gzip = this.gzip(req, res);
    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf8');
    if (gzip) {
      createReadStream(filePath).pipe(gzip).pipe(res);
    } else {
      createReadStream(filePath).pipe(res);
    }
  }

  sendError(req, res, error) {
    debug(error);
    res.statusCode = 404;
    res.end('404 Not Found');
  }

  showDirList(req, res, filePath, stat, pathname) {
    console.log('showDirList')

    fs.readdir(filePath, async (err, dirs) => {
      dirs = dirs.map(dir => ({
        dir,
        href: path.join(pathname, dir)
      }));
      console.log(dirs);
      let templateStr = await ejs.render(this.template, {dirs}, {async: true});
      res.setHeader('Content-Type', 'text/html;charset=utf8');
      res.end(templateStr);
    });
  }

  gzip(req, res) {
    let acceptEncoding = req.headers['accept-encoding'];
    if (acceptEncoding && acceptEncoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip');
      return require('zlib').createGzip();
    }
    return false;

  }

}

module.exports = Server;
