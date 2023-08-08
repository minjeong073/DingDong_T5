import { Link } from "react-router-dom";
import { LogoSection, LogoImg, LogoTypo } from "../../components/Header/styled";
import { Button } from "../../components/Button";
import{
  Root,
  Container,
  IDbox,
  PWbox
} from "./styled";

export const Login = () => {
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