import { NavBar, Table, Tr, Td, Special, HashTag, Button, Img } from './styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionData, QuestionListState } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import React, { useState, useEffect } from 'react';
import unfold from '../../assets/icon/unfold.svg';
import fold from '../../assets/icon/fold.svg';
import axios from 'axios';

export const HashTagNav = () => {
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [QuestionData, setQuestionData] = useRecoilState<QuestionDataType[]>(QuestionListState);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/articles?page=${page}`);
      setQuestionData(response.data.updatedQuestions);
    } catch (error) {
      console.error(error);
      alert('게시판 정보 가져오기 실패!');
    }
  };

  useEffect(() => {
    fetchData();
  }, [QuestionData]);

  let getHashtags: string[] = [];
  Array(QuestionData.length)
    .fill(0)
    .map((item, index) => {
      const values = QuestionData[index]?.hashtags.join(',');
      getHashtags.push(values);
    });
  const oneHashtag = getHashtags.flatMap(item => item.split(',').map(part => part.trim()));
  const realHash = oneHashtag.filter(item => item.trim() !== '');
  const sortByFrequency = (arr: any[]) => {
    const frequencyMap = arr.reduce((map, item) => {
      map.set(item, map.get(item || 0) + 1);
      return map;
    }, new Map());
    return arr.sort((a, b) => frequencyMap.get(b) - frequencyMap.get(a));
  };
  const forHash = sortByFrequency(realHash);
  const onlyHashtag = Array.from(new Set(forHash));
  onlyHashtag.unshift('ALL');
  // console.log(onlyHashtag.indexOf('hashtag'));

  const [clickedHashtags, setClickedHashtags] = useState<boolean[]>([
    true,
    ...Array(onlyHashtag.length - 1).fill(false),
  ]);

  const onClickExpanded = () => {
    setExpanded(prev => !prev);
  };

  const handleClick = (index: number) => {
    const newClickedHashtags = [...clickedHashtags];
    // newClickedHashtags.fill(false); // 모든 요소를 false로 설정
    newClickedHashtags[index] = !newClickedHashtags[index]; // 클릭한 요소를 true로 설정
    setClickedHashtags(newClickedHashtags);
  };

  return (
    <NavBar>
      <Table $expanded={expanded}>
        {/* {onlyHashtag.map((item, index) => (
          <HashTag key={index} $click={clickedHashtags[index]} onClick={() => handleClick(index)}>
            {item}
          </HashTag>
        ))}   */}
        {onlyHashtag.map((item, index) => (
          <Tr key={index}>
            {index % 2 === 0 ? (
              <Td>
                <HashTag $click={clickedHashtags[index]} onClick={() => handleClick(index)} key={index}>
                  {item}
                </HashTag>
                {index + 1 < onlyHashtag.length ? (
                  <HashTag $click={clickedHashtags[index + 1]} onClick={() => handleClick(index + 1)}>
                    {onlyHashtag[index + 1]}
                  </HashTag>
                ) : null}
              </Td>
            ) : null}
          </Tr>
        ))}
      </Table>
      <Button onClick={onClickExpanded}>
        {expanded ? '접기' : '펼치기'}
        <Img src={expanded ? fold : unfold} />
      </Button>
    </NavBar>
  );
};
