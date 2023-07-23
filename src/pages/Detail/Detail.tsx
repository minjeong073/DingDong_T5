import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { QuestionData } from "../../stores/page-store";
import { useRecoilState } from "recoil";
import type { QuestionDataType } from "../../stores/page-store";
import { Root } from "./styled";

export const Detail = () => {
  const [questionData, setQuestionData] = useRecoilState(QuestionData);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionDataType | null>(null); // Change initial state to null

  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Find the question with the matching ID
    const foundQuestion = questionData.find((item) => item._id === id);
    if (foundQuestion) {
      setCurrentQuestion(foundQuestion);
    }
  }, [id, questionData]);

  /*   if (!currentQuestion) {
    return <div>Loading...</div>; // Add a loading state while data is being fetched
  } */

  return (
    <Root>
      <h1>Detail {id}</h1>
      {/* Render the details of the currentQuestion here */}
      <p>Title: {currentQuestion?.title}</p>
      <p>Content: {currentQuestion?.content}</p>
      {/* ... and so on */}
    </Root>
  );
};
