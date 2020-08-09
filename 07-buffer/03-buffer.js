
// Buffer copy

Buffer.prototype.copy = function (targetBuffer, targetStart = 0, sourceStart = 0, sourceEnd = this.length){
  for (let i = sourceStart; i < sourceEnd; i++) {
    targetBuffer[targetStart++] = this[i];
  }
}

let buf1 = Buffer.from('ÄãºÃ');
let buf2 = Buffer.from('½Ü¿Ë');
let buf = Buffer.alloc(20);

buf1.copy(buf, 0, 0, 6);
buf2.copy(buf, 6);
console.log(buf.toString())



