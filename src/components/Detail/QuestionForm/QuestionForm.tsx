import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  BodySection,
  Title,
  TitleSection,
  TopContainer,
  QTypo,
  SaveIcon,
  ContentTypo,
  BottomLeftContainer,
  BottomContainer,
  Typo,
  BottomRightContainer,
  AuthorBox,
  ViewDateContainer,
  AskedTypo,
  AuthorContainer,
  AuthorProfile,
  UserStateCircle,
  HeartFillIcon,
  SaveFillIcon,
  HashTagContainer,
  HashTag,
} from './styled';
import DOMPurify from 'dompurify';
import axios from 'axios';
import type { QuestionDataType } from '../../../stores/page-store';
import { CommentForm } from '../CommentForm';
import { useRecoilValue } from 'recoil';
import { LoginState } from 'stores/login-store';

type Props = {
  _id?: string | null;
};

export const QuestionForm: React.FC<Props> = ({ _id }) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionDataType | null>(null); // Change initial state to null
  const [isVoted, setIsVoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const isLogin = useRecoilValue(LoginState);

  const navigate = useNavigate();

  const fetchQuestionData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('token:', token);
      const response = await axios.get(`/api/articles/${_id}`);
      if (token) {
        const voteResponse = await axios.get(`/api/articles/${_id}/isVoted`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const saveResponse = await axios.get(`/api/articles/${_id}/isBookmarked`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsVoted(voteResponse.data);
        setIsSaved(saveResponse.data);
      }
      const foundQuestion = response.data;
      if (foundQuestion) {
        setCurrentQuestion(foundQuestion);
      }
    } catch (error) {
      console.error(error);
      alert('게시판 정보 가져오기 실패!');
    }
  }, [_id]);

  const updateViews = async () => {
    try {
      await axios.put(`/api/articles/${_id}/view`);
      fetchQuestionData();
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  const deleteQuestion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    // token 없을 경우 로그인 알림 추가해주세요!

    try {
      //삭제할건지 확인
      if (!window.confirm('정말 삭제하시겠습니까?')) {
        return;
      }
      //삭제
      await axios
        .put(`/api/articles/${_id}/delete`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert('질문 삭제 성공!');
          navigate('/articles');
        });
    } catch (error) {
      console.error(error);
      // TODO : access denied 일 경우 다른 알림
      alert('질문 삭제 실패!');
    }
  };

  // 투표수 업데이트
  const handleVote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    // token 없을 경우 알림 추가해주세요!
    try {
      /* TODO : user가 이미 투표했는지 여부를 GET하여 확인하고
      투표하지 않았다면 빈 아이콘, 투표했다면 채워진 아이콘를 보여주도록 구현 
       -> Vote 테이블에 userId와 questionId를 쿼리하여 이미 투표했는지 여부 확인 */
      const response = await axios.put(`/api/articles/${_id}/vote`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const isVoted = response.data;
      setIsVoted(isVoted);
      fetchQuestionData();
    } catch (error) {
      console.error('Error updating votes:', error);
      alert('투표 실패!');
    }
  };

  // 저장수 업데이트
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인 후 이용해주세요!');
      return;
    }
    // token 없을 경우 알림 추가해주세요!

    /* TODO : user가 이미 저장했는지 여부를 GET하여 확인하고
    저장하지 않았다면 빈 아이콘, 저장했다면 채워진 아이콘을 보여주도록 구현
     -> /api/users/mypage/bookmark/:userId에서 확인하여 이미 저장했는지 여부 확인 */
    try {
      const response = await axios.put(`/api/articles/${_id}/bookmark`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const isSaved = response.data;
      setIsSaved(isSaved);
      fetchQuestionData();
    } catch (error) {
      console.error('Error updating saves:', error);
      alert('저장 실패!');
    }
  };

  useEffect(() => {
    fetchQuestionData();
    updateViews();
  }, []);

  return (
    <>
      <TitleSection>
        <QTypo>Q</QTypo>
        <Title>{currentQuestion?.title}</Title>
      </TitleSection>
      <BodySection>
        <TopContainer>
          <ItemContainer>
            {/* 투표 */}
            {isVoted ? <HeartFillIcon onClick={handleVote} /> : <HeartIcon onClick={handleVote} />}
            <ItemTypo>{currentQuestion?.votes}</ItemTypo>
            {/* 저장 */}
            {isSaved ? <SaveFillIcon onClick={handleSave} /> : <SaveIcon onClick={handleSave} />}
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
        </TopContainer>
        <BottomContainer>
          <BottomLeftContainer>
            <HashTagContainer>
              {currentQuestion?.hashtags.map((hashtag, index) => (
                <HashTag key={index}>{hashtag}</HashTag>
              ))}
            </HashTagContainer>
            <Typo underline="true" pointer="true">
              공유
            </Typo>
            <Typo underline="true" pointer="true" onClick={() => navigate(`/articles/modify/${_id}`)}>
              수정
            </Typo>
            <Typo underline="true" pointer="true" onClick={deleteQuestion}>
              삭제
            </Typo>
          </BottomLeftContainer>
          <BottomRightContainer>
            <AuthorBox>
              <AskedTypo>Asked</AskedTypo>
              <AuthorContainer>
                <AuthorProfile>{currentQuestion?.author}</AuthorProfile>
                <UserStateCircle color={currentQuestion?.votes! < 15 ? '#D1D5DB' : '#ffd700'} />
                <Typo>{currentQuestion?.votes}</Typo>
              </AuthorContainer>
            </AuthorBox>
          </BottomRightContainer>
        </BottomContainer>
        {isLogin && <CommentForm _id={_id} selected="articles" />}
      </BodySection>
    </>
  );
};
