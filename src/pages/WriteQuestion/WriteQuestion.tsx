import { useEffect, useState, useRef } from "react";
import { Button } from "../../components/Button";
import {
  Bold,
  BoldButton,
  HashtagIcon,
  ImgBoxButton,
  ItalicButton,
  KeywordInput,
  QuestionContentSection,
  QuestionForm,
  QuestionKeywordSection,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
  Textarea,
  Toolbar,
} from "./styled";

export const WriteQuestion = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSelectionChange = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = textarea.value.substring(selectionStart, selectionEnd);

    const boldText = <Bold>{selectedText}</Bold>;
    const formattedContent =
      content.substring(0, selectionStart) +
      boldText +
      content.substring(selectionEnd);
    setContent(formattedContent);
    console.log(boldText);
  };

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (keyword.endsWith(", ")) {
      setKeywordList(
        keyword.split(", ").filter((keyword) => keyword.length > 0)
      );
    }
  }, [keyword]);

  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput placeholder="질문 내용을 명확하게 요약하여 작성해주세요." />
      </QuestionTitleSection>
      <QuestionContentSection>
        <Toolbar>
          <BoldButton onClick={handleSelectionChange} />
          <ItalicButton />
          <ImgBoxButton />
        </Toolbar>
        <Textarea
          placeholder="질문 내용을 작성해주세요."
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
        />
      </QuestionContentSection>
      <QuestionKeywordSection>
        <HashtagIcon />
        <KeywordInput
          placeholder="질문 내용의 키워드를 작성해주세요."
          value={keyword}
          onChange={onChangeKeyword}
        />
      </QuestionKeywordSection>
      <Button alignself="flex-end">질문등록</Button>
    </QuestionForm>
  );
};
