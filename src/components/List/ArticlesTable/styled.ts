import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  height: 900px;
  /* border: 1px solid #e6e8e7; */
  border-collapse: collapse;

  td {
    height: 180px;
    border-top: 1px solid #e6e8e7;
    border-bottom: 1px solid #e6e8e7;
  }
`;

export const TableRow = styled.tr`
  display: flex;
`;

export const TableCell = styled.td`
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px;
  width: 100px;
  height: 32px;
  border-radius: 5px;
`;

export const Div = styled.div`
  font-size: 15px;
  margin-right: 10px;
`;

export const Span = styled.div`
  font-size: 15px;
`;

export const Context = styled.div`
  height: 100%;
`;

export const Title = styled.div`
  margin: 30px 30px 0px 30px;
  font-size: 17px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Addition = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-left: 30px;
`;

export const HashTagWrapper = styled.div``;

export const HashTag = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const Author = styled.div`
  color: gray;
  margin-top: 30px;
  margin-left: 500px;
  font-size: 14px;
`;

export const Date = styled.div`
  color: gray;
  margin-left: 20px;
  margin-top: 30px;
  font-size: 13px;
`;
