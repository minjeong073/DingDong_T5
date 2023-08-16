import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
// import { allArticles } from "../../../api/url";
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionListState } from '../../../stores/page-store';
import type { QuestionDataType } from '../../../stores/page-store';
import { Link } from 'react-router-dom';
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
  Date,
  ForPage,
  PurpleBox,
  PurpleDiv,
  PurpleSpan,
  Tbody,
} from './styled';
import { Pagination } from '../Pagination';

type Props = {
  selectedOrder: {
    latest: boolean;
    view: boolean;
    vote: boolean;
  };
};

export const ArticlesTable: React.FC<Props> = ({ selectedOrder }) => {
  const [page, setPage] = useState<number>(1);
  const [QuestionData, setQuestionData] = useState<QuestionDataType[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const itemsPerPage = 5;

  const fetchLatestQuestionData = async (page: number) => {
    try {
      const response = await axios.get(`/api/articles?page=${page}`);
      // setPage(response.data.page);
      // setQuestionData(response.data.updatedQuestions);
      setTotalQuestions(response.data.totalQuestions);

      const updatedQuestions = response.data.updatedQuestions;
      setQuestionData(updatedQuestions);
    } catch (error) {
      console.error(error);
      alert('게시판 정보 가져오기 실패!');
    }
  };

  const fetchViewQuestionData = async (page: number) => {
    try {
      const response = await axios.get(`/api/articles/popular?page=${page}`);
      setTotalQuestions(response.data.totalQuestions);

      const updatedQuestions = response.data.updatedQuestions;
      setQuestionData(updatedQuestions);
    } catch (error) {
      console.error(error);
      alert('게시판 정보 가져오기 실패!');
    }
  };

  const fetchVoteQuestionData = async (page: number) => {
    try {
      const response = await axios.get(`/api/articles/interest?page=${page}`);
      setTotalQuestions(response.data.totalQuestions);

      const updatedQuestions = response.data.updatedQuestions;
      setQuestionData(updatedQuestions);
    } catch (error) {
      console.error(error);
      alert('게시판 정보 가져오기 실패!');
    }
  };

  //데이터 가져오기
  useEffect(() => {
    if (selectedOrder.latest) {
      fetchLatestQuestionData(page);
    }
    if (selectedOrder.view) {
      fetchViewQuestionData(page);
    }
    if (selectedOrder.vote) {
      fetchVoteQuestionData(page);
    }
  }, [page, selectedOrder]);

  /*  useEffect(() => {
    console.log(QuestionData);
  }, [QuestionData]); */

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  //api 이용해서
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await allArticles<String[]>();
  //       setArticles(response.data);
  //     }catch(error){
  //     console.error(error);
  //     alert("게시판 정보 가져오기 실패!");
  //     }
  //   };
  //   fetchData();
  // }, [setArticles]);

  //해시태그 클릭하면 그 기능을 확인할 수 있음
  const onClickHashtag = () => {};

  return (
    <>
      <Table>
        <Tbody>
          {QuestionData?.map((item, idx) => (
            <TableRow key={`${item._id}`}>
              <TableCell>
                <Info>
                  <Box>
                    <Div>{item.votes}</Div>
                    <Span>투표수</Span>
                  </Box>
                  {item.answers === 0 ? (
                    <Box>
                      <Div>{item.answers}</Div>
                      <Span>답변수</Span>
                    </Box>
                  ) : (
                    <PurpleBox>
                      <PurpleDiv>{item.answers}</PurpleDiv>
                      <PurpleSpan>답변수</PurpleSpan>
                    </PurpleBox>
                  )}
                  <Box>
                    <Div>{item.views}</Div>
                    <Span>조회수</Span>
                  </Box>
                </Info>
                <Context>
                  <Title>
                    <Link to={`/articles/${item._id}`}>{item.title}</Link>
                  </Title>
                  <Addition>
                    <HashTagWrapper>
                      {item.hashtags.map((content, index) => (
                        <HashTag onClick={onClickHashtag} key={content}>
                          {content}
                        </HashTag>
                      ))}
                    </HashTagWrapper>
                    <Author>{item.author}</Author>
                    <Date>{item.createdAt}</Date>
                  </Addition>
                </Context>
              </TableCell>
            </TableRow>
          ))}
        </Tbody>
      </Table>
      <Pagination
        page={page}
        QuestionData={QuestionData}
        totalQuestions={totalQuestions}
        itemsPerPage={itemsPerPage}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};
