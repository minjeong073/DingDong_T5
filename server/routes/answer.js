const router = require('express').Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Vote = require('../models/Vote');

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

    answers.forEach((answer) => answer.convertDate());
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

    answer.convertDate();
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (answer.author === req.body.author) {
      // 수정 사항에 questionId, title 있으면 무시
      delete req.body.questionId;
      delete req.body.questionTitle;

      try {
        const updateAnswer = await Answer.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateAnswer);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your Answer!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (answer.author === req.body.author) {
      try {
        await answer.delete();
        res.status(200).json('Answer has been deleted!');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your Answer!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// VOTE
router.put('/:id/vote', async (req, res) => {
  const answerId = req.params.id;
  const author = req.body.author;

  try {
    const answer = await Answer.findById(answerId);

    if (!answer) {
      res.status(404).json('Answer not found!');
    }
    const existingVote = await Vote.findOne({
      answerId,
      username: author,
    });

    if (!existingVote) {
      await Vote.create({
        answerId,
        username: author,
      });
      answer.votes += 1;
    } else {
      await Vote.deleteOne({ _id: existingVote._id });
      answer.votes -= 1;
    }
    await answer.save();
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
