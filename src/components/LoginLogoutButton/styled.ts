import styled from 'styled-components';

export const UserSection = styled.div`
  display: flex;
  width: 72px;
  height: 47px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: 55px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 20px;
  /* font-weight: 500; */
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
