const store = require('../store');

module.exports = {
  getUsers: async (ctx) => {
    if (!ctx.state.user.isAdmin) {
      ctx.throw(401);
    }

    const notAdminUsers = await store.findNotAdminUsers();

    ctx.body = notAdminUsers.map(u => ({
      id: u.id,
      username: u.username
    }));
  },

  deleteUser: async (ctx) => {
    if (!ctx.state.user.isAdmin) {
      ctx.throw(401);
    }

    const { userId } = ctx.request.body;

    await store.deleteUser(userId);

    ctx.status = 200;
  }
}
