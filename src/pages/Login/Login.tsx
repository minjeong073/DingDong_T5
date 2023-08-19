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
  const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async(event:any) => {
    event.preventDefault();

    try {
        const response = await axios.post("/api/auth/signin", {
            email: email,
            password: password,
        },
        { 
          withCredentials: true 
        }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log("로그인 성공:", response.data);
        navigate("/");
        window.location.reload();
    } catch (error) {
        console.error("로그인 실패:", (error as any).response.data.reason);
    }
  }

  return (
    <Root>
      <Container>
        <Link to={'/'}>
          <LogoSection>
            <LogoImg />
            <LogoTypo>DINGDONG</LogoTypo>
          </LogoSection>
        </Link>
        
          <IDbox placeholder="이메일" value={email} type="text" id="email" onChange={handleEmailChange} />
          <PWbox placeholder="비밀번호" value={password} type="password" id="password" onChange={handlePasswordChange} />
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
