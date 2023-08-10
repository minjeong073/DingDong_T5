import { style } from "@mui/system";
import styled from "styled-components";

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