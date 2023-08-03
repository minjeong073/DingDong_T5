import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import type { QuestionDataType } from '../../stores/page-store';
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  QuestionBodySection,
  QuestionTitle,
  QuestionTitleSection,
  QuestionTopContainer,
  QuestionTypo,
  SaveIcon,
  ContentTypo,
  QuestionBottomLeftContainer,
  QuestionBottomContainer,
  Typo,
  QuestionBottomRightContainer,
  AuthorBox,
  ViewDateContainer,
  AskedTypo,
  AuthorContainer,
  AuthorProfile,
  UserStateCircle,
  CommentContainer,
  HeartFillIcon,
} from './styled';
import DOMPurify from 'dompurify';
import axios from 'axios';

type Props = {
  _id?: string | null;
  currentQuestion?: QuestionDataType | null;
};

export const QuestionForm: React.FC<Props> = ({ _id, currentQuestion }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [votes, setVotes] = useState(currentQuestion?.votes);

  const navigate = useNavigate();

  const deleteQuestion = async () => {
    try {
      //삭제할건지 확인
      if (!window.confirm('정말 삭제하시겠습니까?')) {
        return;
      }
      //삭제
      await axios
        .put(`/api/articles/delete/${_id}`, {
          ...currentQuestion,
        })
        .then(() => {
          alert('질문 삭제 성공!');
          navigate('/articles');
        });
    } catch (error) {
      console.error(error);
      alert('질문 삭제 실패!');
    }
  };

  // 투표기능 구현
  const handleVote = useCallback(async () => {
    try {
      if (isClicked) {
        await axios.put(`/api/articles/${_id}`, {
          ...currentQuestion,
          votes: votes! - 1,
        });
        setVotes((prev) => prev! - 1);
        setIsClicked(false);
        return;
      }
      await axios.put(`/api/articles/${_id}`, {
        ...currentQuestion,
        votes: votes! + 1,
      });
      setVotes((prev) => prev! + 1);
      setIsClicked(true);
    } catch (error) {
      console.error('Error updating votes:', error);
      alert('투표 실패!');
    }
  }, [_id, currentQuestion, isClicked, votes]);

  // votes 값이 갱신될떄 마다 votes를 리렌더링
  useEffect(() => {
    setVotes(currentQuestion?.votes);
  }, [currentQuestion?.votes]);

  return (
    <>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitle>{currentQuestion?.title}</QuestionTitle>
      </QuestionTitleSection>
      <QuestionBodySection>
        <QuestionTopContainer>
          <ItemContainer>
            {/* 투표 */}
            {isClicked ? (
              <HeartFillIcon onClick={handleVote} />
            ) : (
              <HeartIcon onClick={handleVote} />
            )}
            {/* 저장 */}
            <ItemTypo>{votes}</ItemTypo>
            <SaveIcon />
            <ItemTypo>{currentQuestion?.saves}</ItemTypo>
          </ItemContainer>
          <ItemContainer>
            <ViewDateContainer>
              <Typo>조회수 {currentQuestion?.views}</Typo>
              <Typo>{currentQuestion?.createdAt}</Typo>
            </ViewDateContainer>
            <ContentTypo
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(currentQuestion?.content as string),
              }}
            />
          </ItemContainer>
        </QuestionTopContainer>
        <QuestionBottomContainer>
          <QuestionBottomLeftContainer>
            <Typo
              underline='true'
              pointer='true'
            >
              공유
            </Typo>
            <Typo
              underline='true'
              pointer='true'
            >
              <Link to={`/articles/modify/${_id}`}>수정</Link>
            </Typo>
            <Typo
              underline='true'
              pointer='true'
              onClick={deleteQuestion}
            >
              삭제
            </Typo>
          </QuestionBottomLeftContainer>
          <QuestionBottomRightContainer>
            <AuthorBox>
              <AskedTypo>Asked</AskedTypo>
              <AuthorContainer>
                <AuthorProfile>
                  {currentQuestion?.author.slice(0, 3)}
                </AuthorProfile>
                <UserStateCircle
                  color={currentQuestion?.votes! < 15 ? '#D1D5DB' : '#ffd700'}
                />
                <Typo>{currentQuestion?.votes}</Typo>
              </AuthorContainer>
            </AuthorBox>
          </QuestionBottomRightContainer>
        </QuestionBottomContainer>
        {/* <p>Answers: {currentQuestion?.answers}</p> */}
        {/*         <p>Hashtags: {currentQuestion?.hashtags}</p>
        <p>Created: {currentQuestion?.createdAt}</p> */}
        {/* <p>Updated: {currentQuestion?.updatedAt}</p> */}
      </QuestionBodySection>
    </>
  );
};
