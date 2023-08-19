import { UserSection, LoginTypo, LogoutTypo, SignUpTypo } from './styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState, UserState } from 'stores/login-store';

export const LoginLogoutButton = () => {
  const isLogin = useRecoilValue(LoginState);
  const user = useRecoilValue(UserState);
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 수행 후 LoginState atom 값을 false로 변경
    localStorage.removeItem('token');
    setLoginState(false);
  };

  return (
    <>
      {isLogin ? (
        <UserSection onClick={() => navigate('/mypage')}>{user?.username}</UserSection>
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
