import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { QuestionData } from "../../stores/page-store";
import { useRecoilState } from "recoil";
import type { QuestionDataType } from "../../stores/page-store";
import { Root } from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";

export const Detail = () => {
  const [questionData, setQuestionData] = useRecoilState(QuestionData);
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

  useEffect(() => {
    // Find the question with the matching ID
    const foundQuestion = questionData.find((item) => item._id === id);
    if (foundQuestion) {
      setCurrentQuestion(foundQuestion);
    }
  }, [id, questionData]);

  if (!currentQuestion) {
    return <div>Loading...</div>; // Add a loading state while data is being fetched
  }

  return (
    <Root>
      <h1>Detail {id}</h1>
      {/* Render the details of the currentQuestion here */}
      <p>Title: {currentQuestion?.title}</p>
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
