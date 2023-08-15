import { useNavigate } from 'react-router-dom';
import WhiteLogo from '../../../assets/icon/white_logo.svg';
import { ArticlesTable } from '../ArticlesTable/ArticlesTable';
import {
  Holder,
  Text,
  Span,
  Img,
  ArticleContainer,
  Root,
  OrderContainer,
  LatestOrder,
  ViewOrder,
  VoteOrder,
} from './styled';
import { Button } from '../../Button';
import { useState } from 'react';

export const Articles = () => {
  const [selected, setSelected] = useState({
    latest: true,
    view: false,
    vote: false,
  });

  const navigate = useNavigate();

  const onClickWrite = () => {
    navigate('/articles/write');
  };

  const onClickSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerText === '최신순') {
      setSelected({ latest: true, view: false, vote: false });
    }
    if (target.innerText === '조회순') {
      setSelected({ latest: false, view: true, vote: false });
    }
    if (target.innerText === '관심순') {
      setSelected({ latest: false, view: false, vote: true });
    }
  };

  return (
    <Root>
      <Holder>
        <OrderContainer>
          <LatestOrder onClick={onClickSelected} selected={selected.latest}>
            최신순
          </LatestOrder>
          <ViewOrder onClick={onClickSelected} selected={selected.view}>
            조회순
          </ViewOrder>
          <VoteOrder onClick={onClickSelected} selected={selected.vote}>
            관심순
          </VoteOrder>
        </OrderContainer>
        <Button width="123px" bottom="10px" onClick={onClickWrite}>
          <Img src={WhiteLogo} />
          <Span>질문하기</Span>
        </Button>
      </Holder>
      <ArticleContainer>
        <ArticlesTable />
      </ArticleContainer>
    </Root>
  );
};
