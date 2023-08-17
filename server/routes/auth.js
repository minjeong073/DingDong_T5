//import module
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passportLocal = require('passport-local');
const passportJwt = require('passport-jwt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//jwt
passport.use(
  'jwt',
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (jwt_payload, done) => {
      done(null, {
        id: jwt_payload.id,
      });
    },
  ),
);

// login for the firt time
passport.use(
  'local',
  new passportLocal.Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { reason: 'User not found' });
      }
      if (!user.comparePassword(password)) {
        return done(null, false, { reason: 'Invalid password' });
      }
      // authentication success
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNIN
router.post('/signin', async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(400).json({ message: 'Authentication failed' });
    return req.login(user, { session: false }, err => {
      if (err) return next(err);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ token: token });
    });
  })(req, res, next);
});

module.exports = router;
