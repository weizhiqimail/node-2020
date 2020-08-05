// 函数柯里化，函数的反柯里化

/*
* 判断变量类型的方法
* 1. typeof 缺点是不能判断对象类型
* 2. constructor
*   [].constructor, ({}).constructor
* 3. instanceof 通过原型链
* 4. Object.prototype.toString.call(var)
*   拿到对象原型上的 toString 方法
*   缺点是不能细分谁是谁的实例
* */

function checkType(type) {
  return function (value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  }
}

// function isArray(value) {
//   return checkType('Array');
// }
//
// function isObject(value) {
//   return checkType('Object');
// }

function currying(fn, arr = []) {
  let len = fn.length;
  return function (...args) {
    arr = [...arr, ...args];
    if (arr.length < len) {
      return currying(fn, arr);
    }
    return fn(...arr);
  }
}

function sum(...args) {
  return args.reduce((prev, curr) => prev += curr, 0);
}

let isArray = currying(checkType)('Array');
let isObject = currying(checkType)('Object');
console.log(isArray([]));
console.log(isArray(111));
console.log(isObject({}));
console.log(isObject(111));

let calc = currying(sum)(1,2,3,4);
console.log(calc);
