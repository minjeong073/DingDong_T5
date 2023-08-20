import styled from 'styled-components';
import Sorry from "../../assets/icon/sorryEmoji.svg";


export const ListContainer = styled.div`
  /* margin-right: 40px; */
`;

export const Div = styled.div`
  width: 683px;
`;

export const NoData = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SorryImg = styled.img.attrs({
  src: Sorry,
})`
  margin-top: 30px;
  width: 40px;
  height: 40px;
`;