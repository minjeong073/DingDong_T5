const router = require('express').Router();
const Comment = require('../models/Comment');

// GET
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.username === req.body.username) {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        );
        res.status(200).json(updatedComment);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your Comment!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete('/:id', async (req, res) => {
  const commentId = req.params.id;
  const userId = req.body.userId;
  const commentIds = req.body.commentIds;

  try {
    // commentIds가 request body에 존재하면, 여러개 comment 삭제
    if (commentIds && Array.isArray(commentIds)) {
      // 삭제 전 모든 댓글이 존재하는지 확인
      const commentsToDelete = await Comment.find({
        _id: { $in: commentIds },
        userId: userId,
      });

      if (commentsToDelete.length === commentIds.length) {
        try {
          // 여러 개 댓글 삭제
          await Comment.deleteMany({ _id: { $in: commentIds } });
          res.status(200).json('Comments have been deleted successfully');
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json('You can delete only your Comments!');
      }
    } else {
      // commentIds가 존재하지 않으면, comment 하나를 삭제
      try {
        const comment = await Comment.findById(commentId);
        if (comment && comment.userId === userId) {
          try {
            // 댓글 하나 삭제
            await comment.deleteOne();
            res.status(200).json('Comment has been deleted successfully');
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json('You can delete only your Comment!');
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
