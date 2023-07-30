import dummy from "../../db/articles.json";
import {
  NavBar,
  Table,
  Tbody,
  Tr,
  Td,
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

  // console.log(typeof{QuestionData});
  // const Values = useRecoilValue<QuestionDataType[]>(QuestionData).hashtags;
  // console.log(QuestionData[10].hashtags);

  const HashtagArr = dummy.articles.map((item) => item.hashtag);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag));

  const onClickExpanded = () =>{
    setExpanded( !expanded );
  }

  const foldImage = expanded ? {unfold} : {fold};

  return(
    <NavBar>
      <Table $expanded={expanded? true : undefined}>
        <Tbody >
            {onlyHashtag.map((item, index) => (
              index % 2 === 0 ? (
                <Tr key={index}>
                  <Td>
                  <HashTag key={item}>{item}</HashTag>
                  {index + 1 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 1]}</HashTag> : null}
                  </Td>
                </Tr>
              ) : null
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
