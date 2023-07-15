import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 185px;
  margin: 0 40px;
`;

export const NavItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  font-family: 'Roboto Slab', serif;
  font-weight: bold;
  width: 100%;
  height: 47px;
  border-bottom: 1px solid #e2e8f0;
  padding-right: 19px;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;