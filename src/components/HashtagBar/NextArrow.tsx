import React from 'react';
import {NextButton} from "./styled";

interface NextArrowProps {
  onClick? : React.MouseEventHandler<HTMLDivElement>;
}
//타입스크립트를 사용하므로 onclick 이벤트를 props로 받아준다.
//classNAme을 받아줄 수도 있고 부모컴포넌트에서 설정해줘도 된다.

export default function NextArrow({onClick} : NextArrowProps){
  return <NextButton className='next-arrow' onClick={onClick}>누르면 넘어감 </NextButton>
}