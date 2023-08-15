import styled from 'styled-components';
import { Table } from '../List/ArticlesTable/styled';
import { HeartFillIcon } from '../Detail/QuestionForm/styled';

export const LButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

export const Button1 = styled.button<{ $result?: string }>`
  display: flex;
  width: 74px;
  height: 33px;
  border: 1px solid #e2e8f0;
  border-radius: 10px 0 0 10px;
  background-color: ${props => (props.$result === 'answers' ? '#F1F5F9' : '#FFFFFF')};
  color: #0f172a;
  font-size: 15px;
  padding: 7px 0;
  align-items: center;
  justify-content: center;
`;
export const Button2 = styled.button<{ $result?: string }>`
  display: flex;
  width: 74px;
  height: 33px;
  border: 1px solid #e2e8f0;
  padding: 7px 0;
  border-radius: 0 10px 10px 0;
  background-color: ${props => (props.$result === 'comment' ? '#F1F5F9' : '#FFFFFF')};
  color: #0f172a;
  font-size: 15px;
  align-items: center;
  justify-content: center;
`;

export const ReplyTable = styled(Table)`
  td {
    min-height: 121px;
  }
`;

export const TableCell = styled.td`
  flex: 1;
  display: flex;
  width: 683px;
  padding: 24px 0;
  flex-direction: row;
`;

export const Upper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35px;
  margin-left: 45px;
`;

export const Heart_FillIcon = styled(HeartFillIcon)`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  /* margin-top: 21px; */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  width: 100%;
`;

export const Text = styled.div`
  width: 15px;
  height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #64748b;
  text-align: center;
  font-size: 9px;
  font-weight: 400;
  margin-top: 0px;
`;

export const Title = styled.div`
  display: flex;
  /* margin-top: 24px; */
  width: 556px;
  min-height: 54px;
  // border: 1px solid black;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Addition = styled.div`
  display: flex;
  justify-content: flex-end;
  // border: 1px solid black;
  flex: 1;
  flex-direction: row;
`;

export const AuthorInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 33px;
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
  border: 1px solid black;
`;
