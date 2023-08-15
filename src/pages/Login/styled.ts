import styled from "styled-components";
import { Button } from "../../components/Button";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 260px;
`;

export const Container = styled.div`
  display: flex;
  width: 310px;
  height: 230px;
  flex-direction: column;
`;

export const IDbox = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: 0.5px solid #E2E8F0;
  padding-left: 22px;
`;

export const PWbox = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: 0.5px solid #E2E8F0;
  margin: 10px 0;
  padding-left: 22px;
`;

export const ActionContainer= styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
`;

export const Button1 = styled(Button)``;

export const Button2 = styled(Button)`
  background: #E2E8F0;
  color: #7C3AED;
  &:hover{
    background: #D9D9D9;
  }
`;