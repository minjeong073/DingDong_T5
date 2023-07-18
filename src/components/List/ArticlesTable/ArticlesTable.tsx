import React, {useState} from 'react';
import dummy from "../../../db/articles.json";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentState, ItemsState } from '../../../stores/page-store';
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


//더미데이터 연결용 인수삽입
export const ArticlesTable = () => {

  const [currentPage, setCurrentPage] = useRecoilState(CurrentState);
  const [itemsPerPage, setItemsPerPage] = useRecoilState(ItemsState);

  const getPageData = () => {
    const startIndex = (currentPage -1)*itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dummy.articles.slice(startIndex, endIndex);
  }

  const onClickHashtag = () => {}

  return(
    <Table>
      <tbody>
        {getPageData().map((item) => (
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