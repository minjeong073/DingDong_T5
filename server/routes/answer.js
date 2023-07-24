const router = require('express').Router();
const Answer = require('../models/Answer');

// Answer CRUD
// CREATE
router.post('/', async (req, res) => {
  const newAnswer = new Answer(req.body);
  try {
    const savedAnswer = await newAnswer.save();
    res.status(200).json(savedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const answer = await Answer.find();
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
