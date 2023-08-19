import { UserSection, LoginTypo, LogoutTypo, SignUpTypo } from './styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState, UserState } from 'stores/login-store';

export const LoginLogoutButton = () => {
  const isLogin = useRecoilValue(LoginState);
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [userState, setUserState] = useRecoilState(UserState); // Change this line
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃할건지 물어보기
    if (!window.confirm('로그아웃 하시겠습니까?')) return;

    // 로그아웃 로직 수행 후 LoginState atom 값을 false로 변경
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    setUserState({
      _id: '',
      username: '',
      email: '',
      password: '',
      createdAt: '',
      updatedAt: '',
      bookmarkedQuestions: [],
    });
    setLoginState(false);
  };

  return (
    <>
      {isLogin ? (
        <UserSection onClick={() => navigate('/mypage')}>{userState?.username}</UserSection>
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
