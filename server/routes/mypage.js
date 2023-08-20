const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Comment = require('../models/Comment');
const Bookmark = require('../models/Bookmark');
const CopyQuestion = require('../models/CopyQuestion');

const athenticates = require('../middlewares/authenticates');
const CopyAnswer = require('../models/CopyAnswer');
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

    const [questions, copyQuestions] = await Promise.all([
      Question.find({ _id: { $in: questionIdList } }),
      CopyQuestion.find({ _id: { $in: questionIdList }, userId: userIdFromToken }),
    ]);

    const populatedQuestions = await Promise.all(
      copyQuestions.map(async copyQuestion => {
        const originalQuestion = questions.find(question => question._id.toString() === copyQuestion._id.toString());
        if (originalQuestion && originalQuestion.isDeleted) {
          copyQuestion.isDeleted = true;
          await copyQuestion.save();
        }
        const user = await User.findById(copyQuestion.userId);
        const author = user ? user.username : 'unknown';
        return {
          ...copyQuestion._doc,
          author,
          createdAt: new Date(copyQuestion.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(copyQuestion.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );
    res.status(200).json(populatedQuestions);
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
    const answers = await CopyAnswer.find({ _id: { $in: answerIdList }, userId: userIdFromToken });
    const populatedAnswers = await Promise.all(
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
    res.status(200).json(populatedAnswers);
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
    const populatedComments = await Promise.all(
      comments.map(async comment => {
        const user = await User.findById(comment.userId);
        const author = user ? user.username : 'unknown';
        return {
          ...comment._doc,
          author,
          createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );
    res.status(200).json(populatedComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
