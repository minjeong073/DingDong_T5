const router = require('express').Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  const hashtag = req.query.hashtag;
  try {
    const result = await Question.find({
      hashtags: { $regex: hashtag },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
