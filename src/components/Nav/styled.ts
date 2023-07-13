import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 185px;
`;

export const NavItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 47px;
  border-bottom: 1px solid #e2e8f0;
  padding-right: 19px;
  &:hover {
    cursor: pointer;
  }
`;
