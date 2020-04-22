class DuplicateUserError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const db = {
  userIndex: 2,
  users: [
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$rpjKFwHxBh11Zo287vQsa.YQlEvH2NlHmxNDVvwzP0Orkr0oStJpy',
      coordinates: {
        latitude: 42.6975,
        longitude: 23.3242
      },
      isAdmin: true
    },
  ]
};

module.exports = {
  async addUser ({ username, password, coordinates }) {
    if (db.users.some(u => u.username === username)) {
      throw new DuplicateUserError(`User with username "${username}" already exists`);
    }

    db.users.push({
      id: db.userIndex++,
      username,
      password,
      coordinates: {
        latitude: 42.6975,
        longitude: 23.3242
      },
      isAdmin: false
    });
  },

  async findUserById (id) {
    const user = db.users.find(u => u.id === id);
    if (!user) throw new UserNotFoundError(`User with id ${id} not found`);
    return user;
  },

  async findUserByUserName (username) {
    const user = db.users.find(u => u.username === username);
    if (!user) throw new UserNotFoundError(`User with username "${username}" not found`);
    return user;
  },

  async deleteUser (userId) {
    if (!db.users.find(u => u.id === userId)) {
      throw new UserNotFoundError(`User with id ${userId} not found`);
    }

    db.users = db.users.filter(u => u.id !== userId);
  },

  async findNotAdminUsers () {
    return db.users.filter(u => u.isAdmin === false);
  },

  DuplicateUserError,
  UserNotFoundError
}
