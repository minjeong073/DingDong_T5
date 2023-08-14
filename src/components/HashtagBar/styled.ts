import styled from "styled-components";

export const HashBody = styled.div`
  display: fixed;
  width: 690px;
  margin-top: 60px;
  overflow: hidden;
  // border: 1px solid black;
`;

export const Div = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Tr = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
`;

export const HashTag = styled.button`
  height: 60px;
  width: 100%;
  margin: 0 5px;
  padding: 5px 12px;
  white-space: nowrap;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  // text-align: center;
  font-size: 17px;
  font-weight: 400;
  &:hover {
    background-color: #C8BBF5;
    color: #fff;
    cursor: pointer;
  }
`;

export const DotBox = styled.ul`
  display: flex
  flex-direction: row;
  position: absolute;
  justify-content: center;
  
  border: 1px solid black;
  width: 100%;
  height: 100%;
  bottom: 0px;
  // z-index: 3;
`;

export const Li = styled.li`
  // display: flex-end;
  // z-index: 2;
  border-radius: 50%;
  &:hover{
    cursor: pointer;
  }
`;
