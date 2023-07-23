import { useEffect, useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../../components/Button";
import {
  HashtagIcon,
  KeywordInput,
  QuestionForm,
  QuestionKeywordSection,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
} from "./styled";
import axios from "axios";
import e from "express";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { QuestionData } from "../../stores/page-store";
import type { QuestionDataType } from "../../stores/page-store";

export const WriteQuestion = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");
  const [newArticle, setNewArticle] = useState({
    id: 0,
    title: "",
    content: "",
    votes: 0,
    answers: 0,
    views: 0,
    author: "soy",
    hashtags: [],
  });
  const navigate = useNavigate();

  const setQuestionData = useSetRecoilState(QuestionData); // Recoil setter

  const postQuestion = async () => {
    try {
      if (newArticle.title === "" || contents === "") {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }
      await axios.post("/api/articles/", newArticle).then((res) => {
        setQuestionData((prevQuestionData: QuestionDataType[]) => [
          ...prevQuestionData,
          res.data, // Add the new question to the Recoil state
        ]);
        alert("질문 등록 성공!");
        navigate(`/articles/${res.data._id}`);
      });
    } catch (error) {
      console.error(error);
      alert("질문 등록 실패!");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArticle({ ...newArticle, title: e.target.value });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }],
          ["image", "video", "link"],
        ],
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
        // handlers: {
        //   image: imageHandler,
        // },
      },
    }),
    []
  );

  useEffect(() => {
    console.log(contents);
    setNewArticle({ ...newArticle, content: contents });
  }, [contents]);

  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput
          placeholder="질문 내용을 명확하게 요약하여 작성해주세요."
          value={newArticle.title}
          onChange={handleTitleChange}
        />
      </QuestionTitleSection>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      {/* </QuestionContentSection> */}
      <QuestionKeywordSection>
        <HashtagIcon />
        <KeywordInput placeholder="질문 내용의 키워드를 선택해주세요." />
      </QuestionKeywordSection>
      <Button alignself="flex-end" type="button" onClick={postQuestion}>
        질문등록
      </Button>
    </QuestionForm>
  );
};
