import styled from "styled-components";
import SearchIcon from "../../assets/icon/search.svg";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  width: 1280px;
  margin: 0 auto;
  margin-top: 25px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-top: 220px;
`;

export const SearchBar = styled.input`
  width: 687px;
  height: 68px;
  border-radius: 50px;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 30px 50%;
  box-shadow: 0px 0px 30px 0px rgba(100, 116, 139, 0.18);
  font-size: 18px;
  /* text-align: center;/ */
  padding-left: 70px;
  &::placeholder {
    color: #94a3b8;
    padding-left: 115px;
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
export const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 38px;
`;

export const Button1 = styled.button`
  width: 100px;
  height: 45px;
  border-radius: 50px;
  background: #7c3aed;
  color: #fff;
  text-align: center;
  font-size: 18px;
  margin-right: 8px;
  letter-spacing: 0.3px;
  transition: 0.1s;
  &:hover {
    background: #6d28d9;
  }
`;

export const Button2 = styled.button`
  width: 98px;
  height: 44px;
  border-radius: 50px;
  background: transparent;
  color: #7c3aed;
  text-align: center;
  font-size: 18px;
  letter-spacing: 0.3px;
  transition: 0.1s;
  &:hover {
    text-decoration: underline;
  }
`;

export const HashBody = styled.div`
  margin-top: 91px;
`;
