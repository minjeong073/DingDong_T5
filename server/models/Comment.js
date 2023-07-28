const mongoose = require('mongoose');

// 제목, 내용, 작성자, 조회수, 해시태그
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    },
    author: {
      type: String,
      default: 0,
    },
  },
  // 생성일(createdAt)과 수정일(updatedAt)을 자동으로 관리
  { timestamps: true }
);

// Date 객체로 변환
CommentSchema.pre('save', function (next) {
  const seoulTime = new Date(this.createdAt).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });
  this.createdAt = new Date(seoulTime);
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);
