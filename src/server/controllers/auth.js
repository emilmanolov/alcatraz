const passport = require('koa-passport');
const store = require('../store');
const userService = require('../services/user');

module.exports = {
  register: async (ctx) => {
    const { username, password } = ctx.request.body;

    if (!userService.isValidUsername(username)) {
      ctx.throw(400, 'Invalid username');
    }

    if (!userService.isValidPassword(password)) {
      ctx.throw(400, 'Invalid password');
    }

    try {
      await store.addUser({
        username,
        password: userService.generatePasswordHash(password),
        coordinates: userService.getDefaultCoordinates()
      });
      ctx.status = 201;
    } catch (e) {
      ctx.status = 409;
      ctx.body = e.message;
    }
  },

  login: async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.body = {
          username: user.username,
          isAdmin: user.isAdmin
        };
        ctx.login(user);
      } else {
        ctx.throw(401);
      }
    })(ctx);
  },

  logout: async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.status = 200;
    } else {
      ctx.throw(401);
    }
  }
}
