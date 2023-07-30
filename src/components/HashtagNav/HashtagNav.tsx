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
import React , { useState } from "react";
import unfold from "../../assets/icon/unfold.svg";
import fold from "../../assets/icon/fold.svg";


export const HashTagNav = () => {
  const [ expanded, setExpanded ] = useState(false);
  const [QuestionData, setQuestionData] =
  useRecoilState<QuestionDataType[]>(QuestionListState);

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
              
              // index % 2 === 0 ? (
              //   <Tr key={index}>
              //     <Td>            
              //       <HashTag key={index}>{item}</HashTag>
              //       {index + 1 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 1]}</HashTag> 
              //       : null}
              //     </Td>
              //   </Tr>
              // ) : null
            ))}
      </Tbody>
    </Table>
    <Button onClick={onClickExpanded}>
        {expanded ? "접기"  : "펼치기" }
        <Img />
    </Button>
  </NavBar>  
  )
}

/*
                    <Special key={index}>{item}</Special>
                    {index + 1 < onlyHashtag.length ? <Special>{onlyHashtag[index + 1]}</Special> 
                    : null}
 */