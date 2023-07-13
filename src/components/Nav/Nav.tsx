import { NavItem, Root } from "./styled";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <Root>
      <Link to="/home">
        <NavItem>Home</NavItem>
      </Link>
      <Link to="/articles">
        <NavItem>Questions</NavItem>
      </Link>
      <Link to="/replies">
        <NavItem>Replies</NavItem>
      </Link>
    </Root>
  );
};
