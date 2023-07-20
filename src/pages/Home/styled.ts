import styled from "styled-components";
import SearchIcon from "../../assets/icon/search.svg";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 108px;
  margin-top: 29px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content:center;
  align-items: center;
  margin-top:264px;
`;

export const SearchBar = styled.input`
  width: 687px;
  height: 68px;
  border-radius: 50px;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 20px 50%;
  box-shadow: 0px 0px 30px 0px rgba(100, 116, 139, 0.15);
  font-size: 16px;
  ::placeholder{

  } 
`