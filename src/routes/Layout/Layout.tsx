import { Outlet, useLocation } from 'react-router-dom';
import { Header, Nav, HashTagNav, RightWrapper, Footer } from '../../components';
import { Container, Root, LeftWrapper, Main } from './styled';
export const Layout = () => {
  const location = useLocation(); // 현재 URL 정보를 가져옴

  // 푸터가 나타날 URL 조건 설정
  const showFooter = location.pathname.includes('/articles') || location.pathname.includes('/mypage');
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
      {showFooter && <Footer />}
    </Root>
  );
};
