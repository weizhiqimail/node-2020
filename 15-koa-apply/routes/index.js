const combineRoutes = require('koa-combine-routers');

const userRoute = require('./userRoute');
const newsRoute = require('./newsRoute');

module.exports = combineRoutes(
  userRoute,
  newsRoute
);
