const router = require('express').Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// GET BY COMMENT ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json('Comment not found!');
    }
    const updatedComment = {
      ...comment._doc,
      createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
    };
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BY QUESTION ID OR ANSWER ID
router.get('/', async (req, res) => {
  try {
    let comments;

    if (req.query.questionId) {
      comments = await Comment.find({ questionId: req.query.questionId });
    }
    if (req.query.answerId) {
      comments = await Comment.find({ answerId: req.query.answerId });
    }
    if (!req.query.questionId && !req.query.answerId) {
      res.status(400).json('Invalid query parameters');
      return;
    }

    if (!comments || comments.length === 0) {
      res.status(404).json('Comments not found!');
      return;
    }

    const updatedComments = await Promise.all(
      comments.map(async comment => {
        const user = await User.findById(comment.userId);
        const author = user ? user.username : 'unknown';
        const updatedComment = {
          ...comment._doc,
          author,
          createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
        return updatedComment;
      }),
    );

    res.status(200).json(updatedComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json('Comment not found!');
    }
    // TODO : token 구현 후 수정 예정
    if (comment.userId.toString() === req.body.userId) {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        );
        res.status(200).json(updatedComment);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your Comment!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json('Comment not found!');
    }

    // TODO : token 구현 후 수정 예정
    if (comment.userId.toString() === req.body.userId) {
      if (comment.questionId) {
        const question = await Question.findById(comment.questionId);
        question.comments -= 1;
        await question.save();
      } else if (comment.answerId) {
        const answer = await Answer.findById(comment.answerId);
        answer.comments -= 1;
        await answer.save();
      }
      // comment 삭제
      try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json('Comment has been deleted...');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your Comment!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// VOTE
router.put('/:id/vote', async (req, res) => {
  const commentId = req.params.id;
  const userId = req.body.userId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json('Comment not found!');
    }
    const existingVote = await Vote.findOne({
      commentId,
      userId: userId,
    });

    if (!existingVote) {
      await Vote.create({
        commentId,
        userId: userId,
      });
      comment.votes += 1;
    } else {
      await Vote.deleteOne({ _id: existingVote._id });
      comment.votes -= 1;
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
