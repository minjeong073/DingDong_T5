import { useNavigate } from 'react-router-dom';
import WhiteLogo from '../../../assets/icon/white_logo.svg';
import { ArticlesTable } from '../ArticlesTable/ArticlesTable';
import { Holder, Text, Span, Img, ArticleContainer, Root } from './styled';
import { Button } from '../../Button';

export const Articles = () => {
  const navigate = useNavigate();

  const onClickWrite = () => {
    navigate('/articles/write');
  };

  return (
    <Root>
      <Holder>
        <Text>Questions</Text>
        <Button width="123px" margin="0 0 10px 0" onClick={onClickWrite}>
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
