const Promise = require('./Promise');

let promise = new Promise((resolve, reject) =>{
  // throw new Error('失败了了');
  setTimeout(() => {
    return resolve('成功');
    // reject('失败');
  }, 300);
});

promise.then(data => {
  console.log('success1', data);
}, err => {
  console.log('fail1', err);
});

promise.then(data => {
  console.log('success2', data);
}, err => {
  console.log('fail2', err);
})
