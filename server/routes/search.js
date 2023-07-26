const router = require('express').Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// 키워드로 검색
router.get('/', async (req, res) => {
  const keyword = req.query.keyword;
  const hashtag = req.query.hashtag;
  try {
    const questionResults = await Question.find({
      $or: [
        { title: { $regex: keyword } },
        { content: { $regex: keyword } },
        { hashtags: { $regex: hashtag } },
      ],
    });

    const answerResults = await Answer.find({
      $or: [
        { content: { $regex: keyword } },
        { questionTitle: { $regex: keyword } },
      ],
    });

    const results = [...new Set([...questionResults, ...answerResults])];
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: `Search Error! : ${err}` });
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
