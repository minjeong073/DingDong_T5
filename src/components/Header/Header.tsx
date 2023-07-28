import { useState } from "react";
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
} from "./styled";

export const Header = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Root>
      <LogoSection>
        <LogoImg />
        <LogoTypo>DINGDONG</LogoTypo>
      </LogoSection>
      <SearchInput />
      {isLogin ? (
        <UserSection>딩동</UserSection>
      ) : (
        <LoginTypo>로그인</LoginTypo>
      )}
      {isLogin ? (
        <LogoutTypo>로그아웃</LogoutTypo>
      ) : (
        <SignUpTypo>회원가입</SignUpTypo>
      )}
    </Root>
  );
};
