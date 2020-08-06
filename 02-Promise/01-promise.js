const Promise = require('./Promise');

let promise = new Promise((resolve, reject) =>{
  // throw new Error('失败了了');
  resolve('成功');
  reject('失败');
});

promise.then(data => {
  console.log('success', data);
}, err => {
  console.log('fail', err);
})
