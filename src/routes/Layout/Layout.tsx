import { Outlet } from "react-router-dom";
import { HashTagNav } from "../../components/HashtagNav";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Nav";
import { RightWrapper } from "../../components/RightWrapper";
import { Container, Root, LeftWrapper } from "./styled";

export const Layout = () => {
  return (
    <Root>
      <Header />
      <Container>
        <LeftWrapper>
          <Nav />
          <HashTagNav />
        </LeftWrapper>
        <Outlet />
        <RightWrapper/>
      </Container>
    </Root>
  );
};
