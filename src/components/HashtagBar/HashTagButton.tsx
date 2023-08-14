import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';

const CustomArrow = styled.div`
  background-color: #ff9900;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  line-height: 1;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface CustomArrowProps {
  onClickHandler: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  label: string;
}

export const CustomPrevArrow: React.FC<CustomArrowProps> = ({onClickHandler, hasPrev, label}) => {
  return hasPrev ? (
    <CustomArrow onClick={onClickHandler} className="arrow-prev">
      &lt;
    </CustomArrow>
  ) : null;
};

export const CustomNextArrow: React.FC<CustomArrowProps> = ({onClickHandler, hasNext, label}) => {
  return hasNext ? (
    <CustomArrow onClick={onClickHandler} className="arrow-next">
      &gt;
    </CustomArrow>
  ) : null;
};
