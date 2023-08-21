const router = require('express').Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const convertToKoreanTime = data => {
  return data.map(item => ({
    ...item.toObject(),
    createdAt: new Date(item.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    updatedAt: new Date(item.updatedAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
  }));
};

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

    const convertedQuestions = convertToKoreanTime(questionResults);
    const convertedAnswers = convertToKoreanTime(answerResults);
    const result = [...convertedQuestions, ...convertedAnswers];
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
      hashtags: { $regex: hashtag, $options: 'i' },
    });

    result.forEach(question => {
      question.createdAt = new Date(question.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      });
    });
    const convertedResult = convertToKoreanTime(result);
    res.status(200).json(convertedResult);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
