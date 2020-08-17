const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');

class Queue {
  constructor() {
    this.data = [];
  }

  offer(element) {
    this.data.push(element);
  }

  poll(index) {
    if (this.data.length > 0) {
      this.data = this.data.splice(index, 1);
    }
  }

}

class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.options = options;
    this.flags = options.flags || 'w';
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.mode = options.mode || 0o666;
    this.highWaterMark = options.highWaterMark || 16 * 1024;

    // 维护当前存入的数据个数，每次调用 write 方法，会根据写入的内容个数累加给 len 属性，就是缓存的长度
    this.len = 0;
    // 当前是否正在写入
    this.writing = false;
    // 是否需要触发 drain 事件
    this.needDrain = false;
    // 写入的偏移量
    this.offset = this.start;
    // 缓存区
    this.cache = new Queue();
    this.open();
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err);
      }

      this.fd = fd;
      this.emit('open', fd);
    });
  }

  // 数据的格式是 string 或 Buffer
  write(chunk, encoding = 'utf8', cb = () => {
  }) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;
    let flag = this.len < this.highWaterMark;
    this.needDrain = !flag;
    if (this.writing) {
      // 正在写入
      this.cache.offer({chunk, encoding, cb});
    } else {
      this.writing = true;
      this._write(chunk, encoding, () => {
        cb();
        this.clearBuffer();
      });
    }

    return flag;
  }

  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.write(chunk, encoding, cb));
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.len -= written;
      this.offset += written;
      cb();
    });
  }


  clearBuffer() {
    let data = this.cache.poll();
    if (data) {
      // 需要清空缓存
      let {chunk, encoding, cb} = data;
      console.log(chunk);
      this._write(chunk, encoding, () => {
        cb();
        this.clearBuffer();
      })
    } else {
      this.writing = false;
      if (this.needDrain) {
        this.needDrain = false;
      }
    }
  }

}

module.exports = WriteStream;

