import styled, { keyframes } from 'styled-components';
import loadingImg from 'assets/icon/loading.svg';

export const LButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

export const Button1 = styled.button<{ $result?: string }>`
  display: flex;
  width: 74px;
  height: 33px;
  border: 1px solid #e2e8f0;
  border-radius: 10px 0 0 10px;
  background-color: ${props => (props.$result === 'answer' ? '#F1F5F9' : '#FFFFFF')};
  color: #0f172a;
  font-size: 15px;
  padding: 7px 0;
  align-items: center;
  justify-content: center;
`;

export const Button2 = styled.button<{ $result?: string }>`
  display: flex;
  width: 74px;
  height: 33px;
  border: 1px solid #e2e8f0;
  padding: 7px 0;
  border-radius: 0 10px 10px 0;
  background-color: ${props => (props.$result === 'comment' ? '#F1F5F9' : '#FFFFFF')};
  color: #0f172a;
  font-size: 15px;
  align-items: center;
  justify-content: center;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 100px;
  td {
    min-height: 121px;
    border-bottom: 1px solid #e2e8f0;
  }
`;

export const Tbody = styled.tbody`
  border-top: 1px solid #e2e8f0;
`;

export const LoadingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 683px;
  height: 30px;
  margin: 20px 0 40px 0;
`;

// 회전하는 애니메이션 정의
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled.img.attrs({
  src: loadingImg,
})`
  width: 24px;
  height: 24px;
  animation: ${rotateAnimation} 1s linear infinite;
`;
