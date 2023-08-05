import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
  WriteAnswerForm,
  Title,
} from "./styled";
import DOMPurify from "dompurify";
import axios from "axios";
import { Button } from "../Button";
import ReactQuill from "react-quill";

interface AnswerDataType {
  _id: string;
  content: string;
  questionTitle: string;
  questionId: string;
  author: string;
  votes: number;
  saves: number;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  _id?: string | null;
};

export const AnswerForm: React.FC<Props> = ({ _id }) => {
  const QuillRef = useRef<ReactQuill>();

  const [contents, setContents] = useState("");
  // 답변게시글 배열
  const [answerData, setAnswerData] = useState<AnswerDataType[]>([]);
  const [newAnswer, setNewAnswer] = useState({
    content: "",
    questionTitle: "",
    questionId: _id,
    author: "min",
    votes: 0,
    saves: 0,
  });

  const postAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (newAnswer.content === "") {
        alert("내용을 입력해주세요.");
        return;
      }
      await axios.post(`/api/answer/${_id}`, newAnswer).then((res) => {
        setAnswerData((prevAnswerData: AnswerDataType[]) => [
          ...prevAnswerData,
          res.data,
        ]);
        alert("답변 등록 성공!");
        setContents("");
      });
    } catch (error) {
      console.error(error);
      alert("답변 등록 실패!");
    }
  };

  const fetchAnswerData = async () => {
    try {
      const answerResponse = await axios.get(`/api/answer/all/${_id}`);
      const foundAnswer = answerResponse.data;
      if (foundAnswer) {
        setAnswerData(foundAnswer);
      }
    } catch (error) {
      console.error(error);
      alert("답변 정보 가져오기 실패!");
    }
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
    setNewAnswer({ ...newAnswer, content: contents });
  }, [contents]);

  useEffect(() => {
    fetchAnswerData();
  }, []);

  return (
    <>
      {answerData.length > 0 && (
        <QuestionTitleSection top="45px">
          <QuestionTypo>A</QuestionTypo>
          <QuestionTitle style={{ color: "#525458" }}>
            {answerData.length}개의 답변
          </QuestionTitle>
        </QuestionTitleSection>
      )}
      {answerData?.map((answer, index) => (
        <QuestionBodySection key={`${answer.questionId}_${index}`}>
          <QuestionTopContainer>
            <ItemContainer>
              <HeartIcon />
              <ItemTypo>{answer.votes}</ItemTypo>
              <SaveIcon />
              <ItemTypo>{answer.saves}</ItemTypo>
            </ItemContainer>
            <ItemContainer>
              <ViewDateContainer>
                {/* <Typo>조회수 {currentQuestion?.views}</Typo> */}
                <Typo>{answer.createdAt}</Typo>
              </ViewDateContainer>
              <ContentTypo
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(answer.content as string),
                }}
              />
            </ItemContainer>
          </QuestionTopContainer>
          <QuestionBottomContainer>
            <QuestionBottomLeftContainer>
              <Typo underline="true" pointer="true">
                공유
              </Typo>
              {/*             <Typo underline="true" pointer>
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
                  <AuthorProfile>{answer.author}</AuthorProfile>
                  <UserStateCircle color="#ffd700" />
                  <Typo>{answer.votes}</Typo>
                </AuthorContainer>
              </AuthorBox>
            </QuestionBottomRightContainer>
          </QuestionBottomContainer>
          {/* <p>Answers: {currentQuestion?.answers}</p> */}
          {/*         <p>Hashtags: {currentQuestion?.hashtags}</p>
        <p>Created: {currentQuestion?.createdAt}</p> */}
          {/* <p>Updated: {currentQuestion?.updatedAt}</p> */}
        </QuestionBodySection>
      ))}
      <WriteAnswerForm>
        <Title>답변 작성하기</Title>
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
          style={{ height: "300px" }}
        />
        <Button alignself="flex-end" height="44px" onClick={postAnswer}>
          답변등록
        </Button>
      </WriteAnswerForm>
    </>
  );
};
