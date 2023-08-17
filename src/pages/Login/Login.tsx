import { Link } from 'react-router-dom';
import { LogoSection, LogoImg, LogoTypo } from '../../components/Header/styled';
import { Root, Container, IDbox, PWbox, ActionContainer, Button1, Button2 } from './styled';
// import { authAtom, userAtom } from "../../stores/login-store";
import { LoginState } from '../../stores/login-store';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useUserActions } from '../../api/userAPI';
import axios from 'axios';
import { response } from 'express';
import { stringify } from 'querystring';

export const Login = () => {
  // const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
  // const [name, setName] = useState();
  // const navigate = useNavigate();

  // const logoutHandler = async() => {
  //   await axios.post("/signout")
  //   .then((res) => {
  //     if (res.status === 200) {
  //       window.localStorage.removeItem("X-AUTH-TOKEN");
  //       setIsLoggedIn(false);
  //       navigate("/");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   let token = window.localStorage.getItem("X-AUTH-TOKEN");
  //   const userInfo = async(token: any) => {
  //     let config = { headers: { "X-AUTH-TOKEN" : token},};
  //     const response = await axios.post("/signin", config);
  //     return response;
  //     }
  //   userInfo(token).then((res) => {
  //     setName(res.data.map.name)
  //   });
  // }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // const handleLogin = async (userInfo : string[]) => {
  //   // e.preventDefault();

  //   try {
  //     const response = await axios
  //       .post(`/api/auth/signin`,
  //         userInfo,
  //         {withCredentials: true,}
  //       )
  //     const user = response.data;
  //     // 로그인 성공 후 처리
  //     if(response.data){
  //       console.log('Logged in:', user);
  //       navigate('/');
  //     }else{
  //       console.log('Login failed');
  //     }
  //   } catch (error) {
  //     // 로그인 실패 시 처리
  //     console.error('Login error:', error);
  //   }
  // };

  // console.log(userInfo);

  const handleLogin = async () => {
    // e.preventDefault();
    const userInfo = {
      email: email,
      password: password,
    };

    return await axios
      .post(`/api/auth/signin`, userInfo, { withCredentials: true })
      .then(response => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        localStorage.setItem('token', response.data.token);
        const user = response.data.user.user;
        alert(`${user.username}님 환영합니다!`);
        navigate('/');
        // window.location.reload();
        return response;
      })
      .catch(e => {
        console.log(e.response.data);
        return '이메일 혹은 비밀번호를 확인해주세요';
      });
  };

  return (
    <Root>
      <Container>
        <Link to={'/'}>
          <LogoSection>
            <LogoImg />
            <LogoTypo>DINGDONG</LogoTypo>
          </LogoSection>
        </Link>
        <IDbox placeholder="이메일" value={email} type="text" onChange={handleEmailChange} />
        <PWbox placeholder="비밀번호" value={password} type="password" onChange={handlePasswordChange} />
        <ActionContainer>
          <Button1 width="144px" height="52px" type="submit" onClick={handleLogin}>
            로그인
          </Button1>
          <Button2 width="144px" height="52px">
            회원가입
          </Button2>
        </ActionContainer>
      </Container>
    </Root>
  );
};
