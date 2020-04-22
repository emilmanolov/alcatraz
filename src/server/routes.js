const { auth, weather, admin } = require('./controllers');

module.exports = (router) => {
  router.post('/register', auth.register);
  router.post('/login', auth.login);
  router.post('/logout', requireAuth(auth.logout));
  router.get('/admin/users', requireAuth(admin.getUsers));
  router.delete('/admin/users', requireAuth(admin.deleteUser));
  router.get('/weather', requireAuth(weather.getData));
}

function requireAuth (controller) {
  return async (ctx) => {
    if (ctx.isAuthenticated()) {
      await controller(ctx);
    } else {
      ctx.throw(401);
    }
  };
}
