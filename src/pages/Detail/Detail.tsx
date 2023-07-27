import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import type { QuestionDataType } from "../../stores/page-store";
import { QuestionForm, AnswerForm } from "../../components";
import { Root } from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";

export const Detail = () => {
  // const [questionData, setQuestionData] = useRecoilState(QuestionData);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionDataType | null>(null); // Change initial state to null

  let { id } = useParams<{ id?: string }>();

  const fetchData = useCallback(async () => {
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
  }, [id]);

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
      <QuestionForm id={id} currentQuestion={currentQuestion} />
    </Root>
  );
};
