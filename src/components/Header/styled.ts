import styled from 'styled-components';
import SearchIcon from '../../assets/icon/search.svg';
import Logo from '../../assets/icon/logo.svg';
import NotificationIcon from '../../assets/icon/notification.svg';

export const Root = styled.header`
  padding-top: 32px;
  display: flex;
  align-items: center;
`;

export const LogoSection = styled.div`
  display: flex;
  width: 136px;
  height: 54px;
  justify-content: center;
  align-items: center;
  padding-right: 25px;
  margin-right: 50px;
  &:hover {
    cursor: pointer;
  }
`;

export const LogoImg = styled.img.attrs({
  src: Logo,
})`
  width: 22px;
  height: 22px;
`;

export const LogoTypo = styled.div`
  color: #7c3aed;
  text-align: right;
  font-family: 'Inter';
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -1px;
`;

export const UserSection = styled.div`
  display: flex;
  width: 72px;
  height: 47px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: 35px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 20px;
  /* font-weight: 500; */
  &:hover {
    cursor: pointer;
  }
`;

export const NotificationSection = styled.img.attrs({
  src: NotificationIcon,
})`
  width: 32px;
  height: 32px;
  margin-left: 17px;
  &:hover {
    cursor: pointer;
  }
`;

export const LoginTypo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 47px;
  margin-left: 45px;
  color: #64748b;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const LogoutTypo = styled(LoginTypo)`
  margin-left: 15px;
`;

export const SignUpTypo = styled(LoginTypo)`
  margin-left: 0;
`;

export const Fragment = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface IWrapper {
  $ishome?: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  flex-direction: row;
  width: ${props => (props.$ishome ? '686px' : '611px')};
  height: ${props => (props.$ishome ? '68px' : '48px')};
  border-radius: ${props => (props.$ishome ? '50px' : '20px')};
  background: #fff;
  box-shadow: 0px 0px 8px 0px #e2e8f0;

  .SearchInput {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-image: url(${SearchIcon});
    background-size: ${props => (props.$ishome ? '23px' : '18px')};
    background-repeat: no-repeat;
    background-position: ${props => (props.$ishome ? '30px 50%' : '18px 50%')};
    padding-left: ${props => (props.$ishome ? '75px' : '60px')};
    padding-right: ${props => (props.$ishome ? '25px' : '0')};
    font-size: ${props => (props.$ishome ? '18px' : '16px')};
    ${props =>
      props.$ishome &&
      `
  &::placeholder {
    color: #94a3b8;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`}
  }

  .Div {
    width: 50px;
    background-color: transparent;
    display: grid;
    place-items: center;

    svg {
      cursor: pointer;
      font-size: 16px;
      margin-right: 10px;
    }
  }
`;

export const SearchInput = styled.input`
  width: 661px;
  height: 48px;
  padding-left: 60px;
  /* border: 0.2px solid #e2e8f0; */
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px #e2e8f0;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 20px 50%;
  font-size: 16px;
`;

export const DataResult = styled.div`
  width: 661px;
  height: 200px;
  background-color: white;
  border-radius: 0 0 20px 20px;
  margin-top: 48px;
  box-shadow: #0004 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 1rem;
  }

  a {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    padding-left: 10px;

    &:hover {
      background-color: lightgrey;
      cursor: pointer;
    }
  }
`;
