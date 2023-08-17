const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.user);
  res.json({ success: true, user: req.user });
});

module.exports = router;
