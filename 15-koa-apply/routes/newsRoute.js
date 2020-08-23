const Router = require('koa-router');

const router = new Router({
  prefix: '/news'
});

router.get('/', (ctx, next) => {
  ctx.body = 'hello news';
});

module.exports = router;
