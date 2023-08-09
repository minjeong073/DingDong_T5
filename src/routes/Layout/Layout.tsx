import { Outlet } from 'react-router-dom';
import { HashTagNav } from '../../components/HashtagNav';
import { Header, Nav, RightWrapper } from '../../components';
import { Container, Root, LeftWrapper, Main, Footer } from './styled';

export const Layout = () => {
  return (
    <Root>
      <Header />
      <Container>
        <LeftWrapper>
          <Nav />
          <HashTagNav />
        </LeftWrapper>
        <Main>
          <Outlet />
        </Main>
        <RightWrapper />
      </Container>
      <Footer>
        © 2023&nbsp;<b>DINGDONG</b>
      </Footer>
    </Root>
  );
};
