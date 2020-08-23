const path = require('path');
const Koa = require('koa');
const bodyParser = require('./koa-bodyparser');
const koaStatic = require('koa-static');
const views = require('koa-views');

const routes = require('./routes');

const app = new Koa();

app.use(bodyParser());
app.use(views(path.resolve(__dirname, './views'), {
  extension: 'ejs'
}));

app.use(koaStatic(path.resolve(__dirname)));
app.use(routes());

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});

