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
      <Button alignSelf="flex-end">질문등록</Button>
    </QuestionForm>
  );
};
