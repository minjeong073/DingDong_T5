import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  height: 900px;
  /* border: 1px solid #e6e8e7; */
  border-collapse: collapse;
  border-top: 1px solid #e6e8e7;

  td {
    height: 150px;
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
  /* height: 180px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #475569;
  margin: 24px 0;
  /* padding-left: 46px; */
`;

export const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;
  width: 120px;
  height: 32px;
  /* border-radius: 5px; */
`;

export const Div = styled.div`
  font-size: 15px;
  margin-right: 10px;
`;

export const Span = styled.div`
  font-size: 15px;
`;

export const Context = styled.div`
  flex: 1;
  height: 100%;
  margin-left: 50px;
`;

export const Title = styled.div`
  margin: 30px 30px 0 0;
  font-size: 17px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Addition = styled.div`
  display: flex;
  width: 100%;
  margin: 35px 0 30px 0;
`;

export const HashTagWrapper = styled.div``;

export const HashTag = styled.button`
  margin-right: 7px;
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
  display: flex;
  justify-content: flex-end;
  flex: 1;
  align-self: center;
  /* margin-top: 30px; */
  /* margin-left: 500px; */
  font-size: 14px;
`;

export const Date = styled.div`
  color: #64748b;
  align-self: center;
  margin: 0 45px 0 20px;
  /* margin-top: 30px; */
  font-size: 13px;
`;
