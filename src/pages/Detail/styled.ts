import { styled } from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 683px;
  height: 800px;
  margin-right: 240px;
`;

export const QuestionTitleSection = styled.div`
  display: flex;
`;

export const QuestionTypo = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: #7c3aed;
  border-radius: 50%;
  font-family: "Inter", sans-serif;
  color: #fff;
  font-size: 26px;
  font-weight: 600;
`;

export const QuestionTitle = styled.span`
  color: #0f172a;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
