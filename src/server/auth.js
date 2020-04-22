const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const store = require('./store');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  store.findUserById(id)
    .then((user) => {
      done(null, {
        id: user.id,
        username: user.username,
        coordinates: user.coordinates,
        isAdmin: user.isAdmin
      });
    })
    .catch((err) => {
      done(err,null);
    });
});

passport.use(new LocalStrategy({}, (username, password, done) => {
  store.findUserByUserName(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err));
}));
