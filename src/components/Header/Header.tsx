import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { LogoImg, LogoSection, LogoTypo, Root, SearchInput } from './styled';
import { useNavigate } from 'react-router-dom';
import { LoginLogoutButton } from 'components';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Root>
      <LogoSection onClick={() => navigate('/')}>
        <LogoImg />
        <LogoTypo>DINGDONG</LogoTypo>
      </LogoSection>
      <SearchInput />
      <LoginLogoutButton />
    </Root>
  );
};
