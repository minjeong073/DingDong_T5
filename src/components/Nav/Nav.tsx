import { useMemo } from "react";
import { Container, NavItem } from "./styled";
import { Link } from "react-router-dom";

export const Nav = () => {
  const navItems = useMemo<string[]>(
    () => ["Home", "Questions", "Replies"],
    []
  );
  return (
    <Container>
      {navItems.map((item) => (
        <Link to={`/${item.toLowerCase()}`} key={item}>
          <NavItem>{item}</NavItem>
        </Link>
      ))}
    </Container>
  );
};