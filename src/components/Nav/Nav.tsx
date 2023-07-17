import { useMemo } from "react";
import { Container, NavItem } from "./styled";
import { Link } from "react-router-dom";

type navItem = {
  name: string;
  src: string;
};

type navItems = navItem[];

export const Nav = () => {
  const navItems = useMemo<navItems>(
    () => [
      { name: "Home", src: "/" },
      { name: "Questions", src: "/articles" },
      { name: "Replies", src: "/replies" },
    ],
    []
  );
  return (
    <Container>
      {navItems.map((item, idx) => (
        <Link to={item.src} key={`${item.name}_${idx}`}>
          <NavItem>{item.name}</NavItem>
        </Link>
      ))}
    </Container>
  );
};
