const Router = require('koa-router');


const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

router.post('/user/login', async (ctx, next) => {





});

module.exports = router;
