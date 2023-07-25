const router = require('express').Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Answer CRUD
// CREATE
router.post('/:id', async (req, res) => {
  const questionId = req.params.id;
  const { content, author } = req.body;
  const newAnswer = new Answer({
    questionId,
    content,
    author,
  });
  console.log(`new answer : ${newAnswer}`);
  try {
    const savedAnswer = await newAnswer.save();
    res.status(200).json(savedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/:id', async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.id });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
