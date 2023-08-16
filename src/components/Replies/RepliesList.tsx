import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import { allArticles } from "../../../api/url";
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionListState } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import {
  LButton,
  Button1,
  Button2,
  Table,
  TableCell,
  TableRow,
  Tbody,
  HashTagWrapper,
  HashTag,
  Upper,
  HeartFillIcon,
  Icon,
  Content,
  Text,
  Title,
  Addition,
  AuthorInfo,
  Author,
  Date,
  Comment,
  LoadingSection,
  LoadingIcon,
  MoreTypo,
} from './styled';
import { useNavigate } from 'react-router-dom';
import dummy from '../../db/comment.json';
import WhiteLogo from '../../assets/icon/white_logo.svg';
import { Holder, Img, Span } from '../List/ArticleList/styled';
import { Button } from '../Button';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';
import DOMPurify from 'dompurify';

const initialUrl = 'http://localhost:5001/api/answer/all';
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const RepliesList = () => {
  const [result, setResult] = useState('answers');
  const [expandedStates, setExpandedStates] = useState<{ [itemId: string]: boolean }>({});

  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
    'answers',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: lastPage => lastPage.nextPageUrl || undefined,
    },
  );

  const ButtonClick = (buttonNumber: number) => {
    if (buttonNumber === 1) {
      setResult('answers');
    } else if (buttonNumber === 2) {
      setResult('comment');
    }
  };

  const onClickWrite = () => {
    navigate('/articles/write');
  };

  const onClickNavigateQuestion = async (item: any) => {
    if (item.questionId) {
      try {
        const response = await axios.get(`/api/articles/${item.questionId}`);
        const questionData = response.data;
        navigate(`/articles/${item.questionId}`);
      } catch (error) {
        alert('삭제된 질문글입니다.');
      }
    }
  };

  useEffect(() => {
    if (data) {
      const initialExpandedStates: { [itemId: string]: boolean } = {};
      data.pages.forEach(pageData => {
        pageData.answers.forEach((item: any) => {
          if (item.content.length > 200) {
            initialExpandedStates[item._id] = false;
          }
        });
      });
      setExpandedStates(initialExpandedStates);
    }
  }, [data]);

  if (isLoading)
    return (
      <LoadingSection>
        <LoadingIcon />
      </LoadingSection>
    );
  if (isError) return <div>{error instanceof Error ? error.message : 'An error occurred'}</div>;

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
        <Button width="123px" bottom="10px" right="10px" onClick={onClickWrite}>
          <Img src={WhiteLogo} />
          <Span>질문하기</Span>
        </Button>
      </Holder>
      <Table>
        <Tbody>
          <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            {data?.pages.map(pageData => {
              return pageData.answers.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Upper>
                      <Icon>
                        <HeartFillIcon />
                        <Text>{item.votes}</Text>
                      </Icon>
                    </Upper>
                    <Content>
                      <Title
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            item.content.length > 200
                              ? expandedStates[item._id]
                                ? item.content
                                : `${item.content.slice(0, 200)}...`
                              : item.content,
                          ),
                        }}
                        $isExpanded={expandedStates[item._id]}
                        onClick={() => onClickNavigateQuestion(item)}
                      />
                      {item.content.length > 200 && (
                        <MoreTypo
                          onClick={() =>
                            setExpandedStates(prevStates => ({ ...prevStates, [item._id]: !prevStates[item._id] }))
                          }>
                          {expandedStates[item._id] ? '접기' : '더보기'}
                        </MoreTypo>
                      )}
                      <Addition>
                        <HashTagWrapper>
                          {item.questionHashtags.map((hashtag: string) => (
                            <HashTag key={hashtag}>{hashtag}</HashTag>
                          ))}
                        </HashTagWrapper>
                        <AuthorInfo>
                          <Author>{item.author}</Author>
                          <Date>{item.createdAt}</Date>
                        </AuthorInfo>
                      </Addition>
                    </Content>
                  </TableCell>
                </TableRow>
              ));
            })}
            {isFetching && (
              <LoadingSection>
                <LoadingIcon />
              </LoadingSection>
            )}
          </InfiniteScroll>
        </Tbody>
      </Table>
    </>
  );
};
