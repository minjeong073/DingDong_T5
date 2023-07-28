import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import type { QuestionDataType } from "../../stores/page-store";
import {
  HeartIcon,
  ItemContainer,
  ItemTypo,
  QuestionBodySection,
  QuestionTitle,
  QuestionTitleSection,
  QuestionTopContainer,
  QuestionTypo,
  SaveIcon,
  ContentTypo,
  QuestionBottomLeftContainer,
  QuestionBottomContainer,
  Typo,
  QuestionBottomRightContainer,
  AuthorBox,
  ViewDateContainer,
  AskedTypo,
  AuthorContainer,
  AuthorProfile,
  UserStateCircle,
  CommentContainer,
  HeartFillIcon,
} from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";

type Props = {
  id?: string | null;
  currentQuestion?: QuestionDataType | null;
};

export const QuestionForm: React.FC<Props> = ({ id, currentQuestion }) => {
  const navigate = useNavigate();

  const deleteQuestion = useCallback(async () => {
    try {
      //삭제할건지 확인
      if (!window.confirm("정말 삭제하시겠습니까?")) {
        return;
      }
      //삭제
      await axios.delete(`/api/articles/${id}`).then((res) => {
        console.log(res);
        alert("질문 삭제 성공!");
        navigate("/articles");
      });
    } catch (error) {
      console.error(error);
      alert("질문 삭제 실패!");
    }
  }, [id]);

  return (
    <>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitle>{currentQuestion?.title}</QuestionTitle>
      </QuestionTitleSection>
      <QuestionBodySection>
        <QuestionTopContainer>
          <ItemContainer>
            <HeartIcon />
            <ItemTypo>{currentQuestion?.votes}</ItemTypo>
            <SaveIcon />
            <ItemTypo>10</ItemTypo>
          </ItemContainer>
          <ItemContainer>
            <ViewDateContainer>
              <Typo>조회수 {currentQuestion?.views}</Typo>
              <Typo>
                {currentQuestion?.createdAt.substring(
                  0,
                  currentQuestion?.createdAt.indexOf("T")
                )}
              </Typo>
            </ViewDateContainer>
            <ContentTypo
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(currentQuestion?.content as string),
              }}
            />
          </ItemContainer>
        </QuestionTopContainer>
        <QuestionBottomContainer>
          <QuestionBottomLeftContainer>
            <Typo underline="true" pointer="true">
              공유
            </Typo>
            <Typo underline="true" pointer="true">
              <Link to={`/articles/modify/${id}`}>수정</Link>
            </Typo>
            <Typo underline="true" pointer="true" onClick={deleteQuestion}>
              삭제
            </Typo>
          </QuestionBottomLeftContainer>
          <QuestionBottomRightContainer>
            <AuthorBox>
              <AskedTypo>Asked</AskedTypo>
              <AuthorContainer>
                <AuthorProfile>
                  {currentQuestion?.author.slice(0, 3)}
                </AuthorProfile>
                <UserStateCircle
                  color={currentQuestion?.votes! < 15 ? "#D1D5DB" : "#ffd700"}
                />
                <Typo>{currentQuestion?.votes}</Typo>
              </AuthorContainer>
            </AuthorBox>
          </QuestionBottomRightContainer>
        </QuestionBottomContainer>
        {/* <p>Answers: {currentQuestion?.answers}</p> */}
        {/*         <p>Hashtags: {currentQuestion?.hashtags}</p>
        <p>Created: {currentQuestion?.createdAt}</p> */}
        {/* <p>Updated: {currentQuestion?.updatedAt}</p> */}
      </QuestionBodySection>
    </>
  );
};
