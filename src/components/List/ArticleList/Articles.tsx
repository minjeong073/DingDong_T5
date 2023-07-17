import { useNavigate } from "react-router-dom";
import WhiteLogo from "../../../assets/icon/white_logo.svg";
import { ArticlesTable } from "../ArticlesTable/ArticlesTable";
import { Holder, Text, Button, Span, Img, ArticleContainer } from "./styled";

export const Articles = () => {
  const navigate = useNavigate();

  const onClickWrite = () => {
    navigate("/articles/write");
  };

  return (
    <>
      <Holder>
        <Text>최신순</Text>
        <Button onClick={onClickWrite}>
          <Img src={WhiteLogo} />
          <Span>질문하기</Span>
        </Button>
      </Holder>
      <ArticleContainer>
        <ArticlesTable />
      </ArticleContainer>
    </>
  );
};
