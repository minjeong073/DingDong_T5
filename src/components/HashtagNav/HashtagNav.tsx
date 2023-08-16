import { NavBar, Table, Tr, Td, HashTag, Button, Img } from './styled';
import { useRecoilState } from 'recoil';
import { QuestionListState } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import unfold from '../../assets/icon/unfold.svg';
import fold from '../../assets/icon/fold.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const HashTagNav = () => {
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [questionData, setQuestionData] = useRecoilState<QuestionDataType[]>(QuestionListState);
  const [clickedHashtags, setClickedHashtags] = useState<boolean[]>([true, ...Array(0).fill(false)]);
  // const [clickedHashtags, setClickedHashtags] = useState<boolean[]>([...Array(0).fill(false)]);
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [onlyHashtag, setOnlyHashtag] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const questionResponse = await axios.get(`/api/articles?page=${page}`);
      const hashtagsResponse = await axios.get(`/api/articles/allhashtags`);
      setQuestionData(questionResponse.data.updatedQuestions);
      setOnlyHashtag(['ALL', ...hashtagsResponse.data.hashtags]);
    } catch (error) {
      console.error(error);
      alert('게시판 정보 가져오기 실패!');
    }
  };

  useEffect(() => {
    fetchData();
  }, [setQuestionData]);

  /* useEffect(() => {
    // let getHashtags: string[] = [];
    // hashtag.forEach(item => {
    //   const values = item?.join(',');
    //   getHashtags.push(values);
    // });
    const oneHashtag = hashtag.flatMap(item => item.split(',').map(part => part.trim()));
    const realHash = oneHashtag.filter(item => item.trim() !== '');
    const sortByFrequency = (arr: any[]) => {
      const frequencyMap = arr.reduce((map, item) => {
        map.set(item, (map.get(item) || 0) + 1);
        return map;
      }, new Map());
      return arr.sort((a, b) => frequencyMap.get(b) - frequencyMap.get(a));
    };
    const sortedHash = sortByFrequency(realHash);
    setOnlyHashtag(['ALL', ...new Set(sortedHash)]);
  }, [hashtag]); */

  const handleClick = useCallback(
    (index: number) => {
      const newClickedHashtags = [...clickedHashtags];
      newClickedHashtags.fill(false);
      newClickedHashtags[index] = true;
      setClickedHashtags(newClickedHashtags);
      navigate(`/tag`);
    },
    [clickedHashtags, navigate],
  );

  const toggleExpanded = useCallback(() => {
    setExpanded(prevExpanded => !prevExpanded);
  }, []);

  const displayedHashtags = useMemo(() => {
    if (expanded) {
      return onlyHashtag;
    }
    return onlyHashtag.slice(0, 10);
  }, [expanded, onlyHashtag]);

  return (
    <NavBar>
      <Table $expanded={expanded}>
        {displayedHashtags.map(
          (item, index) =>
            index % 2 === 0 && (
              <Tr key={index}>
                <Td>
                  <HashTag $click={clickedHashtags[index]} onClick={() => handleClick(index)}>
                    {item}
                  </HashTag>
                  {index + 1 < onlyHashtag.length && (
                    <HashTag $click={clickedHashtags[index + 1]} onClick={() => handleClick(index + 1)}>
                      {onlyHashtag[index + 1]}
                    </HashTag>
                  )}
                </Td>
              </Tr>
            ),
        )}
      </Table>
      <Button onClick={toggleExpanded}>
        {expanded ? '접기' : '펼치기'}
        <Img src={expanded ? fold : unfold} />
      </Button>
    </NavBar>
  );
};
