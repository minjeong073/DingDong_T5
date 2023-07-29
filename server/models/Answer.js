const mongoose = require('mongoose');

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
    questionTitle: {
      type: String,
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
    saves: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


// Date 객체로 변환
AnswerSchema.methods.convertDate = function () {
  this.createdAt = new Date(this.createdAt);
  this.updatedAt = new Date(this.updatedAt);
  return this;
};

module.exports = mongoose.model('Answer', AnswerSchema);
