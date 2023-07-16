import styled from "styled-components"
import React, {useState} from 'react';
import dummy from "../../db/articles.json";
import { Link } from "react-router-dom";

const itemsPerPage = 5;

export const ArticlesTable = () => {

  const onClickHashtag = () => {}
  const [currentPage, setCurrentPage] = useState(1);



  return(
    <Table>
      <tbody>
        {dummy.articles.map((item) => (
          <TableRow key={item.id}>
            <TableCell>                
              <Info>
                <Box> <Div>{item.votes}</Div> <Span>투표수</Span></Box>
                <Box><Div>{item.answers}</Div> <Span>답변수</Span></Box>
                <Box><Div>{item.views}</Div> <Span>조회수</Span></Box>
              </Info>          
              <Context>
                <Title>
                  <Link to={'/articles/${articles-id}'}>{item.title}</Link>
                </Title>
                <Addition>
                  <HashTagWrapper>
                    {item.hashtag.map((content, index) => (
                      <HashTag onClick={onClickHashtag} key={content}>{content}</HashTag>
                    ))}                  
                  </HashTagWrapper>
                  <Author>{item.author}</Author>
                  <Date>{item.date}</Date>
                </Addition>
              </Context>
            </TableCell>
                      
          </TableRow>
        ))}
      </tbody>
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
  height: 100%;
`;

const Title = styled.div`
  margin: 30px 30px 0px 30px;
  font-size: 23px;
  font-weight: medium;
  &:hover{
    cursor: pointer;
    text-decoration: underline;  
  }
`;

const Addition = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-left: 30px;

`;

const HashTagWrapper = styled.div`
`;

const HashTag = styled.button`
  margin-left: 5px;
  padding: 10px;
  background-color: #F1F5F9;
  color: #64748B;
  border: 1px solid #F1F5F9;
  border-radius: 20px;
  font-size: 17px;
  &:hover{
    cursor: pointer;
  };
`;

const Author = styled.div`
  color: gray;
  margin-top: 30px;
  margin-left: 500px;
`;

const Date = styled.div`
  color: gray;
  margin-left: 20px;
  margin-top: 30px;
`;