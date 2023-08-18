import {
  Root,
  LogoSection,
  LogoImg,
  LogoTypo,
  Header,
  Div,
  Container,
  Button1,
  Button2,
  Block,
  QuestionBlock,
  AnswerBlock,
  TitleBlock,
  QuestionTypo,
  TitleText,
  TopItems,
  TopItem,
  ButtonBar,
  HashBody,
} from './styled';
import { SearchBar, LoginLogoutButton, RealCarousel } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import Articles from '../../db/articles.json';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { QuestionData, QuestionDataType } from 'stores/page-store';
import DOMPurify from 'dompurify';

interface AnswerDataType {
  _id: string;
  content: string;
  questionTitle: string;
  questionId: string;
  author: string;
  votes: number;
  saves: number;
  createdAt: string;
  updatedAt: string;
}

export const Home = () => {
  const [allArticle, setAllArticle] = useState<QuestionDataType[]>([]);
  const [topQuestion, setTopQuestion] = useState<QuestionDataType[]>([]);
  const [topAnswer, setTopAnswer] = useState<AnswerDataType[]>([]);
  const HashtagArr = Articles.map(item => item.hashtags);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag)).slice(0, 13);
  const carouselItems: JSX.Element[] = onlyHashtag.map((item, index) => <div key={index}>{onlyHashtag[index]}</div>);
  // console.log(carouselItems);

  const navigate = useNavigate();

  const getAllArticles = async () => {
    const response = await axios.get(`/api/articles/all`);
    const articleData = response.data;
    setAllArticle(articleData);
  };

  const getTopQuestion = async () => {
    const response = await axios.get('/api/articles/interest');
    const data = response.data.updatedQuestions;
    // data의 상위 5개만 가져와 topQuestion에 저장
    setTopQuestion(data);
  };

  const getTopAnswer = async () => {
    const response = await axios.get('/api/answer/all');
    const data = response.data.answers;
    // data의 상위 5개만 가져와 topAnswer에 저장
    setTopAnswer(data.slice(0, 5));
  };

  const onClickNavigateQuestion = async (answer: AnswerDataType) => {
    if (answer.questionId) {
      try {
        const response = await axios.get(`/api/articles/${answer.questionId}`);
        const questionData = response.data;
        navigate(`/articles/${answer.questionId}`);
      } catch (error) {
        alert('삭제된 질문글입니다.');
      }
    }
  };

  useEffect(() => {
    getTopQuestion();
    getTopAnswer();
    getAllArticles();
  }, []);

  return (
    <Root>
      <Header>
        <LogoSection>
          <LogoImg />
          <LogoTypo>DINGDONG</LogoTypo>
        </LogoSection>
        <Div>
          <LoginLogoutButton />
        </Div>
      </Header>
      <Container>
        <SearchBar placeholder="함께 이어지는 여정, 여행 커뮤니티 딩동" data={allArticle} />
        <ButtonBar>
          <Link to={'/articles/write'}>
            <Button1> 질문하기</Button1>
          </Link>
          <Link to={'/articles'}>
            <Button2> 바로가기</Button2>
          </Link>
        </ButtonBar>
        <Block>
          <QuestionBlock>
            <TitleBlock>
              <QuestionTypo>Q</QuestionTypo> <TitleText>인기 질문</TitleText>
            </TitleBlock>
            <TopItems>
              {topQuestion?.map(question => (
                <TopItem key={question?._id} onClick={() => navigate(`/articles/${question._id}`)}>
                  {question?.title.length > 27 ? question?.title.slice(0, 27) + '...' : question?.title}
                </TopItem>
              ))}
            </TopItems>
          </QuestionBlock>
          <AnswerBlock>
            <TitleBlock>
              <QuestionTypo>A</QuestionTypo> <TitleText>인기 답변</TitleText>
            </TitleBlock>
            <TopItems>
              {topAnswer?.map(answer => (
                <TopItem
                  key={answer?._id}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      answer.content.length > 27 ? answer.content.slice(0, 27) + '...' : answer.content,
                    ),
                  }}
                  onClick={() => onClickNavigateQuestion(answer)}
                />
              ))}
            </TopItems>
          </AnswerBlock>
        </Block>
        <HashBody>
          <RealCarousel items={carouselItems} />
        </HashBody>
      </Container>
    </Root>
  );
};
