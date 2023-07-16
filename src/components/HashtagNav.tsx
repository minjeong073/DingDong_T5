import styled from "styled-components";
import dummy from "../db/articles.json";
import React from 'react';

export const HashTagNav = () => {

  const HashtagArr = dummy.articles.map((item) => item.hashtag);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag));

  return(
    <NavBar>
      <Table>
        <tbody>
            {onlyHashtag.map((item, index) => (
              index % 2 === 0 ? (
                <Tr key={index}>
                  <td>
                  <HashTag key={item}>{item}</HashTag>
                  {index + 1 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 1]}</HashTag> : null}
                  </td>
                </Tr>
              ) : null
            ))}
    </tbody>
    </Table>
  </NavBar>  
  )
}

const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3vh;
  width: 250px;
  height: 130px;
  overflow: auto;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`

`;

const Tr = styled.tr`
  display: flex;
  justify-content: flex-end;
`;

const HashTag = styled.button`
  margin-left: 10px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: #F1F5F9;
  color: #64748B;
  border: 1px solid #F1F5F9;
  border-radius: 20px;
  font-size: 17px;
  &:hover{
    cursor: pointer;
  };
`;

const Span = styled.div`
  border: 1px solid black;
  width:2px;
  height: 2px;
`;