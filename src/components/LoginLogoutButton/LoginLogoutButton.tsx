import { useCallback, useState } from 'react';
import { UserSection, LoginTypo, LogoutTypo, SignUpTypo } from './styled';
import { useNavigate } from 'react-router-dom';

export const LoginLogoutButton = () => {
  const [isLogin, setIsLogin] = useState<boolean>(!!localStorage.getItem('token'));

  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // 로그아웃 로직 수행 후 토큰 삭제
    localStorage.removeItem('token');
    setIsLogin(false);
  }, []);

  return (
    <>
      {isLogin ? (
        <UserSection onClick={() => navigate('/mypage')}>딩동</UserSection>
      ) : (
        <LoginTypo onClick={() => navigate('/signin')}> 로그인 </LoginTypo>
      )}
      {isLogin ? (
        <LogoutTypo onClick={handleLogout}>로그아웃</LogoutTypo>
      ) : (
        <SignUpTypo onClick={() => navigate('/signup')}>회원가입</SignUpTypo>
      )}
    </>
  );
};
