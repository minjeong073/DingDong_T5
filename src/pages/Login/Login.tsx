import { Link } from "react-router-dom";
import { LogoSection, LogoImg, LogoTypo } from "../../components/Header/styled";
import { Button } from "../../components/Button";
import{
  Root,
  Container,
  IDbox,
  PWbox
} from "./styled";
import { LoginState } from "../../stores/login-store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ModalState } from "../../stores/modal-store";
import { useEffect, useState } from "react";
import axios from "axios";
import { response } from "express";

export const Login = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
  const [isModal, setIsModal] = useRecoilState(ModalState);
  const [name, setName] = useState();
  const navigate = useNavigate();
  // const logoutHandler = async() => {
  //   await axios.post("/signin")
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
  //   const userInfo = async(token: string) => {
  //     let config = { headers: { "X-AUTH-TOKEN" : token},};
  //     await axios.post("/signin", config);
  //      return response;
  //     }
  //   userInfo(token).then((res) => {
  //     setName(res.data._doc.name)
  //   });
  // }, []);

  return(
    <Root>
      <Container>
        <Link to={"/"}>
          <LogoSection>
            <LogoImg />
            <LogoTypo>DINGDONG</LogoTypo>
          </LogoSection>
        </Link>
        <IDbox placeholder="아이디"/>
        <PWbox placeholder="비밀번호"/>
        <Button width="100%" height="54px">
          로그인
        </Button>
      </Container>
    </Root>

  );
};