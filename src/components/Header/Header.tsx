import { useState } from 'react';
import { SearchBar } from './SearchBar';
import {
  LogoImg,
  LogoSection,
  LogoTypo,
  NotificationSection,
  Root,
  SearchInput,
  UserSection,
  LoginTypo,
  SignUpTypo,
  LogoutTypo,
} from './styled';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <Root>
      <LogoSection onClick={()=>navigate('/')}>
        <LogoImg />
        <LogoTypo>DINGDONG</LogoTypo>
      </LogoSection>
      <SearchInput />
      {isLogin ? <UserSection>딩동</UserSection> : <LoginTypo onClick={() => navigate('/signin')}>로그인</LoginTypo>}
      {isLogin ? (
        <LogoutTypo>로그아웃</LogoutTypo>
      ) : (
        <SignUpTypo onClick={() => navigate('/signup')}>회원가입</SignUpTypo>
      )}
    </Root>
  );
};
