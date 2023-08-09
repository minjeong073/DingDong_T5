import { LogoSection, LogoImg, LogoTypo } from "../../components/Header/styled";
import {
  Root,
  Header,
  Div,
  Login,
  SignUp,
  SearchBar,
  Container,
  Button1,
  Button2,
  Block,
  QuestionBlock,
  AnswerBlock,
  TitleBlock,
  QTypo,
  TitleText,
  TopItems,
  ButtonBar,
  ItemWrapper,
  HashBody,
} from "./styled";
import { HashTagBar } from "../../components/HashtagBar";
import { Link } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  return (
    <Root>
      <Header>
        <LogoSection>
          <LogoImg />
          <LogoTypo>DINGDONG</LogoTypo>
        </LogoSection>
        <Div>
          <Login>
            <Link to={"/signin"}>
              로그인
            </Link>
          </Login>
          <SignUp>
            <Link to={"/signup"}>
              회원가입
            </Link>
          </SignUp>
        </Div>
      </Header>
      <Container>
        <SearchBar placeholder="함께 이어지는 여정, 여행 커뮤니티 딩동" />
        <ButtonBar>
          <Link to={"/articles/write"}>
            <Button1> 질문하기</Button1>
          </Link>
          <Link to={"/articles"}>
            <Button2> 바로가기</Button2>
          </Link>
        </ButtonBar>
        <Block>
          <QuestionBlock>
            <TitleBlock>
              <QTypo>Q</QTypo>
              <TitleText>인기 질문</TitleText>
            </TitleBlock>
            <TopItems>

            </TopItems>
          </QuestionBlock>
          <AnswerBlock>
            <TitleBlock>
              <QTypo>A</QTypo>
              <TitleText>인기 답변</TitleText>
            </TitleBlock>
            <TopItems>

            </TopItems>
          </AnswerBlock>
        </Block>
        <HashBody>
          <ItemWrapper>
            <HashTagBar />
          </ItemWrapper>         
        </HashBody>
      </Container>
    </Root>
  );
};
