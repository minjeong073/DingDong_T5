import styled from 'styled-components';
import SearchIcon from '../../assets/icon/search.svg';
import Logo from '../../assets/icon/logo.svg';
import NotificationIcon from '../../assets/icon/notification.svg';

export const Root = styled.header`
  padding-top: 32px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 661px;
  height: 48px;
  padding-left: 60px;
  border: 0.2px solid #e2e8f0;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px #e2e8f0;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 20px 50%;
  font-size: 16px;
`;

export const LogoSection = styled.div`
  display: flex;
  width: 136px;
  height: 54px;
  justify-content: center;
  align-items: center;
  margin-right: 49px;
  &:hover {
    cursor: pointer;
  }
`;

export const LogoImg = styled.img.attrs({
  src: Logo,
})`
  width: 24px;
  height: 24px;
`;

export const LogoTypo = styled.div`
  color: #7c3aed;
  text-align: right;
  font-family: 'Inter';
  font-size: 20px;
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
  margin-left: 35px;
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
