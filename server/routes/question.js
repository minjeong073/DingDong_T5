const router = require('express').Router();
const Question = require('../models/Question');

// Question CRUD
// CREATE
router.post('/', async (req, res) => {
  const newQuestion = new Question(req.body);
  try {
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    questions.forEach((question) => question.convertDate());
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    question.convertDate();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.username === req.body.username) {
      try {
        const updatedQuestion = await Question.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedQuestion);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your Question!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.put('/delete/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.username === req.body.username) {
      try {
        // isDeleted 를 true 로 변경
        question.isDeleted = true;
        await question.save();
        res.status(200).json('Question has been deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your Question!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
