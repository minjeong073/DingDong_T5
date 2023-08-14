import { useState, useEffect, useRef, useMemo } from 'react';
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  BodySection,
  Title,
  TitleSection,
  TopContainer,
  ATypo,
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
  Item,
} from './styled';
import DOMPurify from 'dompurify';
import axios, { AxiosError } from 'axios';
import { WriteAnswerForm } from '../WriteAnswerForm';
import { CommentForm } from '../CommentForm';

interface AnswerDataType {
  _id: string;
  content: string;
  questionTitle: string;
  questionId: string;
  author: string;
  votes: number;
  saves: number;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  _id?: string | null;
};

export const AnswerForm: React.FC<Props> = ({ _id }) => {
  // 답변 내용
  const [contents, setContents] = useState('');
  // 답변게시글 배열
  const [answerData, setAnswerData] = useState<AnswerDataType[]>([]);
  // State to keep track of the new answer being created
  const [newAnswer, setNewAnswer] = useState({
    content: '',
    userId: '64d24cb479cd50b639db526a',
    author: '임시',
  });
  // State to keep track of the answer being edited
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  // State to keep track of vote and save counts for each answer
  const [answerVotes, setAnswerVotes] = useState<{ [key: string]: number }>({});
  const [answerSaves, setAnswerSaves] = useState<{ [key: string]: number }>({});
  // State to keep track of whether the vote button has been clicked (로그인 구현 전까지 임시로 사용)
  const [isVoteClicked, setIsVoteClicked] = useState<{
    [key: string]: boolean;
  }>({});
  // State to keep track of whether the save button has been clicked (로그인 구현 전까지 임시로 사용)
  const [isSaveClicked, setIsSaveClicked] = useState<{
    [key: string]: boolean;
  }>({});

  // to get the reference of the Quill editor
  const writeAnswerFormRef = useRef<HTMLFormElement>(null);

  const fetchAnswerData = async () => {
    try {
      const answerResponse = await axios.get(`/api/answer/all/${_id}`);
      const foundAnswer = answerResponse.data;
      if (foundAnswer) {
        setAnswerData(foundAnswer);
      }
    } catch (error) {
      console.error(error);
      alert('답변 정보 가져오기 실패!');
    }
  };

  const postAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (newAnswer.content === '') {
        alert('내용을 입력해주세요.');
        return;
      }

      if (editingAnswerId) {
        // If editingAnswerId is not null, it means we are editing an existing answer
        await axios
          .put(`/api/answer/${editingAnswerId}`, {
            ...newAnswer,
            content: contents,
          })
          .then(res => {
            // Update the answerData array with the updated answer
            setAnswerData((prevAnswerData: AnswerDataType[]) =>
              prevAnswerData.map(item => (item._id === editingAnswerId ? res.data : item)),
            );
            alert('답변 수정 성공!');
            setContents('');
            setEditingAnswerId(null);
            fetchAnswerData();
          });
        return;
      }
      // If editingAnswerId is null, it means we are creating a new answer
      await axios.post(`/api/answer/${_id}`, newAnswer).then(res => {
        // setAnswerData((prevAnswerData: AnswerDataType[]) => [...prevAnswerData, res.data]);
        alert('답변 등록 성공!');
        setContents('');
        fetchAnswerData();
      });
    } catch (error) {
      console.error(error);
      if ((error as AxiosError).response && (error as AxiosError).response!.status === 401) {
        alert('자신이 작성한 글만 수정할 수 있습니다.'); // 401 Unauthorized 에러 시 알림
      }
      if ((error as AxiosError).response && (error as AxiosError).response!.status === 500) {
        alert('답변 등록 실패!'); // 500 Internal Server Error 에러 시 알림
      }
    }
  };

  // 특정 answer를 삭제하는 함수
  const deleteAnswer = async (answerId: string) => {
    try {
      await axios.delete(`/api/answer/${answerId}`).then(res => {
        setAnswerData((prevAnswerData: AnswerDataType[]) => prevAnswerData.filter(item => item._id !== answerId));
        alert('답변 삭제 성공!');
      });
    } catch (error) {
      console.error(error);
      alert('답변 삭제 실패!');
    }
  };

  // Function to handle the editing of an answer
  const editAnswer = (answerId: string) => {
    // Find the answer to edit in the answerData array
    const editedAnswer = answerData.find(answer => answer._id === answerId);
    if (editedAnswer) {
      setContents(editedAnswer.content);
      setEditingAnswerId(answerId);

      if (writeAnswerFormRef.current) {
        writeAnswerFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Function to handle voting
  const handleVote = async (answerId: string) => {
    try {
      /* TODO : user가 이미 투표했는지 여부를 GET하여 확인하고
      투표하지 않았다면 빈 아이콘, 투표했다면 채워진 아이콘를 보여주도록 구현 
       -> Vote 테이블에 userId와 answerId를 쿼리하여 이미 투표했는지 여부 확인 */
      const answerResponse = await axios.get<AnswerDataType>(`/api/answer/${answerId}`);
      const answerToUpdate = answerResponse.data;
      if (!answerToUpdate) return;

      await axios.put(`/api/answer/${answerId}/vote`, {
        ...answerToUpdate,
      });
      fetchAnswerData();
    } catch (error) {
      console.error('Error updating votes:', error);
      alert('투표 실패!');
    }
  };

  // Function to handle saving
  const handleSave = async (answerId: string) => {
    /* TODO : user가 이미 저장했는지 여부를 GET하여 확인하고
    저장하지 않았다면 빈 아이콘, 저장했다면 채워진 아이콘을 보여주도록 구현
     -> /api/users/mypage/bookmark/:userId에서 확인하여 이미 저장했는지 여부 확인 */
    /*  try {
      const answerResponse = await axios.get<AnswerDataType>(`/api/answer/${answerId}`);
      const answerToUpdate = answerResponse.data;
      if (!answerToUpdate) return;

      await axios.put(`/api/answer/${answerId}/bookmark`, {
        ...answerToUpdate,
      });
      fetchAnswerData();
    } catch (error) {
      console.error('Error updating saves:', error);
      alert('저장 실패!');
    } */
  };

  useEffect(() => {
    setNewAnswer({ ...newAnswer, content: contents });
  }, [contents]);

  useEffect(() => {
    fetchAnswerData();
  }, []);

  /*  useEffect(() => {
    // Update vote and save counts when answerData changes
    answerData.forEach(answer => {
      setAnswerVotes(prevVotes => ({
        ...prevVotes,
        [answer._id]: answer.votes,
      }));
      setAnswerSaves(prevSaves => ({
        ...prevSaves,
        [answer._id]: answer.saves,
      }));
      setIsVoteClicked(prevIsVoteClicked => ({
        ...prevIsVoteClicked,
        [answer._id]: false,
      }));
      setIsSaveClicked(prevIsSaveClicked => ({
        ...prevIsSaveClicked,
        [answer._id]: false,
      }));
    });
  }, [answerData]); */

  return (
    <>
      {answerData.length > 0 && (
        <TitleSection top="45px">
          <ATypo>A</ATypo>
          <Title>{answerData.length}개의 답변</Title>
        </TitleSection>
      )}
      {answerData?.map((answer, index) => (
        <BodySection key={answer._id}>
          <TopContainer>
            <ItemContainer>
              {/* 투표 */}
              {isVoteClicked[answer._id] ? (
                <HeartFillIcon onClick={() => handleVote(answer._id)} />
              ) : (
                <HeartIcon onClick={() => handleVote(answer._id)} />
              )}
              <ItemTypo>{answer.votes}</ItemTypo>
              {/* 저장 */}
              {isSaveClicked[answer._id] ? (
                <SaveFillIcon onClick={() => handleSave(answer._id)} />
              ) : (
                <SaveIcon onClick={() => handleSave(answer._id)} />
              )}
              <ItemTypo>{answer.saves}</ItemTypo>
            </ItemContainer>
            <ItemContainer>
              <ViewDateContainer>
                {/* <Typo>조회수 {current?.views}</Typo> */}
                <Typo>{answer.createdAt}</Typo>
              </ViewDateContainer>
              <ContentTypo
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(answer.content as string),
                }}
              />
            </ItemContainer>
          </TopContainer>
          <BottomContainer>
            <BottomLeftContainer>
              <Typo underline="true" pointer="true">
                공유
              </Typo>
              <Typo underline="true" pointer="true" onClick={() => editAnswer(answer._id)}>
                수정
              </Typo>
              <Typo underline="true" pointer="true" onClick={() => deleteAnswer(answer._id)}>
                삭제
              </Typo>
            </BottomLeftContainer>
            <BottomRightContainer>
              <AuthorBox>
                <AskedTypo>Answered</AskedTypo>
                <AuthorContainer>
                  <AuthorProfile>{answer.author}</AuthorProfile>
                  <UserStateCircle color={answer.votes < 15 ? '#D1D5DB' : '#ffd700'} />
                  <Typo>{answer.votes}</Typo>
                </AuthorContainer>
              </AuthorBox>
            </BottomRightContainer>
          </BottomContainer>
          <CommentForm _id={answer._id} selected="answer" />
        </BodySection>
      ))}
      <WriteAnswerForm
        ref={writeAnswerFormRef}
        contents={contents}
        onContentsChange={setContents}
        postAnswer={postAnswer}
        editingAnswerId={editingAnswerId}
      />
    </>
  );
};
