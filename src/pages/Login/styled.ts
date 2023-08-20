import styled from 'styled-components';
import { Button } from '../../components/Button';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 260px;
`;

export const Container = styled.div`
  display: flex;
  width: 310px;
  /* height: 230px; */
  flex-direction: column;
  > :first-child {
    margin-left: 10px;
  }
`;

export const IDbox = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: 0.5px solid #e2e8f0;
  padding-left: 22px;
  &::placeholder {
    font-size: 15px;
  }
`;

export const PWbox = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  border: 0.5px solid #e2e8f0;
  margin: 10px 0;
  padding-left: 22px;
  &::placeholder {
    font-size: 15px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Button1 = styled(Button)`
  width: 100%;
  height: 55px;
`;

export const Button2 = styled.div`
  color: #7c3aed;
  font-size: 15px;
  margin-top: 7px;
  margin-right: 3px;
`;
