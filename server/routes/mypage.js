const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json('User not found!');
    }
    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 질문

// 작성한 답변

// 작성한 댓글

// 북마크한 질문

// 북마크한 답변

// 북마크한 댓글

module.exports = router;
