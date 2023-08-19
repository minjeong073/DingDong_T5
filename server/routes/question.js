const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const Bookmark = require('../models/Bookmark');

// TODO : 로그인한 유저만 질문을 작성할 수 있도록
//        create, update, delete 미들웨어 추가

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

// GET ALL -LATEST
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await Question.find({ isDeleted: false })
      .sort({ createdAt: -1 }) // 최신순으로 정렬 (내림차순 : -1)
      .skip(startIndex)
      .limit(pageSize)
      .exec();
    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const user = await User.findById(question.userId);
        const author = user ? user.username : 'unknown';
        const updatedQuestion = {
          ...question._doc,
          author,
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

    //extract hashtags list in one page
    const hashtagsList = questions.flatMap(question => question.hashtags);

    res.status(200).json({ updatedQuestions, totalQuestions, hashtags: hashtagsList });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get All hashtags
router.get('/allhashtags', async (req, res) => {
  try {
    const allQuestions = await Question.find({ isDeleted: false });

    // Create an array of hashtag objects with their creation dates
    const hashtagObjects = allQuestions.flatMap(question => {
      return question.hashtags.map(hashtag => {
        return {
          hashtag,
          createdAt: question.createdAt,
        };
      });
    });

    // Count hashtag frequencies
    const hashtagFrequencies = hashtagObjects.reduce((map, obj) => {
      map.set(obj.hashtag, (map.get(obj.hashtag) || 0) + 1);
      return map;
    }, new Map());

    // Sort hashtag objects by frequency and then by creation date
    const sortedHashtagObjects = hashtagObjects.sort((a, b) => {
      const frequencyComparison = hashtagFrequencies.get(b.hashtag) - hashtagFrequencies.get(a.hashtag);
      if (frequencyComparison === 0) {
        // If frequencies are the same, sort by creation date (newest first)
        return b.createdAt - a.createdAt;
      }
      return frequencyComparison;
    });

    // Extract the sorted hashtags and remove duplicates
    const uniqueSortedHashtags = [...new Set(sortedHashtagObjects.map(obj => obj.hashtag))];

    res.status(200).json({ hashtags: uniqueSortedHashtags });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL -POPULAR
router.get('/popular', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await Question.find({ isDeleted: false })
      .sort({ views: -1 }) // 조회순으로 정렬
      .skip(startIndex)
      .limit(pageSize)
      .exec();
    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const user = await User.findById(question.userId);
        const author = user ? user.username : 'unknown';
        const updatedQuestion = {
          ...question._doc,
          author,
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
    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL -INTEREST
router.get('/interest', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await Question.find({ isDeleted: false })
      .sort({ votes: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();
    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const user = await User.findById(question.userId);
        const author = user ? user.username : 'unknown';
        const updatedQuestion = {
          ...question._doc,
          author,
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
    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL - without pagination
router.get('/all', async (req, res) => {
  try {
    const questions = await Question.find();
    const updatedQuestions = questions.map(question => {
      return {
        ...question._doc,
        createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
        updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
      };
    });
    // updatedQuestions.forEach((question) => console.log(question.createdAt));

    res.status(200).json(updatedQuestions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const user = await User.findById(question.userId);
    const commentList = await Comment.find({ questionId: req.params.id }).exec();
    const author = user ? user.username : 'unknown';

    if (!question) {
      res.status(404).json('Question not found!');
    }
    const updatedQuestion = {
      ...question._doc,
      author,
      commentList,
      createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
    };
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET - 클라이언트에서 요청한 질문 ID의 유효성을 검증
router.get('/valid/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (question) {
      // 유효한 질문 ID인 경우
      res.status(200).json({ isValid: true });
    } else {
      // 유효하지 않은 질문 ID인 경우
      res.status(200).json({ isValid: false });
    }
  } catch (error) {
    console.error('Error checking question ID validity:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      res.status(404).json('Question not found!');
    }

    // if (question.author === req.body.author) {
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
          updatedAt: new Date().toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        },
        { new: true },
      );
      res.status(200).json(updatedQuestion);
    } catch (err) {
      res.status(500).json(err);
    }
    // } else {
    //   res.status(401).json('You can update only your Question!');
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.put('/:id/delete', async (req, res) => {
  try {
    await Question.findByIdAndUpdate(
      req.params.id,
      {
        content: '',
        isDeleted: true,
        updatedAt: new Date().toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
        hardDeletedAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
      },
      { new: true },
    );
    await Vote.deleteMany({ questionId: req.params.id });

    res.status(200).json('Question has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ETC

// Comment
router.put('/:id/comment', async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findById(questionId);
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    if (!user) {
      res.status(404).json('User not found!');
    }

    const newComment = new Comment({
      questionId: questionId,
      content: req.body.content,
      userId: userId,
    });
    const savedComment = await newComment.save();
    question.comments += 1;
    await question.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Votes
router.put('/:id/vote', async (req, res) => {
  const questionId = req.params.id;
  const userId = req.body.userId;
  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    const existingVote = await Vote.findOne({
      questionId,
      userId: userId,
    });

    if (!existingVote) {
      await Vote.create({
        questionId,
        userId: userId,
      });
      question.votes += 1;
    } else {
      await Vote.deleteOne({ _id: existingVote._id });
      question.votes -= 1;
    }
    await question.save();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Bookmark
// login 구현 후에 userId 수정 예정
router.put('/:id/bookmark', async (req, res) => {
  const questionId = req.params.id;
  const userId = req.body.userId;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    const existingBookmark = await Bookmark.findOne({
      questionId,
      userId,
    });

    if (!existingBookmark) {
      await Bookmark.create({
        questionId,
        userId,
      });
      question.saves += 1;
    } else {
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      question.saves -= 1;
    }
    await question.save();
    res.status(200).json('Question has been bookmarked');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Views
router.put('/:id/view', async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    question.views += 1;
    await question.save();
    res.status(200).json('Question has been viewed');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
