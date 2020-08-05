Function.prototype.before = function (callback) {
  return (...args) => {
    callback();
    this(...args);
  };
}

function say() {
  console.log('hello');
}

let beforeSay = say.before(() => {
  console.log('before say');
});

beforeSay('我是 before say 的参数');
