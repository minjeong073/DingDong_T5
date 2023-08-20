const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Comment = require('../models/Comment');
const Bookmark = require('../models/Bookmark');

const athenticates = require('../middlewares/authenticates');
const authenticateToken = athenticates.authenticateToken;

// mypage - user 정보
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json('User not found!');
    }
    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 질문
router.get('/questions', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  try {
    const questions = await Question.find({ userId: userIdFromToken });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 답변
router.get('/answers', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  try {
    const answers = await Answer.find({ userId: userIdFromToken });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 댓글
router.get('/comments', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  try {
    const comments = await Comment.find({ userId: userIdFromToken });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 북마크한 질문
router.get('/bookmarks/questions', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const questionIdList = bookmarks.map(bookmark => bookmark.questionId);
    const questions = await Question.find({ _id: { $in: questionIdList } });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 북마크한 답변
router.get('/bookmarks/answers', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const answerIdList = bookmarks.map(bookmark => bookmark.answerId);
    const answers = await Answer.find({ _id: { $in: answerIdList } });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 북마크한 댓글
router.get('/bookmarks/comments', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const commentIdList = bookmarks.map(bookmark => bookmark.commentId);
    const comments = await Comment.find({ _id: { $in: commentIdList } });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
