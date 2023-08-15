import {
  Root,
  LogoSection,
  LogoImg,
  LogoTypo,
  Header,
  Div,
  Login,
  SignUp,
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
  DotTypo,
  TopItem,
  ButtonBar,
  HashBody,
} from './styled';
import { SearchBar } from "components/Header";
import { RealCarousel } from '../../components/HashtagBar/';
import { Link, useNavigate } from 'react-router-dom';
import Articles from "../../db/articles.json";
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { QuestionDataType } from 'stores/page-store';

export const Home = () => {
  const [topQuestion, setTopQuestion] = useState<QuestionDataType[]>([]);
  const HashtagArr = Articles.map(item => item.hashtags);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag)).slice(0, 13);
  const carouselItems: JSX.Element[] = onlyHashtag.map((item, index) => (
    <div key={index}>
      {onlyHashtag[index]}
    </div>
  ));
  // console.log(carouselItems);

  const navigate = useNavigate();

  const getTopQuestion = async () => {
    const response = await axios.get('/api/articles/popular');
    const data = response.data.updatedQuestions;
    // data의 상위 5개만 가져와 topQuestion에 저장
    setTopQuestion(data);
  };

  useEffect(() => {
    getTopQuestion();
  }, []);
  
  return (
    <Root>
      <Header>
        <LogoSection>
          <LogoImg />
          <LogoTypo>DINGDONG</LogoTypo>
        </LogoSection>
        <Div>
          <Login>
            <Link to={'/signin'}>로그인</Link>
          </Login>
          <SignUp>
            <Link to={'/signup'}>회원가입</Link>
          </SignUp>
        </Div>
      </Header>
      <Container>
        <SearchBar
          placeholder="함께 이어지는 여정, 여행 커뮤니티 딩동" 
          data={Articles}
        /> 
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
                  {question?.title}
                </TopItem>
              ))}
            </TopItems>
          </QuestionBlock>
          <AnswerBlock>
            <TitleBlock>
              <QuestionTypo>A</QuestionTypo> <TitleText>인기 답변</TitleText>
            </TitleBlock>
            <TopItems></TopItems>
          </AnswerBlock>
        </Block>
        <HashBody>
          <RealCarousel items={carouselItems} />
        </HashBody>
      </Container>
    </Root>
  );
};
