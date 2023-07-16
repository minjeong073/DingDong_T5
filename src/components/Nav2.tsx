import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav2 = () => {
  const navItems = useMemo<string[]>(
    () => ["Home", "Questions", "Replies"],
    []
  );
  return (
    <Container>
      <NavContainer>
        {navItems.map((item) => (
          <Link to={`/${item.toLowerCase()}`} key={item}>
            <NavItem>{item}</NavItem>
          </Link>
        ))}
      </NavContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1vh;
  width: 100%;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 250px;
`;

const NavItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  font-family: 'Roboto Slab', serif;
  font-weight: bold;
  width: 100%;
  height: 47px;
  border-bottom: 3px solid #e2e8f0;
  padding-right: 19px;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;
