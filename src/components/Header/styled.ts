import styled from "styled-components";
import SearchIcon from "../../assets/icon/search.svg";
import Logo from "../../assets/icon/logo.svg";
import NotificationIcon from "../../assets/icon/notification.svg";

export const Root = styled.div`
  width: 100%;
  padding-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 681px;
  height: 48px;
  padding-left: 60px;
  border-radius: 10px;
  border: 0.5px solid #e2e8f0;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 20px 50%;
  box-shadow: 0px 2px 8px 0px #f1f5f9;
  font-size: 17px;
  &:focus {
    outline: none;
  }
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
  font-weight: 500;
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
