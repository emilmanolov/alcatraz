const bcrypt = require('bcrypt');

module.exports = {
  generatePasswordHash (password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  },

  comparePasswords(password1, password2) {
    return bcrypt.compareSync(password1, password2);
  },

  getDefaultCoordinates () {
    return {
      latitude: 42.6975,
      longitude: 23.3242
    };
  },

  isValidUsername (username) {
    return /^[a-zA-Z0-9]+$/.test(username);
  },

  isValidPassword (password) {
    return /^[a-zA-Z0-9]+$/.test(password);
  }
}
