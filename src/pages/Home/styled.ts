import styled from "styled-components";
import SearchIcon from "../../assets/icon/search.svg";

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items:center;
  margin-left: 108px;
  margin-top: 29px;
`;

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin-top: 264px;
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
  place-holder: "함께 이어지는 여정, 여행커뮤니티 딩동";
`