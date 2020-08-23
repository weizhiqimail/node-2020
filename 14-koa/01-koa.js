const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('./02-koa-bodyparser');
const koaStatic = require('./03-koa-static');

const app = new Koa();

app.use(bodyParser());
app.use(koaStatic(path.resolve(__dirname)))

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
});

app.use(async (ctx, next) => {
  console.log(5);
  await next();
  console.log(6);
});



app.use(async (ctx, next) => {
  ctx.body = fs.createReadStream('./01-koa.js');
})

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});

/*
* koa 中间件的原理是会将所有的中间件组合成一个大的 Promise，当前一个 promise 执行完成后，会采用当前的 ctx.body 进行结构响应
* next 前面必须家 await 或 return，否则执行结果可能打不到预期
* 如果都是同步执行，那么是否加 await 或 return 都行，但是由于不知道后续是否有异步逻辑，所以最好还是加上 await
* */
