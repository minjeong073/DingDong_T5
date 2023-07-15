import {
  BoldButton,
  HashtagIcon,
  ImgBoxButton,
  ItalicButton,
  KeywordInput,
  QuestionContentSection,
  QuestionForm,
  QuestionKeywordSection,
  QuestionSubmitButton,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
  Textarea,
  Toolbar,
} from "./styled";

export const WriteQuestion = () => {
  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput />
      </QuestionTitleSection>
      <QuestionContentSection>
        <Toolbar>
          <BoldButton />
          <ItalicButton />
          <ImgBoxButton />
        </Toolbar>
        <Textarea />
      </QuestionContentSection>
      <QuestionKeywordSection>
        <HashtagIcon />
        <KeywordInput />
      </QuestionKeywordSection>
      <QuestionSubmitButton>질문하기</QuestionSubmitButton>
    </QuestionForm>
  );
};
