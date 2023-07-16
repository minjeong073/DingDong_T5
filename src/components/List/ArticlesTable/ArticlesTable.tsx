import styled from "styled-components"
import React, {useState} from 'react';
import dummy from "../../../db/articles.json";
import { Link } from "react-router-dom";
import {
  Table,
  TableCell,
  TableRow,
  Info,
  Box,
  Div,
  Span,
  Context,
  Title,
  Addition,
  HashTagWrapper,
  HashTag,
  Author,
  Date
} from "./styled"

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