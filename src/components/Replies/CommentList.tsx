import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
// import { allArticles } from "../../../api/url";
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionListState } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import { TableRow, Tbody, HashTagWrapper, HashTag } from '../List/ArticlesTable/styled';
import {
  LButton,
  Button1,
  Button2,
  ReplyTable,
  Upper,
  Heart_FillIcon,
  Icon,
  Content,
  Text,
  Title,
  Addition,
  AuthorInfo,
  Author,
  Date,
  Comment,
  TableCell,
} from './styled';
import { useNavigate } from 'react-router-dom';
import dummy from '../../db/comment.json';
import WhiteLogo from '../../assets/icon/white_logo.svg';
import { Holder, Img, Span } from '../List/ArticleList/styled';
import { Button } from '../Button';

export const CommentList = () => {
  const [result, setResult] = useState('answers');

  const ButtonClick = (buttonNumber: number) => {
    if (buttonNumber === 1) {
      setResult('answers');
    } else if (buttonNumber === 2) {
      setResult('comment');
    }
  };
  const navigate = useNavigate();
  const onClickWrite = () => {
    navigate('/articles/write');
  };

  const dataArray = (dummy as any)[result];
  const Data = dataArray.sort((a: any, b: any): any => parseInt(b.votes) - parseInt(a.votes));

  return (
    <>
      <Holder>
        <LButton>
          <Button1 onClick={() => ButtonClick(1)} $result={result}>
            답변
          </Button1>
          <Button2 onClick={() => ButtonClick(2)} $result={result}>
            댓글
          </Button2>
        </LButton>
        <Button width="123px" bottom="10px" onClick={onClickWrite}>
          <Img src={WhiteLogo} />
          <Span>질문하기</Span>
        </Button>
      </Holder>
      <ReplyTable>
        <Tbody>
          {Data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>
                <Upper>
                  <Icon>
                    <Heart_FillIcon />
                    <Text>{item.votes}</Text>
                  </Icon>
                </Upper>
                <Content>
                  <Title>{(item as any)[result]}</Title>
                  <Addition>
                    <HashTagWrapper>
                      {/* {item.hashtags.map((content, index) => (
                        <HashTag onClick={onClickHashtag} key={content}>
                          {content}
                        </HashTag>
                      ))} */}
                    </HashTagWrapper>
                    <AuthorInfo>
                      <Author>{item.author}</Author>
                      <Date>{item.createdAt}</Date>
                    </AuthorInfo>
                  </Addition>
                </Content>
              </TableCell>
            </TableRow>
          ))}
        </Tbody>
      </ReplyTable>
    </>
  );
};
