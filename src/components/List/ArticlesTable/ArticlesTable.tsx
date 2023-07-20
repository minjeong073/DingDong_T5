import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentState, ItemsState } from "../../../stores/page-store";
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
} from "./styled";

//더미데이터 연결용 인수삽입
export const ArticlesTable = () => {
  const [currentPage, setCurrentPage] = useRecoilState(CurrentState);
  const [itemsPerPage, setItemsPerPage] = useRecoilState(ItemsState);
  const [data, setData] = useState<IDataType[]>([]);

  interface IDataType {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    username: string;
  }

  const getPageData = async () => {
    try {
      const result = await axios.get("/api/articles");
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.error(error);
      alert("게시판 정보 가져오기 실패!");
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  const onClickHashtag = () => {};

  return (
    <>
      <Table>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Info>
                  <Box>
                    {" "}
                    <Div>5{/* {item.votes} */}</Div> <Span>투표수</Span>
                  </Box>
                  <Box>
                    <Div>50{/* {item.answers} */}</Div> <Span>답변수</Span>
                  </Box>
                  <Box>
                    <Div>50000{/* {item.views} */}</Div> <Span>조회수</Span>
                  </Box>
                </Info>
                <Context>
                  <Title>
                    <Link to={"/articles/${articles-id}"}>{item.title}</Link>
                  </Title>
                  <Addition>
                    <HashTagWrapper>
                      {/* {item.hashtag.map((content, index) => (
                      <HashTag onClick={onClickHashtag} key={content}>{content}</HashTag>
                    ))}                   */}
                    </HashTagWrapper>
                    <Author>{item.username}</Author>
                    <Date>{item.createdAt}</Date>
                  </Addition>
                </Context>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};
