import styled from "styled-components";
import { Table } from "../List/ArticlesTable/styled";

export const LButton = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button1 = styled.button<{$result?: string}>`
  display: flex;
  width: 80px;
  height: 39px;
  border: 1px solid #E2E8F0;
  border-radius: 10px 0 0 10px;
  background-color: ${props => (props.$result === "댓글" ? '#F1F5F9' : '#FFFFFF')};
  color: #0F172A;
  font-size: 15px;
  padding: 7px 0;
  font-weight: 400;
  justify-content: center;
`;
export const Button2 = styled.button<{$result?: string}>`
  display: flex;
  width: 80px;
  height: 39px;
  border: 1px solid #E2E8F0;
  padding: 7px 0;
  border-radius: 0 10px 10px 0;
  background-color: ${props => (props.$result === "답변글" ? '#F1F5F9' : '#FFFFFF')};
  color: #0F172A;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
`;

export const ReplyTable = styled(Table)`
  td{
    height : 110px;
  }
`;


export const TableCell = styled.td`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* height: 180px; */
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap;*/
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  margin: 5px 10px 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
  &:hover{
    cursor: pointer;
    text-decoration: underline;
  }

`;

export const Comment = styled.div`
  display: flex;
  margin-top: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;