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
  Root,
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

export const Detail = () => {
  // const [questionData, setQuestionData] = useRecoilState(QuestionData);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionDataType | null>(null); // Change initial state to null
  const navigate = useNavigate();

  let { id } = useParams<{ id: string }>();

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
            <Typo underline pointer>
              공유
            </Typo>
            <Typo underline pointer>
              <Link to={`/articles/modify/${id}`}>수정</Link>
            </Typo>
            <Typo underline pointer onClick={deleteQuestion}>
              삭제
            </Typo>
          </QuestionBottomLeftContainer>
          <QuestionBottomRightContainer>
            <AuthorBox>
              <AskedTypo>Asked</AskedTypo>
              <AuthorContainer>
                <AuthorProfile>딩동</AuthorProfile>
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
      <CommentContainer>
        <ItemContainer style={{ margin: "0 10px" }}>
          <HeartFillIcon style={{ marginBottom: "0px" }} />
          <ItemTypo>10</ItemTypo>
        </ItemContainer>
        <Typo size="14px" color="black" left="10px">
          간단한 세면도구, 환전할 때 필요한 현금들 .. 근데 유럽 서부. 동부 중
          어디로 가세요?
        </Typo>
        <Typo style={{ marginLeft: "auto", justifySelf: "flex-end" }}>
          김딩동 2023.07.20 16:20
        </Typo>
      </CommentContainer>
      <CommentContainer>
        <ItemContainer style={{ margin: "0 10px" }}>
          <HeartIcon style={{ marginBottom: "0px" }} />
          <ItemTypo>10</ItemTypo>
        </ItemContainer>
        <Typo size="14px" color="black" left="10px">
          유럽 동부 쪽으로 갑니다!
        </Typo>
        <Typo style={{ marginLeft: "auto", justifySelf: "flex-end" }}>
          딩동 2023.07.20 17:30
        </Typo>
      </CommentContainer>

      {/* 가짜답변 */}
      <QuestionTitleSection style={{ marginTop: "45px" }}>
        <QuestionTypo>A</QuestionTypo>
        <QuestionTitle style={{ color: "#525458" }}>1개의 답변</QuestionTitle>
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
              {/* <Typo>조회수 {currentQuestion?.views}</Typo> */}
              <Typo>
                {currentQuestion?.createdAt.substring(
                  0,
                  currentQuestion?.createdAt.indexOf("T")
                )}
              </Typo>
            </ViewDateContainer>
            <ContentTypo>
              제 경우에는 유럽 동부 물가가 생각보다 저렴해서 환전을 하고 가는
              것보다 직접 가서 환전하는 것을 추천드립니다.
            </ContentTypo>
          </ItemContainer>
        </QuestionTopContainer>
        <QuestionBottomContainer>
          <QuestionBottomLeftContainer>
            <Typo underline pointer>
              공유
            </Typo>
            {/*             <Typo underline pointer>
              수정
            </Typo>
            <Typo underline pointer onClick={deleteQuestion}>
              삭제
            </Typo> */}
          </QuestionBottomLeftContainer>
          <QuestionBottomRightContainer>
            <AuthorBox>
              <AskedTypo>Answered</AskedTypo>
              <AuthorContainer>
                <AuthorProfile>이슬</AuthorProfile>
                <UserStateCircle />
                <Typo>999+</Typo>
              </AuthorContainer>
            </AuthorBox>
          </QuestionBottomRightContainer>
        </QuestionBottomContainer>
        {/* <p>Answers: {currentQuestion?.answers}</p> */}
        {/*         <p>Hashtags: {currentQuestion?.hashtags}</p>
        <p>Created: {currentQuestion?.createdAt}</p> */}
        {/* <p>Updated: {currentQuestion?.updatedAt}</p> */}
      </QuestionBodySection>
      <CommentContainer>
        <ItemContainer style={{ margin: "0 10px" }}>
          <HeartFillIcon style={{ marginBottom: "0px" }} />
          <ItemTypo>10</ItemTypo>
        </ItemContainer>
        <Typo size="14px" color="black" left="10px">
          간단한 세면도구, 환전할 때 필요한 현금들 .. 근데 유럽 서부. 동부 중
          어디로 가세요?
        </Typo>
        <Typo style={{ marginLeft: "auto", justifySelf: "flex-end" }}>
          김딩동 2023.07.20 16:20
        </Typo>
      </CommentContainer>
      <CommentContainer>
        <ItemContainer style={{ margin: "0 10px" }}>
          <HeartIcon style={{ marginBottom: "0px" }} />
          <ItemTypo>10</ItemTypo>
        </ItemContainer>
        <Typo size="14px" color="black" left="10px">
          유럽 동부 쪽으로 갑니다!
        </Typo>
        <Typo style={{ marginLeft: "auto", justifySelf: "flex-end" }}>
          딩동 2023.07.20 17:30
        </Typo>
      </CommentContainer>
    </Root>
  );
};
