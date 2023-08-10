import { useMemo } from 'react';
import { Container, NavItem } from './styled';
import { useNavigate } from 'react-router-dom';

type navItem = {
  name: string;
  src: string;
};

type navItems = navItem[];

export const Nav = () => {
  const navigate = useNavigate();
  const navItems = useMemo<navItems>(
    () => [
      { name: 'Home', src: '/' },
      { name: 'Questions', src: '/articles' },
      { name: 'Replies', src: '/replies' },
    ],
    [],
  );
  return (
    <Container>
      {navItems.map((item, idx) => (
        <NavItem key={`${item.name}_${idx}`} onClick={() => navigate(item.src)}>
          {item.name}
        </NavItem>
      ))}
    </Container>
  );
};
