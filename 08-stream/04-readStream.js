const EventEmitter = require('events');
const fs = require('fs');

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.options = options;
    this.flags = options.flags || 'r';
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    // 读的话，最好是每次 64k，如果文件大于 64k，可以采用流的模式
    // 写的话，最好是每次 16k
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    // 记录读取的偏移量
    this.pos = this.start;
    // 默认创建一个可读流，是非流动模式，不会触发 data 事件，如果用户监听了 data 事件，需要变为流动模式
    this.flowing = false;
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    });
    this.open();
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err);
      }
      // 保存 fd，用户后期读取操作
      this.fd = fd;
      this.emit('open', fd);
    });
  }

  read() {
    // 读取必须要等待打开完毕，如果打开了，会触发 open 事件
    console.log(this.fd);
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read());
    }
    let buffer = Buffer.alloc(this.highWaterMark);
    let howMuchToRead = this.end ? Math.min(this.end - this.pos, this.highWaterMark) : this.highWaterMark;
    fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {

      if (bytesRead) {
        this.pos += bytesRead;
        this.emit('data', buffer.slice(0, bytesRead));
        this.flowing && this.read();
      } else {
        this.emit('end');
        this.autoClose && fs.close(this.fd, () => {
          this.emit('close');
        });
      }
    });
  }

  pause() {
    this.flowing = false;
  }

  resume() {
    this.flowing = true;
    this.read();
  }


  pipe(dest) {
    this.on('data', data => {
      let flag = ws.write(data);
      if (!flag) {
        this.pause();
      }
    });

    dest.on('drain', () => {
      console.log('drain');
      this.resume();
    });
  }

}

module.exports = ReadStream;
