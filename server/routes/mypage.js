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
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalQuestions = await Question.countDocuments({ userId: userIdFromToken });
    const questions = await Question.find({ userId: userIdFromToken, isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const updatedQuestion = {
          ...question._doc,
          createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
        return updatedQuestion;
      }),
    );

    res.status(200).json({
      updatedQuestions,
      totalQuestions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 답변
router.get('/answers', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalAnswers = await Answer.countDocuments({ userId: userIdFromToken });
    const totalPages = Math.ceil(totalAnswers / pageSize);

    const answers = await Answer.find({ userId: userIdFromToken })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const question = await Question.findById(answer.questionId);
        const questionHashtags = question ? question.hashtags : [];

        return {
          ...answer._doc,
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
    const nextPageUrl = nextPage ? `/api/answer/answers?page=${nextPage}` : null;

    res.status(200).json({
      answers: updatedAnswers,
      nextPageUrl,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 댓글
router.get('/comments', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalUserComments = await Comment.countDocuments({ userId: userIdFromToken });
    const totalPages = Math.ceil(totalUserComments / pageSize);

    const comments = await Comment.find({ userId: userIdFromToken })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedComments = await Promise.all(
      comments.map(async comment => {
        let questionHashtags;

        if (comment.answerId) {
          const answer = await Answer.findById(comment.answerId);
          if (answer && answer.questionId) {
            const question = await Question.findById(answer.questionId);
            questionHashtags = question ? question.hashtags : [];
          }
        }
        if (comment.questionId) {
          const question = await Question.findById(comment.questionId);
          questionHashtags = question ? question.hashtags : [];
        }

        return {
          ...comment._doc,
          questionHashtags,
          createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );

    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const nextPageUrl = nextPage ? `/api/mypage/comments?page=${nextPage}` : null;

    res.status(200).json({
      comments: updatedComments,
      nextPageUrl,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json(err);
  }
});

// 북마크한 질문
router.get('/bookmarks/questions', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;

  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const questionIdList = bookmarks.map(bookmark => bookmark.questionId);

    const totalBookmarkedQuestions = questionIdList.length;
    const bookmarkedQuestions = await Question.find({ _id: { $in: questionIdList }, isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedBookmarkedQuestions = await Promise.all(
      bookmarkedQuestions.map(async question => {
        const updatedQuestion = {
          ...question._doc,
          createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
        return updatedQuestion;
      }),
    );

    res.status(200).json({
      updatedBookmarkedQuestions,
      totalBookmarkedQuestions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 북마크한 답변
router.get('/bookmarks/answers', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const answerIdList = bookmarks.map(bookmark => bookmark.answerId);

    const totalBookmarkedAnswers = answerIdList.length;
    const totalPages = Math.ceil(totalBookmarkedAnswers / pageSize);

    const answers = await Answer.find({ _id: { $in: answerIdList } })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const question = await Question.findById(answer.questionId);
        const questionHashtags = question ? question.hashtags : [];

        return {
          ...answer._doc,
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
    const nextPageUrl = nextPage ? `/api/answer/bookmarks/answers?page=${nextPage}` : null;

    res.status(200).json({
      answers: updatedAnswers,
      nextPageUrl,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 북마크한 댓글
router.get('/bookmarks/comments', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const commentIdList = bookmarks.map(bookmark => bookmark.commentId);

    const totalBookmarkedComments = commentIdList.length;
    const totalPages = Math.ceil(totalBookmarkedComments / pageSize);

    const comments = await Comment.find({ _id: { $in: commentIdList } })
      .sort({ votes: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedComments = await Promise.all(
      comments.map(async comment => {
        const user = await User.findById(comment.userId);
        const author = user ? user.username : 'unknown';

        let questionHashtags;

        if (comment.answerId) {
          const answer = await Answer.findById(comment.answerId);
          if (answer && answer.questionId) {
            const question = await Question.findById(answer.questionId);
            questionHashtags = question ? question.hashtags : [];
          }
        }
        if (comment.questionId) {
          const question = await Question.findById(comment.questionId);
          questionHashtags = question ? question.hashtags : [];
        }

        return {
          ...comment._doc,
          author,
          questionHashtags,
          createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );

    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const nextPageUrl = nextPage ? `/api/mypage/bookmarks/comments?page=${nextPage}` : null;

    res.status(200).json({
      comments: updatedComments,
      nextPageUrl,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json(err);
  }
});

module.exports = router;
