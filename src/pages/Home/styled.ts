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
  align-items: center;
  margin-top:220px;
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
  &::placeholder{
    color: #94A3B8;
    text-align: center;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  } 
`
export const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 38px;
`;


export const Button1 =styled.button`
  width: 98px;
  height: 44px;
  border-radius: 50px;
  background: #7C3AED;
  color: #FFF;
  text-align: center;
  font-size:18px;
  margin-right: 8px;
`;

export const Button2 = styled.button`
  width: 98px;
  height: 44px;
  border-radius: 50px;
  background: #7C3AED;
  color: #FFF;
  text-align: center;
  font-size:18px;  
  margin-left: 8px;
`;

export const HashBody = styled.div`
  margin-top:91px;
`;