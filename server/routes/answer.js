const router = require('express').Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Answer CRUD
// CREATE
router.post('/:qId', async (req, res) => {
  const { content, author } = req.body;

  try {
    const question = await Question.findById(req.params.qId);
    if (!question) {
      res.status(404).json('Question not found!');
    }
    const newAnswer = new Answer({
      questionId: req.params.id,
      questionTitle: question.title,
      content,
      author,
    });
    const savedAnswer = await newAnswer.save();
    res.status(200).json(savedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/all/:qId', async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.qId });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      res.status(404).json('Answer not found!');
    }
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
