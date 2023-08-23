import React, { useCallback } from 'react';
import {
  TableCell,
  TableRow,
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
  MoreTypo,
} from './styled';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import axios, { Axios, AxiosError } from 'axios';

type ReplyRowProps = {
  type: string;
  item: {
    _id: string;
    votes: number;
    content: string;
    questionHashtags: string[];
    author: string;
    createdAt: string;
  };
  expandedStates: {
    [key: string]: boolean;
  };
  onClickExpanded: () => void;
};

export const ReplyRow: React.FC<ReplyRowProps> = ({ type, item, expandedStates, onClickExpanded }) => {
  const navigate = useNavigate();

  const onClickNavigateQuestion = async (item: any) => {
    navigate(`/articles/${item.questionId}`);
  };

  return (
    <TableRow>
      <TableCell>
        <Upper>
          <Icon>
            <HeartFillIcon />
            <Text>{item.votes}</Text>
          </Icon>
        </Upper>
        <Content>
          {type === 'answer' ? (
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
          ) : (
            <Title onClick={() => onClickNavigateQuestion(item)}>{item.content}</Title>
          )}
          {item.content.length > 200 && (
            <MoreTypo onClick={onClickExpanded}>{expandedStates[item._id] ? '접기' : '더보기'}</MoreTypo>
          )}
          <Addition>
            <HashTagWrapper>
              {item.questionHashtags?.map((hashtag: string) => (
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
  );
};
