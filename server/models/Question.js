const mongoose = require('mongoose');

// 제목, 내용, 작성자, 조회수, 해시태그
const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      required: true,
    },
    hashtags: {
      type: Array,
      required: false,
    },
  },
  // 생성일(createdAt)과 수정일(updatedAt)을 자동으로 관리
  { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);
