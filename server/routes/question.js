const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Vote = require('../models/Vote');

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

    //extract hashtags list in one page
    const hashtagsList = questions.flatMap(question => question.hashtags);

    res.status(200).json({ updatedQuestions, totalQuestions, hashtags: hashtagsList });
  } catch (err) {
    res.status(500).json(err);
  }
});

//hashtags
router.get('/allhashtags', async (req, res) => {
  try {
    const allQuestions = await Question.find({ isDeleted: false });
    const allHashtags = allQuestions.flatMap(question => question.hashtags);
    res.status(200).json({ hashtags: allHashtags });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    const questionInKST = {
      ...question._doc,
      createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
    };
    // console.log('test : ' + questionInKST.createdAt);
    // console.log('locale : ' + question.createdAt.toLocaleString());
    // console.log('locale time : ' + question.createdAt.toLocaleTimeString());
    res.status(200).json(questionInKST);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question.author === req.body.author) {
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
        // console.log('test' + updatedQuestion.updatedAt);

        // console.log('iso : ' + updatedQuestion.updatedAt.toISOString());
        // console.log('locale : ' + updatedQuestion.updatedAt.toLocaleString());
        // console.log(
        //   'locale time : ' + updatedQuestion.updatedAt.toLocaleTimeString()
        // );
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
router.put('/:id/delete', async (req, res) => {
  console.log(req.params.id);
  try {
    await Question.findByIdAndUpdate(
      req.params.id,
      {
        content: '',
        isDeleted: true,
        updatedAt: new Date().toLocaleString('ko-KR', {
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

// UPDATE Votes
router.put('/:id/vote', async (req, res) => {
  const questionId = req.params.id;
  const author = req.body.author;
  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    const existingVote = await Vote.findOne({
      questionId,
      username: author,
    });

    if (!existingVote) {
      await Vote.create({
        questionId,
        username: author,
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

// bookmark 추가
// login 구현 후에 userId 수정 예정
router.post('/:id/bookmark', async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await Question.findById(questionId);

    if (question) {
      question.saves++;
      await question.save();
    } else {
      res.status(404).json('Question not found!');
    }
    res.status(200).json('Question has been bookmarked');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
