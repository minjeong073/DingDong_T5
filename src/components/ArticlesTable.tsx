import styled from "styled-components"
import React from 'react';
import dummy from "../db/articles.json";
import { isTemplateSpan } from "typescript";

export const ArticlesTable = () => {

  return(
    <Table>
      {dummy.articles.map((item) => (
        <tr key={item.id}>                 
          <Info>
            <Box> <Div>{item.votes}</Div> <Span>투표수</Span></Box>
            <Box><Div>{item.answers}</Div> <Span>답변수</Span></Box>
            <Box><Div>{item.views}</Div> <Span>조회수</Span></Box>
          </Info>          
          <Context>
            <Title>{item.title}</Title>
          </Context>
                   
        </tr>
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

const Info = styled.td`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px;
  width: 100px;
  height: 32px;
  border: 1px solid black;
`;

const Div = styled. div`
  font-size: 20px;
  margin-right: 10px;
`;

const Span= styled.div`
  font-size: 20px;
`;

const Context = styled.td`


`;

const Title = styled.div`
  border: 1px solid black;
  font-size: 20px;
  
`;