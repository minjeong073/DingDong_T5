import { Outlet } from 'react-router-dom';
import { HashTagNav } from '../../components/HashtagNav';
import { Header, Nav, RightWrapper } from '../../components';
import { Container, Root, LeftWrapper, Main } from './styled';

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
    </Root>
  );
};
