const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
// const autoIdSetter = require('../utils/auto-id-setter');

// id, 내용, 질문 pk, 작성자, 투표수
const AnswerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    content: {
      type: String,
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// autoIdSetter(AnswerSchema, mongoose, 'Answer', 'id');

module.exports = mongoose.model('Answer', AnswerSchema);
