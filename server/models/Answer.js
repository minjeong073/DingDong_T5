const mongoose = require('mongoose');

// id, 내용, 질문 pk, 작성자, 투표수
const AnswerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    questionId: {
      type: Number,
      required: true,
    },
    // User의 id 참조로 수정 예정
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

module.exports = mongoose.model('Answer', AnswerSchema);
