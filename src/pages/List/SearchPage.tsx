import { Articles } from '../../components/List/ArticleList/Articles';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import type { QuestionDataType } from 'stores/page-store';

export const SearchPage = () => {
  const [SearchData, setSearchData] = useState<QuestionDataType[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');
  // console.log(keyword);
  // 쿼리부분 변수

  const fetchSearchData = async (keyword:string) => {
    try{
      const response = await axios.get(`/api/search?keyword=${encodeURIComponent(keyword)}`);
      setSearchData(response.data);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    if(keyword){
      fetchSearchData(keyword);
    }; 
  }, [setSearchData]);

  return (
    // <ListContainer>
    <Articles />
    // </ListContainer>
  );
};
