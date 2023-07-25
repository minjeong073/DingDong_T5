import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { QuestionDataType } from "../../stores/page-store";
import {
  QuestionTitle,
  QuestionTitleSection,
  QuestionTypo,
  Root,
} from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";

export const Detail = () => {
  // const [questionData, setQuestionData] = useRecoilState(QuestionData);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionDataType | null>(null); // Change initial state to null
  const navigate = useNavigate();

  let { id } = useParams<{ id: string }>();

  const deleteQuestion = async () => {
    try {
      await axios.delete(`/api/articles/${id}`).then((res) => {
        console.log(res);
        alert("질문 삭제 성공!");
        navigate("/articles");
      });
    } catch (error) {
      console.error(error);
      alert("질문 삭제 실패!");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/articles");
      // id와 일치하는 데이터를 찾아서 setCurrentQuestion에 넣어준다.
      const foundQuestion = response.data.find(
        (item: QuestionDataType) => item._id === id
      );
      if (foundQuestion) {
        setCurrentQuestion(foundQuestion);
      }
    } catch (error) {
      console.error(error);
      alert("게시판 정보 가져오기 실패!");
    }
  };

  useEffect(() => {
    // Find the question with the matching ID
    /* const foundQuestion = questionData.find((item) => item._id === id);
    if (foundQuestion) {
      setCurrentQuestion(foundQuestion);
    } */
    fetchData();
  }, [id]);

  /*   if (!currentQuestion) {
    return <div>Loading...</div>; // Add a loading state while data is being fetched
  } */

  return (
    <Root>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitle>{currentQuestion?.title}</QuestionTitle>
      </QuestionTitleSection>
      <p>Author: {currentQuestion?.author}</p>
      <p>Votes: {currentQuestion?.votes}</p>
      <p>Answers: {currentQuestion?.answers}</p>
      <p>Views: {currentQuestion?.views}</p>
      <p>Hashtags: {currentQuestion?.hashtags}</p>
      <p>Created: {currentQuestion?.createdAt}</p>
      <p>Updated: {currentQuestion?.updatedAt}</p>

      {/* <p>Content: {currentQuestion?.content}</p> */}
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(currentQuestion?.content as string),
        }}
      />
      <button onClick={deleteQuestion}>Delete</button>
    </Root>
  );
};
