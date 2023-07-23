import styled from "styled-components";

interface IButton {
  alignself?: string;
  width?: string;
  height?: string;
  borderradius?: string;
  margin?: string;
}

export const Button = styled.button<IButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: ${(props) => props.alignself || "center"};
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "44px"};
  border-radius: ${(props) => props.borderradius || "10px"};
  margin: ${(props) => props.margin || "0"};
  background: #7c3aed;
  color: #fff;
  font-size: 17px;
  letter-spacing: 0.3px;
  transition: 0.1s;
  &:hover {
    background: #6d28d9;
  }
`;
