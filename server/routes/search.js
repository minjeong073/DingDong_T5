const router = require('express').Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// keyword, hashtag 검색
router.get('/', async (req, res) => {
  const keyword = req.query.keyword;
  const hashtag = req.query.hashtag;
  const searchConditions = [];

  if (keyword) {
    searchConditions.push({
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }],
    });
  }
  if (hashtag) {
    searchConditions.push({
      hashtags: { $regex: hashtag, $options: 'i' },
    });
  }

  try {
    const questionResults = await Question.find({
      $and: searchConditions,
    });
    const answerResults = await Answer.find({
      $and: searchConditions,
    });
    const result = [...questionResults, ...answerResults];
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// hashtag로 검색
router.get('/hashtag', async (req, res) => {
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
