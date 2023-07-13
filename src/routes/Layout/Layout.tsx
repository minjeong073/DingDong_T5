import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Nav";
import { Container, Root } from "./styled";

export const Layout = () => {
  return (
    <Root>
      <Header />
      <Container>
        <Nav />
        <Outlet />
      </Container>
    </Root>
  );
};
