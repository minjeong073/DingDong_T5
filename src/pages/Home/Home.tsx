import {

  LogoSection, 
  LogoImg, 
  LogoTypo,
} from "../../components/Header/styled";
import { Root, Header, SearchBar, Container } from "./styled";

export const Home = () => {
  return(
    <Root>
      <Header> 
          <LogoSection>
          <LogoImg />
          <LogoTypo>DINGDONG</LogoTypo>
        </LogoSection>
      </Header>
      <Container>
        <SearchBar/>
      </Container> 
    </Root>
  )
}