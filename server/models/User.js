const mongoose = require('mongoose');

// 이메일, 비밀번호, 이름, 전화번호
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
  // 생성일(createdAt)과 수정일(updatedAt)을 자동으로 관리
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
