import styled from "styled-components";


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
`;