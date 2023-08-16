import { NavBar, Table, Tr, Td, HashTag, Button, Img } from './styled';
import { useRecoilState } from 'recoil';
import { QuestionListState } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import React, { useState, useEffect } from 'react';
import unfold from '../../assets/icon/unfold.svg';
import fold from '../../assets/icon/fold.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { encode } from 'punycode';

export const HashTagNav = () => {
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [questionData, setQuestionData] = useRecoilState<QuestionDataType[]>(QuestionListState);
  const [clickedHashtags, setClickedHashtags] = useState<boolean[]>([true, ...Array(0).fill(false)]);
  // const [clickedHashtags, setClickedHashtags] = useState<boolean[]>([...Array(0).fill(false)]);
  const [ hashtag, setHashtag ] = useState<string[]>([]);
  const [onlyHashtag, setOnlyHashtag] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/articles?page=${page}`);
      const hashtags = await axios.get(`/api/articles/allhashtags`);
      setQuestionData(response.data.updatedQuestions);
      setHashtag(hashtags.data.hashtags);
    } catch (error) {
      console.error(error);
      alert('게시판 정보 가져오기 실패!');
    }
  };

  useEffect(() => {
    fetchData();
  }, [setQuestionData]);

  useEffect(() => {
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
  }, [questionData]);

  const onClickExpanded = () => {
    setExpanded(prev => !prev);
  };

  const handleClick = (index: number) => {
    const newClickedHashtags = [...clickedHashtags];
    newClickedHashtags.fill(false);
    newClickedHashtags[index] = !newClickedHashtags[index];
    setClickedHashtags(newClickedHashtags);
    navigate(`/search?query=${encodeURIComponent(onlyHashtag[index])}`);
  };

  return (
    <NavBar>
      <Table $expanded={expanded}>
        {onlyHashtag.map((item, index) => (
          <Tr key={index}>
            {index % 2 === 0 && (
              <Td>
                <HashTag $click={clickedHashtags[index]} onClick={() => handleClick(index)} key={index}>
                  {item}
                </HashTag>
                {index + 1 < onlyHashtag.length && (
                  <HashTag $click={clickedHashtags[index + 1]} onClick={() => handleClick(index + 1)} key={index+1}>
                    {onlyHashtag[index + 1]}
                  </HashTag>
                )}
              </Td>
            )}
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