import styled from "styled-components";

export const HashBody = styled.div`
  display: fixed;
  width: 690px;
  margin-top: 60px;
  overflow: hidden;
  border: 1px solid black;
  
`;

export const Div = styled.div`
  display: flex;
  //
  backface-visibility: hidden;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
  `;

export const Tr = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  //
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
  position: relative;
`;

export const HashTag = styled.button`
  height: 40px;
  margin: 0 5px;
  padding: 5px 12px;
  white-space: nowrap;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  font-size: 17px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
  //
  display: block;
  height: var(--slide-height);
  width: 100%;
  object-fit: cover;
`;

export const HashButton = styled.div`
  // z-index: 1;
  // color: var(--background-site);
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // cursor: pointer;
  // width: 4rem;
  // height: 4rem;
  display: flex;
  width: 4rem;
  height: 4rem;
`;

export const PreButton =styled.button`
  z-index: 1;
  color: var(--background-site);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // width: 4rem;
  // height: 4rem;
  &:disabled{
    opacity: 0.3;
  }
  //
  // align-items: center;
  // position: absolute;
  // top: 50%;
  // transform: translateY(-50%);
  // left: 1.6rem;
`;

export const NexButton =styled.button`
z-index: 1;
color: var(--background-site);
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
// width: 4rem;
// height: 4rem;
&:disabled{
  opacity: 0.3;
}
//
//  align-items: center;
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   left: 1.6rem;
`;

export const SVG = styled.svg`
width: 65%;
height: 65%;
`;