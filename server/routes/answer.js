const router = require('express').Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Vote = require('../models/Vote');
const User = require('../models/User');
const Comment = require('../models/Comment');

const authMiddleware = require('../middlewares/authenticates');
const authenticateToken = authMiddleware.authenticateToken;

// Answer CRUD
// CREATE
router.post('/:questionId', authenticateToken, async (req, res) => {
  const questionId = req.params.questionId;
  const userIdFromToken = req.user.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json('Question not found!');
    }
    console.log(question.userId.toString(), userIdFromToken);
    if (question.userId.toString() === userIdFromToken) {
      res.status(401).json('You cannot answer your own question!');
    }
    const newAnswer = new Answer({
      questionId: req.params.questionId,
      questionTitle: question.title,
      content: req.body.content,
      userId: userIdFromToken,
    });
    const savedAnswer = await newAnswer.save();
    question.answers += 1;
    await question.save();
    res.status(200).json(savedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/all/:questionId', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await Answer.find({ questionId: questionId });
    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const user = await User.findById(answer.userId);
        const author = user ? user.username : 'unknown';
        return {
          ...answer._doc,
          author,
          createdAt: new Date(answer.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(answer.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );
    res.status(200).json(updatedAnswers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ANSWERS WITH PAGINATION - VOTES
router.get('/all', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalAnswers = await Answer.countDocuments({});
    const totalPages = Math.ceil(totalAnswers / pageSize);

    const answers = await Answer.find({}).sort({ votes: -1 }).skip(startIndex).limit(pageSize).exec();

    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const user = await User.findById(answer.userId);
        const author = user ? user.username : 'unknown';

        const question = await Question.findById(answer.questionId);
        const questionHashtags = question ? question.hashtags : [];

        return {
          ...answer._doc,
          author,
          questionHashtags,
          createdAt: new Date(answer.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(answer.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );

    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const nextPageUrl = nextPage ? `http://localhost:5001/api/answer/all?page=${nextPage}` : null;

    res.status(200).json({
      answers: updatedAnswers,
      nextPageUrl,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    const user = await User.findById(answer.userId);
    const comments = await Comment.find({ answerId: req.params.id }).exec();

    if (!answer) {
      res.status(404).json('Answer not found!');
    }
    const author = user ? user.username : 'unknown';
    const updatedAnswer = {
      ...answer._doc,
      author,
      comments,
      createdAt: new Date(answer.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      updatedAt: new Date(answer.updatedAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
    };
    res.status(200).json(updatedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const answer = await Answer.findById(answerId);
    if (answer.userId.toString() === userIdFromToken) {
      // 수정 사항에 questionId, title 있으면 무시
      delete req.body.questionId;
      delete req.body.questionTitle;
      try {
        const updateAnswer = await Answer.findByIdAndUpdate(
          answerId,
          {
            $set: req.body,
            updatedAt: new Date().toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
            }),
          },
          { new: true },
        );
        res.status(200).json({ message: 'Answer has been updated', updateAnswer });
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

    if (!answer) {
      res.status(404).json('Answer not found!');
    }

    try {
      const question = await Question.findById(answer.questionId);

      await Answer.findByIdAndDelete(req.params.id);
      await Vote.deleteMany({ answerId: req.params.id });
      question.answers -= 1;
      await question.save();
      res.status(200).json('Answer has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ETC

// Comment
router.put('/:id/comment', async (req, res) => {
  const answerId = req.params.id;
  console.log(answerId);
  try {
    const answer = await Answer.findById(answerId);
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!answer) {
      res.status(404).json('Answer not found!');
    }
    if (!user) {
      res.status(404).json('User not found!');
    }

    const newComment = new Comment({
      answerId: answerId,
      content: req.body.content,
      userId: userId,
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// VOTE
router.put('/:id/vote', async (req, res) => {
  const answerId = req.params.id;
  const userId = req.body.userId;

  try {
    const answer = await Answer.findById(answerId);

    if (!answer) {
      res.status(404).json('Answer not found!');
    }
    const existingVote = await Vote.findOne({
      answerId,
      userId: userId,
    });

    if (!existingVote) {
      await Vote.create({
        answerId,
        userId: userId,
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
