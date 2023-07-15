import styled from "styled-components";
import { Header2 } from "../components/Header2";
import { Nav2 } from "../components/Nav2";
import { Wrapper2 } from "../components/Wrapper2";
import { Articles } from "../components/Articles"


export const List = () => {
    return (
      <>
        <TopContainer>
            <Header2 />
        </TopContainer>
        <Body>
            <LWrapper>
               <Nav2/> 
            </LWrapper>           
            <ListContainer>
                <Articles />
            </ListContainer>
            <RWrapper>
                <Wrapper2/>
            </RWrapper>
        </Body>
      </>
    );
  };

const TopContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 60px;
`;

const LWrapper = styled.div`
  width: 27vw;
`;

const ListContainer = styled.div`
  padding: 0 100px;
  width: 47vw;
`;

const RWrapper = styled.div`
  width: 26vw;
`;