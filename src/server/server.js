const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Logger = require('koa-logger');
const serve = require('koa-static');

const session = require('koa-session');
const passport = require('koa-passport');

const registerRoutes = require('./routes');

const app = new Koa();

app.use(serve('./build'));

app.use(BodyParser());
app.use(Logger());

app.keys = [ process.env.SESSION_SECRET || 'secret' ];
app.use(session({}, app));

require('./auth');
app.use(passport.initialize());
app.use(passport.session());

const router = new Router();
registerRoutes(router);

app.use(router.routes())

const PORT = process.env.PORT || 8080;

module.exports = app.listen(PORT, () => {
  console.log("==> Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
