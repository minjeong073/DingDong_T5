import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import {
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
          <BoldButton />
          <ItalicButton />
          <ImgBoxButton />
        </Toolbar>
        <Textarea placeholder="질문 내용을 작성해주세요." />
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
