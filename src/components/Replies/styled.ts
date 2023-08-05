import styled from "styled-components";
import { Table } from "../List/ArticlesTable/styled";
import { HeartFillIcon } from "../Detail/QuestionForm/styled";

export const LButton = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button1 = styled.button<{ $result?: string }>`
  display: flex;
  width: 80px;
  height: 39px;
  border: 1px solid #e2e8f0;
  border-radius: 10px 0 0 10px;
  background-color: ${(props) =>
    props.$result === "comment" ? "#F1F5F9" : "#FFFFFF"};
  color: #0f172a;
  font-size: 15px;
  padding: 7px 0;
  font-weight: 400;
  justify-content: center;
`;
export const Button2 = styled.button<{ $result?: string }>`
  display: flex;
  width: 80px;
  height: 39px;
  border: 1px solid #e2e8f0;
  padding: 7px 0;
  border-radius: 0 10px 10px 0;
  background-color: ${(props) =>
    props.$result === "answers" ? "#F1F5F9" : "#FFFFFF"};
  color: #0f172a;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
`;

export const ReplyTable = styled(Table)`
  td {
    height: 110px;
  }
`;

export const TableCell = styled.td`
  flex: 1;
  display: flex;
  width: 683px;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Upper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Heart_FillIcon = styled(HeartFillIcon)`
  width: 100%;
  height: 35px;
  border: none;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  width: 35px;
`;

export const Text = styled.div`
  border: none;
  justify-content: center;
  color: #64748b;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
`;

export const Title = styled.div`
  display: flex;
  margin: 15px 0 0 22px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Addition = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  flex-direction: row;
`;

export const Author = styled.div`
  align-self: center;
  width: 66px;
  font-size: 14px;
  margin-right: 10px;
`;

export const Date = styled.div`
  color: #64748b;
  align-self: center;
  font-size: 13px;
`;

export const Comment = styled.div`
  display: flex;
  margin-top: 7px;
`;
