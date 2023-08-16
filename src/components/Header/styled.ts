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

export const Fragment = styled. div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 661px;
  height: 48px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px #e2e8f0;

  .SearchInput{ 
    width: 611px;
    height: 100%;
    border-radius: 20px 0 0 20px;
    background-image: url(${SearchIcon});
    background-repeat: no-repeat;
    background-position: 20px 50%;
    padding-left: 60px;
    font-size: 16px;
  }

  .Div{
    width: 50px;
    background-color: white;
    border-radius:  0 20px 20px 0;
    display: grid;
    place-items: center;

    svg {
      cursor: pointer;
      font-size: 16px;
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
`