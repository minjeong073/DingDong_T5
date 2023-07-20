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

export const WriteQuestion = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");

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
  }, [contents]);

  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput placeholder="질문 내용을 명확하게 요약하여 작성해주세요." />
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
      <Button alignself="flex-end">질문등록</Button>
    </QuestionForm>
  );
};
