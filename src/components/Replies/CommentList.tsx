import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
// import { allArticles } from "../../../api/url";
import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionListState } from "../../stores/page-store";
import type { QuestionDataType } from "../../stores/page-store";
import { 
  Holder, 
  Text,
 } from "../List/ArticleList/styled";
 import{
  Table,
  TableRow
 } from "../List/ArticlesTable/styled";
 import {
  Title, 
  Comment,
  TableCell 
} from "./styled";
import dummy from "../../db/comment.json";

export const CommentList = () =>{
  const [QuestionData, setQuestionData] =
  useRecoilState<QuestionDataType[]>(QuestionListState);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/articles");
      setQuestionData(response.data);
    } catch (error) {
      console.error(error);
      alert("게시판 정보 가져오기 실패!");
    }
  };

  //데이터 가져오기
  useEffect(() => {
    fetchData();
  }, [setQuestionData]);

  const Comments = dummy.comment.sort((a, b) => parseInt(b.votes) - parseInt(a.votes));
  //console.log(Comments);

  return(
    <>
      <Holder>
        <Text>
          Best Replies
        </Text>
      </Holder>
      <Table>
        <tbody>
          {Comments.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Title>{item.title}</Title>
                <Comment>{item.comment}</Comment>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};