import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
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
  HeartFillIcon,
  SaveFillIcon,
} from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";
import type { QuestionDataType } from "../../../stores/page-store";

type Props = {
  _id?: string | null;
};

export const QuestionForm: React.FC<Props> = ({ _id }) => {
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionDataType | null>(null); // Change initial state to null
  const [isVoteClicked, setIsVoteClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [votes, setVotes] = useState<number | null>(null);
  const [saves, setSaves] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null); // Local state for view count

  const navigate = useNavigate();

  const fetchQuestionData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/articles/${_id}`);
      const foundQuestion = response.data;
      if (foundQuestion) {
        setCurrentQuestion(foundQuestion);
        setViews(foundQuestion.views); // Update the local state with the current view count
        setVotes(foundQuestion.votes); // Set the votes value when fetching the question data
        setSaves(foundQuestion.saves); // Set the saves value when fetching the question data
      }
    } catch (error) {
      console.error(error);
      alert("게시판 정보 가져오기 실패!");
    }
  }, [_id]);

  // Function to update the view count locally and on the server
  const updateViews = async () => {
    try {
      if (currentQuestion) {
        const updatedViews = currentQuestion.views + 1;
        setViews(updatedViews); // Update the local state immediately
        await axios.put(`/api/articles/${_id}`, {
          ...currentQuestion,
          views: updatedViews, // Update the view count on the server
        });
      }
    } catch (error) {
      console.error("Error updating views:", error);
      alert("조회수 업데이트 실패!");
    }
  };

  const deleteQuestion = async () => {
    try {
      //삭제할건지 확인
      if (!window.confirm("정말 삭제하시겠습니까?")) {
        return;
      }
      //삭제
      await axios
        .put(`/api/articles/${_id}/delete`, {
          ...currentQuestion,
        })
        .then(() => {
          alert("질문 삭제 성공!");
          navigate("/articles");
        });
    } catch (error) {
      console.error(error);
      alert("질문 삭제 실패!");
    }
  };

  // 투표수 업데이트
  const handleVote = async () => {
    try {
      if (isVoteClicked) {
        await axios.put(`/api/articles/${_id}`, {
          ...currentQuestion,
          votes: votes! - 1,
        });
        setVotes((prev) => prev! - 1);
        setIsVoteClicked(false);
        return;
      }
      await axios.put(`/api/articles/${_id}`, {
        ...currentQuestion,
        votes: votes! + 1,
      });
      setVotes((prev) => prev! + 1);
      setIsVoteClicked(true);
    } catch (error) {
      console.error("Error updating votes:", error);
      alert("투표 실패!");
    }
  };

  // 저장수 업데이트
  const handleSave = async () => {
    try {
      if (isSaveClicked) {
        await axios.put(`/api/articles/${_id}`, {
          ...currentQuestion,
          saves: saves! - 1,
        });
        setSaves((prev) => prev! - 1);
        setIsSaveClicked(false);
        return;
      }
      await axios.put(`/api/articles/${_id}`, {
        ...currentQuestion,
        saves: saves! + 1,
      });
      setSaves((prev) => prev! + 1);
      setIsSaveClicked(true);
    } catch (error) {
      console.error("Error updating saves:", error);
      alert("저장 실패!");
    }
  };

  useEffect(() => {
    fetchQuestionData();
  }, []);

  useEffect(() => {
    updateViews();
  }, [currentQuestion]);

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
            {isVoteClicked ? (
              <HeartFillIcon onClick={handleVote} />
            ) : (
              <HeartIcon onClick={handleVote} />
            )}
            <ItemTypo>{votes}</ItemTypo>
            {/* 저장 */}
            {isSaveClicked ? (
              <SaveFillIcon onClick={handleSave} />
            ) : (
              <SaveIcon onClick={handleSave} />
            )}
            <ItemTypo>{saves}</ItemTypo>
          </ItemContainer>
          <ItemContainer>
            <ViewDateContainer>
              <Typo>조회수 {views}</Typo>
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
            <Typo underline="true" pointer="true">
              공유
            </Typo>
            <Typo underline="true" pointer="true">
              <Link to={`/articles/modify/${_id}`}>수정</Link>
            </Typo>
            <Typo underline="true" pointer="true" onClick={deleteQuestion}>
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
                  color={currentQuestion?.votes! < 15 ? "#D1D5DB" : "#ffd700"}
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
