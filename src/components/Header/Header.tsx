import {
  LogoImg,
  LogoSection,
  LogoTypo,
  NotificationSection,
  Root,
  SearchInput,
  UserSection,
} from "./styled";

export const Header = () => {
  return (
    <Root>
      <LogoSection>
        <LogoImg />
        <LogoTypo>DINGDONG</LogoTypo>
      </LogoSection>
      <SearchInput />
      <UserSection>딩동</UserSection>
      <NotificationSection />
    </Root>
  );
};
