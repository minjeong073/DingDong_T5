import { style } from "@mui/system";
import styled from "styled-components";


export const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3vh;
  margin-right: 40px;
  width: 185px;
  height: 130px;
  overflow: auto;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Div = styled.div`
  display: flex;
`;

export const Tr = styled.div`
  display: flex;
  justify-content: center;
`;

export const HashTag = styled.button`
  height: 40px;
  margin: 0 5px;
  padding: 5px 12px;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  font-size: 17px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
`;
