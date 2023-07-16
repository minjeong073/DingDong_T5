import styled from "styled-components"
import React from 'react';
import dummy from "../db/articles.json";
import { isTemplateSpan } from "typescript";

const itemsPerPage = 5;

export const ArticlesTable = () => {

  return(
    <Table>
      {dummy.articles.map((item) => (
        <TableRow key={item.id}>
          <TableCell>                
            <Info>
              <Box> <Div>{item.votes}</Div> <Span>투표수</Span></Box>
              <Box><Div>{item.answers}</Div> <Span>답변수</Span></Box>
              <Box><Div>{item.views}</Div> <Span>조회수</Span></Box>
            </Info>          
            <Context>
              <Title>{item.title}</Title>
              <Addition>
                <HashTag>{item.hashtag}</HashTag>
                <Author>{item.author}</Author>
                <Date>{item.date}</Date>
              </Addition>
            </Context>
          </TableCell>          
        </TableRow>
      ))}

    </Table>
  )
}

const Table = styled.table`
  width: 100%;
  height: 900px;
  border: 1px solid #e6e8e7;
  border-collapse: collapse;

  td{
    height: 180px;
    border: 1px solid #e6e8e7;
  }
  
`;

const TableRow = styled.tr`
  display:flex;
`;


const TableCell = styled.td`
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px;
  width: 100px;
  height: 32px;
  border-radius: 5px;

`;

const Div = styled. div`
  font-size: 20px;
  margin-right: 10px;
`;

const Span= styled.div`
  font-size: 20px;
`;

const Context = styled.div`


`;

const Title = styled.div`
  margin: 0px 30px 0px 30px;
  border: 1px solid black;
  font-size: 23px;
  font-weight: medium;
`;

const Addition = styled.div`
  display: flex;
  flex-direction: row;
`;

const HashTag = styled.div`
  margin: 20px;

`;

const Author = styled.div``;

const Date = styled.div``;