import { useState, useEffect } from "react";
import axios from "axios";
// import { allArticles } from "../../../api/url";
import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionListState } from "../../../stores/page-store";
import type { QuestionDataType } from "../../../stores/page-store";
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
  Date,
  ForPage,
} from "./styled";
import { Pagination } from "../Pagination";

const itemsPerPage = 5;

export const ArticlesTable = () => {
  const [page, setPage] = useState(1);
  const [questionData, setQuestionData] =
    useRecoilState<QuestionDataType[]>(QuestionListState);

  //데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/articles");
        setQuestionData(response.data);
      } catch (error) {
        console.error(error);
        alert("게시판 정보 가져오기 실패!");
      }
    };
    fetchData();
  }, [setQuestionData]);

  //handleevent 추가하기
  const handlePaginationChange = (e: number, value: number) => setPage(value);

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
        <tbody>
          {questionData
            .slice(
              (page - 1) * itemsPerPage,
              (page - 1) * itemsPerPage + itemsPerPage
            )
            .map((item, idx) => (
              <TableRow key={`${item.id}_${idx}`}>
                <TableCell>
                  <Info>
                    <Box>
                      {" "}
                      <Div>{item.votes}</Div> <Span>투표수</Span>
                    </Box>
                    <Box>
                      <Div>{item.answers}</Div> <Span>답변수</Span>
                    </Box>
                    <Box>
                      <Div>{item.views}</Div> <Span>조회수</Span>
                    </Box>
                  </Info>
                  <Context>
                    <Title>
                      <Link to={"/articles/${articles-id}"}>{item.title}</Link>
                    </Title>
                    <Addition>
                      <HashTagWrapper>
                        {item.hashtags.map((content) => (
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
        </tbody>
        <Pagination
          page={page}
          itemList={questionData}
          itemsPerPage={itemsPerPage}
          handlePaginationChange={() => handlePaginationChange}
        />
      </Table>
    </>
  );
};
