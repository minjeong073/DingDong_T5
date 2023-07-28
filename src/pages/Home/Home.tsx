import { LogoSection, LogoImg, LogoTypo } from "../../components/Header/styled";
import {
  Root,
  Header,
  SearchBar,
  Container,
  Button1,
  Button2,
  ButtonBar,
  HashBody,
} from "./styled";
import { HashTagBar } from "../../components/HashtagBar";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Root>
      <Header>
        <LogoSection>
          <LogoImg />
          <LogoTypo>DINGDONG</LogoTypo>
        </LogoSection>
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
        <HashBody>
          <HashTagBar />
        </HashBody>
      </Container>
    </Root>
  );
};
