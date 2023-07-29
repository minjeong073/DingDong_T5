import styled from "styled-components";
import unfold from "../../assets/icon/unfold.svg";
import fold from "../../assets/icon/fold.svg";

export const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  margin-right: 40px;
  width: 185px;
  height: 400px;
  overflow: auto;
`;

export const Table = styled.table<{expanded?: boolean}>`
display: flex;
flex-direction: column;
align-items: center;
max-height: ${(props) => (props.expanded ? "auto" : "200px")};
&::-webkit-scrollbar {
  display: none;
}
overflow: hidden;
transition: max-height 0.3s ease;
`;

export const Tbody = styled.tbody`
`;

export const Button = styled.button`
  font-color: #0F172A;
  font-size: 15px;
`;

export const Tr = styled.tr`
  display: flex;
  justify-content: flex-end;

`;

export const Td = styled.td`
`;

export const HashTag = styled.button`
  margin-left: 10px;
  margin-bottom: 5px;
  padding: 5px 15px;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const Img = styled.img`
`;
