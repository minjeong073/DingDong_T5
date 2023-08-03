import {
  NavBar,
  Table,
  Tbody,
  Tr,
  Td,
  Special,
  HashTag,
  Button,
  Img
} from "./styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { QuestionData, QuestionListState } from "../../stores/page-store";
import type { QuestionDataType } from "../../stores/page-store";
import React , { useState, useEffect } from "react";
import unfold from "../../assets/icon/unfold.svg";
import fold from "../../assets/icon/fold.svg";
import axios from "axios";

export const HashTagNav = () => {
  const [ expanded, setExpanded ] = useState(false);
  const [QuestionData, setQuestionData] =
  useRecoilState<QuestionDataType[]>(QuestionListState);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/articles");
      setQuestionData(response.data);
      let mutableData = [...response.data].reverse();
      response.data = mutableData;
      setQuestionData(response.data);
    } catch (error) {
      console.error(error);
      alert("게시판 정보 가져오기 실패!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [setQuestionData]);

  let getHashtags: string[]= [];
  Array(QuestionData.length).fill(0).map((item, index) => {
    const values = QuestionData[index]?.hashtags.join(',');
    getHashtags.push(values); 
  })
  const oneHashtag = getHashtags.flatMap((item) => item.split(',').map((part) => part.trim()));
  const realHash = oneHashtag.filter((item) => item.trim() !== '');
  const sortByFrequency = (arr:any[]) =>{
    const frequencyMap = arr.reduce((map,item) => {
      map.set(item, (map.get(item || 0) + 1));
      return map;
    }, new Map());
    return arr.sort((a,b) => frequencyMap.get(b) - frequencyMap.get(a));
  }
  const forHash = sortByFrequency(realHash);
  const onlyHashtag = Array.from(new Set(forHash));

  const onClickExpanded = () =>{
    setExpanded( !expanded );
  }

  const foldImage = expanded ? {unfold} : {fold};

  return(
    <NavBar>
      <Table $expanded={expanded? true : undefined}>
        <Tbody >
            {onlyHashtag.map((item, index) => (
              <Tr key={index}>               
                {index === 0 ? (
                  <Td>
                    <Special>{item}</Special>
                    <Special>{onlyHashtag[index+1]}</Special>
                  </Td>                    
                  ) : (
                    index % 2 === 0 ? (
                      <Td>            
                        <HashTag key={index}>{item}</HashTag>
                          {index + 1 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 1]}</HashTag> 
                          : null}
                      </Td>                      
                    ) : null
                  )}                
              </Tr>
            ))}
      </Tbody>
    </Table>
    <Button onClick={onClickExpanded}>
        {expanded ? "접기"  : "펼치기" }
        <Img src={expanded? fold : unfold }/>
    </Button>
  </NavBar>  
  )
}