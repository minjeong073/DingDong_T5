import { Button } from 'components';
import {
  SaveIcon,
  Container,
  Input,
  HeartFillIcon,
  HeartIcon,
  ItemContainer,
  ItemTypo,
  Typo,
  ContentContainer,
  InfoContainer,
  Root,
  SaveFillIcon,
  ButtonContainer,
} from './styled';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { set } from 'mongoose';
import { useRecoilValue } from 'recoil';
import { LoginState } from 'stores/login-store';

type Props = {
  _id?: string | null;
  selected: string;
};

type Comment = {
  _id: string;
  questionId?: string;
  answerId?: string;
  userId: string;
  author?: string;
  content: string;
  votes?: number;
  saves?: number;
  createdAt: string;
  updatedAt: string;
};

export const CommentForm: React.FC<Props> = ({ _id, selected }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ userId: '64cf545ec07a5fb842cb5016', content: '' });
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // 수정중인 댓글의 id

  const fetchCommentList = async () => {
    try {
      const response = await axios.get(`/api/comment?${selected === 'articles' ? 'question' : 'answer'}Id=${_id}`);
      setCommentList(response.data);
    } catch (error) {
      console.error("Error fetching comment's data:", error); // "Error fetching comment's data: Error: Request failed with status code 401
      alert('댓글 정보 가져오기 실패!');
    }
  };

  const onChangeCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({
      ...newComment,
      content: e.target.value,
    });
  };

  const onSubmitComment = async () => {
    if (!newComment.content) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      if (editingCommentId) {
        await axios.put(`/api/comment/${editingCommentId}`, newComment);
        setEditingCommentId(null);
        setNewComment({ userId: '64cf545ec07a5fb842cb5016', content: '' });
        fetchCommentList();
        return;
      }
      await axios.put(`/api/${selected}/${_id}/comment`, newComment);
      fetchCommentList();
      setNewComment({ userId: '64cf545ec07a5fb842cb5016', content: '' });
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const onClickCommentDelete = async (commentId: string) => {
    try {
      await axios.delete(`/api/comment/${commentId}`, {
        data: {
          userId: '64cf545ec07a5fb842cb5016', //임시
        },
      });

      // 정말로 삭제하시겠습니까? 확인창 띄우기
      const confirm = window.confirm('정말로 삭제하시겠습니까?');
      if (confirm) {
        alert('삭제되었습니다.');
      }
    } catch (error) {
      if ((error as AxiosError).response!.status === 401) {
        alert('자신의 댓글만 삭제할 수 있습니다.');
      }
      console.error("Error deleting comment's data:", error);
      alert('댓글 삭제에 실패했습니다.');
    }
    fetchCommentList();
  };

  const onClickCommentEdit = async (commentId: string) => {
    const editingComment = commentList.find(comment => comment._id === commentId);
    if (!editingComment) return;
    setNewComment(editingComment);
    setEditingCommentId(commentId);
  };

  const onClickCommentVote = async (commentId: string) => {
    /* TODO : user가 이미 투표했는지 여부를 GET하여 확인하고
      투표하지 않았다면 빈 아이콘, 투표했다면 채워진 아이콘를 보여주도록 구현 
       -> Vote 테이블에 userId와 answerId를 쿼리하여 이미 투표했는지 여부 확인 */
    try {
      const answerResponse = await axios.get(`/api/comment/${commentId}`);
      const answerToUpdate = answerResponse.data;
      if (!answerToUpdate) return;

      await axios.put(`/api/comment/${commentId}/vote`, {
        ...answerToUpdate,
      });
      fetchCommentList();
    } catch (error) {
      console.error('Error updating votes:', error);
      alert('투표 실패!');
    }
  };

  const onClickCommentSave = async (commentId: string) => {
    /* TODO : user가 이미 저장했는지 여부를 GET하여 확인하고
    저장하지 않았다면 빈 아이콘, 저장했다면 채워진 아이콘을 보여주도록 구현
     -> /api/users/mypage/bookmark/:userId에서 확인하여 이미 저장했는지 여부 확인 */
    /*     const answerResponse = await axios.get<Comment>(`/api/comment/${commentId}`);
    const answerToUpdate = answerResponse.data;
    if (!answerToUpdate) return;

    try {
      await axios.put(`/api/comment/${commentId}`, {
        ...answerToUpdate,
      });
      fetchCommentList();
    } catch (error) {
      console.error('Error updating saves:', error);
      alert('저장 실패!');
    } */
  };

  const onClickEditingCancel = () => {
    setEditingCommentId(null);
    setNewComment({ userId: '64cf545ec07a5fb842cb5016', content: '' });
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  return (
    <Root>
      {commentList?.map(comment => (
        <Container key={comment._id}>
          <ItemContainer left="10px" right="8px">
            {true ? (
              <HeartFillIcon onClick={() => onClickCommentVote(comment._id)} />
            ) : (
              <HeartIcon onClick={() => onClickCommentVote(comment._id)} />
            )}
            <ItemTypo>{comment.votes}</ItemTypo>
          </ItemContainer>
          <ItemContainer right="10px">
            {true ? (
              <SaveFillIcon onClick={() => onClickCommentSave(comment._id)} top="1px" bottom="2px" />
            ) : (
              <SaveIcon onClick={() => onClickCommentSave(comment._id)} top="1px" bottom="2px" />
            )}
            <ItemTypo>{comment.saves}</ItemTypo>
          </ItemContainer>
          <ContentContainer>
            <Typo color="black">{comment?.content}</Typo>
            <InfoContainer>
              <Typo size="12px">{comment?.author}</Typo>
              <Typo size="12px">{comment?.updatedAt || comment?.createdAt}</Typo>
              <Typo pointer="true" underline="true" size="12px">
                공유
              </Typo>
              <Typo onClick={() => onClickCommentEdit(comment._id!)} pointer="true" underline="true" size="12px">
                수정
              </Typo>
              <Typo onClick={() => onClickCommentDelete(comment._id!)} pointer="true" underline="true" size="12px">
                삭제
              </Typo>
            </InfoContainer>
          </ContentContainer>
        </Container>
      ))}
      <Input placeholder="댓글을 입력하세요" value={newComment.content} onChange={onChangeCommentInput} />
      <ButtonContainer>
        <Button onClick={onSubmitComment} width="88px" height="38px" fontsize="15px" top="5px" borderradius="8px">
          {editingCommentId ? '댓글수정' : '댓글작성'}
        </Button>
        {editingCommentId && (
          <Button
            onClick={onClickEditingCancel}
            width="58px"
            height="38px"
            fontsize="15px"
            top="5px"
            left="2px"
            borderradius="8px">
            취소
          </Button>
        )}
      </ButtonContainer>
    </Root>
  );
};
