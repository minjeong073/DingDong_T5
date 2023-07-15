import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import WhiteLogo from "../assets/icon/white_logo.svg";
import { ArticlesTable } from "./ArticlesTable"


export const Articles = () => {

    const navigate = useNavigate();

    const onClickWrite = () => {
        navigate('/questions');
    }

    return(
        <>
        <Holder>
            <Text>Questions</Text>
            <Button onClick={onClickWrite}> 
                <Img src={WhiteLogo} />
                <Span>
                    질문하기
                </Span>
            </Button>
        </Holder>
        <ArticleContainer>
            <ArticlesTable />
        </ArticleContainer>
        </>
    )
}

const Holder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
`;

const Text = styled.div`
  font-size: 35px;
`;

const Button = styled.button`
  width: 123px;
  height: 44px;
  border-radius: 10px;
  background-color: #7C3AED;
  border: 0px;
  &:hover {
    cursor: pointer;
    background-color: #AC8DCA
  }
`;

const Span = styled.span`
  color: white;
  font-size: 18px;
`;

const Img = styled.img`
  width: 22px;
  height: 22px;
  color: white;
  `;

const ArticleContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #e6e8e7;
  align-items: center;
  overflow: scroll; 
`;
