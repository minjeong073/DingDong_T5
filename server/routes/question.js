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
    const updatedQuestions = questions.map((question) => {
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
    updatedQuestions.forEach((question) => console.log(question.createdAt));

    res.status(200).json(updatedQuestions);
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
          { new: true }
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
router.put('/delete/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.author === req.body.author) {
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
